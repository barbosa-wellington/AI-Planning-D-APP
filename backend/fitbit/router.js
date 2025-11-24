import express from "express";
import crypto from "crypto";
import base64url from "base64url";
import axios from "axios";

const router = express.Router();

const CLIENT_ID = process.env.FITBIT_CLIENT_ID;
const REDIRECT_URI = process.env.FITBIT_REDIRECT_URI;
const SCOPES = process.env.FITBIT_SCOPES || "profile activity sleep";

// temporary PKCE store (dev only)
const pkceStore = new Map();

function makeVerifier() {
  return base64url(crypto.randomBytes(32));
}
function makeChallenge(verifier) {
  const hash = crypto.createHash("sha256").update(verifier).digest();
  return base64url(hash);
}

// GET /fitbit/authorize
router.get("/authorize", (req, res) => {
  const state = base64url(crypto.randomBytes(16));
  const verifier = makeVerifier();
  const challenge = makeChallenge(verifier);

  pkceStore.set(state, verifier);

  const authUrl =
    "https://www.fitbit.com/oauth2/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      code_challenge: challenge,
      code_challenge_method: "S256",
      state,
    }).toString();

  res.json({ authUrl });
});

export { pkceStore };
export default router;

// GET /fitbit/callback
router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).send("Missing code or state");
  }

  // get the stored verifier for this state
  const verifier = pkceStore.get(state);

  if (!verifier) {
    return res.status(400).send("Invalid or expired state");
  }

  // single-use state
  pkceStore.delete(state);

  try {
    const tokenResp = await axios.post(
      "https://api.fitbit.com/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
        code_verifier: verifier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`).toString("base64"),
        },
      }
    );

    const tokens = tokenResp.data;

    /**
     * tokens example:
     * {
     *   access_token,
     *   refresh_token,
     *   expires_in,
     *   user_id,
     *   scope,
     *   token_type
     * }
     */

    console.log("✅ Fitbit tokens received:", tokens);

    // TODO (later): store these tokens in DB
    // await saveTokens(tokens)

    // for now, just show success in browser
    return res.json({
      message: "Fitbit connected successfully ✅",
      tokens,
    });

  } catch (err) {
    console.error("❌ Token exchange error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Token exchange failed",
      details: err.response?.data || err.message,
    });
  }
});

