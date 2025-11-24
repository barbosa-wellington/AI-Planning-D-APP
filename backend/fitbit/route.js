// This file will contains the authentication process for the API

const cliet_id = "23TQDR";
const client_secret = "70236b9754b092faa5f530a442e53c44";
const authorization_uri = "https://www.fitbit.com/oauth2/authorize";
const Access_refresh_token = "https://api.fitbit.com/oauth2/token";
const pkce = "5a6p2z196p1m5c22216i5n512n1g1m4d0r3o0h6d54255c212d0m3h3m5j4q5x0v6v0t701n0r2x1d24121s344v1q496v183h3h2c466l0r2d1p4g6o1t1v5a5q5p24";
const pkce_challenge = "Su9OOtJ919d2BrZ0mWcOQwr9XA70hVQGDVtOTB4of_0";
const state = "3z6x0v0v4y351o6k1s5o1v2y4s6z241s";
const url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23TQDR&scope=activity+cardio_fitness+heartrate+irregular_rhythm_notifications+nutrition+profile+sleep+social+temperature+weight&code_challenge=Su9OOtJ919d2BrZ0mWcOQwr9XA70hVQGDVtOTB4of_0&code_challenge_method=S256&state=3z6x0v0v4y351o6k1s5o1v2y4s6z241s&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fhome_screen";


// backend/fitbit/routes.js
import express from "express";
import crypto from "crypto";
import base64url from "base64url";
import axios from "axios";

const router = express.Router();

const CLIENT_ID = process.env.FITBIT_CLIENT_ID;
const CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET;
const REDIRECT_URI = process.env.FITBIT_REDIRECT_URI;
const SCOPES = process.env.FITBIT_SCOPES || "profile activity sleep";
const APP_DEEP_LINK = process.env.APP_DEEP_LINK; // expo deep link back to app

// In-memory store for PKCE/state per login (OK for dev)
// Later you can move this to DB/Redis.
const pkceStore = new Map();

/** PKCE helpers */
function makeVerifier() {
  return base64url(crypto.randomBytes(32));
}
function makeChallenge(verifier) {
  const hash = crypto.createHash("sha256").update(verifier).digest();
  return base64url(hash);
}

/**
 * 1) AUTHORIZE
 * Mobile hits this, backend returns an URL to open in browser.
 */
router.get("/authorize", (req, res) => {
  const state = base64url(crypto.randomBytes(16));
  const code_verifier = makeVerifier();
  const code_challenge = makeChallenge(code_verifier);

  pkceStore.set(state, code_verifier);

  const authUrl =
    "https://www.fitbit.com/oauth2/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      code_challenge: code_challenge,
      code_challenge_method: "S256",
      state,
    }).toString();

  res.json({ authUrl });
});

/**
 * 2) CALLBACK
 * Fitbit redirects here with ?code=xxx&state=yyy
 */
router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).send("Missing code/state");
  }

  const code_verifier = pkceStore.get(state);
  if (!code_verifier) {
    return res.status(400).send("Invalid state");
  }

  pkceStore.delete(state);

  try {
    const tokenResp = await axios.post(
      "https://api.fitbit.com/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
        code_verifier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        },
      }
    );

    const tokens = tokenResp.data;
    /**
     tokens looks like:
     {
       access_token,
       refresh_token,
       expires_in,
       user_id,
       scope,
       token_type
     }
    */

    // TODO: store in DB (even if no user table yet)
    // Example: save to fitbit_tokens table keyed by tokens.user_id
    // await db.insert(fitbit_tokens).values({...})

    // Send user back into Expo app
    if (APP_DEEP_LINK) {
      const deepLinkUrl =
        APP_DEEP_LINK +
        "?" +
        new URLSearchParams({ fitbit_user_id: tokens.user_id }).toString();
      return res.redirect(deepLinkUrl);
    }

    // Fallback for browser testing
    res.json(tokens);
  } catch (e) {
    console.error("Token exchange failed:", e.response?.data || e.message);
    res.status(500).json({ error: "Token exchange failed" });
  }
});

/**
 * 3) DAILY SUMMARY
 * Backend pulls data using stored token.
 */
router.get("/daily-summary/:fitbit_user_id", async (req, res) => {
  const { fitbit_user_id } = req.params;

  try {
    // TODO: load tokens from DB
    // const row = await db.select().from(fitbit_tokens).where(eq(...))
    const row = null; // replace with DB fetch

    if (!row) return res.status(404).json({ error: "No tokens saved" });

    let accessToken = row.access_token;

    // If expired, refresh first
    const now = Date.now();
    if (row.expires_at && now > row.expires_at) {
      const refreshResp = await axios.post(
        "https://api.fitbit.com/oauth2/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: row.refresh_token,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
          },
        }
      );

      const refreshed = refreshResp.data;

      accessToken = refreshed.access_token;

      // TODO: update DB with new tokens + new expires_at
    }

    const date = "today";

    const [profile, activity, sleep] = await Promise.all([
      axios.get("https://api.fitbit.com/1/user/-/profile.json", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      axios.get(
        `https://api.fitbit.com/1/user/-/activities/date/${date}.json`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ),
      axios.get(
        `https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ),
    ]);

    const summary = {
      steps: activity.data?.summary?.steps ?? 0,
      calories_out: activity.data?.summary?.caloriesOut ?? 0,
      sleep_minutes: sleep.data?.summary?.totalMinutesAsleep ?? 0,
      display_name: profile.data?.user?.displayName ?? "",
    };

    res.json(summary);
  } catch (e) {
    console.error("Daily summary failed:", e.response?.data || e.message);
    res.status(500).json({ error: "Daily summary failed" });
  }
});

export default router;

