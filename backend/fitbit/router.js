import express from "express";
import crypto from "crypto";
import base64url from "base64url";
import axios from "axios";


// import musb be donwload for run router

const router = express.Router();

const CLIENT_ID = process.env.FITBIT_CLIENT_ID;
const REDIRECT_URI = process.env.FITBIT_REDIRECT_URI;
const SCOPES = process.env.FITBIT_SCOPES || "profile activity sleep";

// temporary PKCE store (dev only)
const pkceStore = new Map();

let fitbitTokens = null;

function setTokens(t){
  fitbitTokens = t;
}

function getTokens(){
  return fitbitTokens;
}




async function refreshAccessToken() {
  const tokens = getTokens();
  if (!tokens?.refresh_token) throw new Error("No refresh token found");

  const refreshResp = await axios.post(
    "https://api.fitbit.com/oauth2/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
      client_id: CLIENT_ID,
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

  const newTokens = refreshResp.data;
  setTokens(newTokens);
  return newTokens;
}



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
    setTokens(tokens)

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

router.get("/profile", async (req, res) => {
  let tokens = getTokens();

  if (!tokens?.access_token) {
    return res.status(401).json({ error: "Not connected to Fitbit yet." });
  }

  try {
    const profileResp = await axios.get(
      "https://api.fitbit.com/1/user/-/profile.json",
      { headers: { Authorization: `Bearer ${tokens.access_token}` } }
    );

    return res.json(profileResp.data);

  } catch (err) {
    // If token expired, refresh once and retry
    if (err.response?.status === 401) {
      try {
        tokens = await refreshAccessToken();

        const retryResp = await axios.get(
          "https://api.fitbit.com/1/user/-/profile.json",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        );

        return res.json(retryResp.data);
      } catch (refreshErr) {
        return res.status(401).json({ error: "Token expired and refresh failed" });
      }
    }

    console.error("❌ Fitbit profile error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Failed to fetch profile",
      details: err.response?.data || err.message,
    });
  }
});


// GET /fitbit/calories-burned?date=YYYY-MM-DD
router.get("/calories-burned", async (req, res) => {
  let tokens = getTokens();
  if (!tokens?.access_token) {
    return res.status(401).json({ error: "Not connected to Fitbit yet." });
  }

  // default: today (Fitbit expects YYYY-MM-DD)
  const date =
    req.query.date ||
    new Date().toISOString().slice(0, 10);

  async function fetchCalories(accessToken) {
    const url = `https://api.fitbit.com/1/user/-/activities/date/${date}.json`;
    const resp = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return resp.data;
  }

  try {
    const data = await fetchCalories(tokens.access_token);

    const caloriesOut = data?.summary?.caloriesOut;

    return res.json({
      date,
      caloriesOut,
      summary: data.summary, // optional extra detail for you
    });

  } catch (err) {
    // If expired, refresh once then retry
    if (err.response?.status === 401) {
      try {
        tokens = await refreshAccessToken();
        const data = await fetchCalories(tokens.access_token);

        const caloriesOut = data?.summary?.caloriesOut;

        return res.json({
          date,
          caloriesOut,
          summary: data.summary,
          refreshed: true,
        });
      } catch (refreshErr) {
        return res.status(401).json({
          error: "Token expired and refresh failed",
        });
      }
    }

    console.error("❌ Calories-burned error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Failed to fetch calories burned",
      details: err.response?.data || err.message,
    });
  }
});

// GET /fitbit/weight  (latest weight + bmi)
router.get("/weight", async (req, res) => {
  let tokens = getTokens();
  if (!tokens?.access_token) {
    return res.status(401).json({ error: "Not connected to Fitbit yet." });
  }

  async function fetchLatestWeight(accessToken) {
    const url = "https://api.fitbit.com/1/user/-/body/log/weight/date/today/1d.json";
    const resp = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return resp.data;
  }

  async function fetchProfile(accessToken) {
    const url = "https://api.fitbit.com/1/user/-/profile.json";
    const resp = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return resp.data;
  }

  try {
    // 1) get latest weight log
    const wData = await fetchLatestWeight(tokens.access_token);
    const latest = wData?.weight?.[0];

    if (!latest?.weight) {
      return res.json({
        message: "No weight logs found for this user.",
        weight: null,
        bmi: null,
      });
    }

    let bmi = latest.bmi ?? null;

    // 2) if BMI missing, calculate using height
    if (bmi == null) {
      const pData = await fetchProfile(tokens.access_token);
      const heightCm = pData?.user?.height; // Fitbit height is usually in cm
      if (heightCm) {
        const heightM = heightCm / 100;
        bmi = +(latest.weight / (heightM * heightM)).toFixed(2);
      }
    }

    return res.json({
      date: latest.date,
      time: latest.time,
      weightKg: latest.weight,
      bmi,
      source: latest.bmi != null ? "fitbit" : "calculated",
    });

  } catch (err) {
    // refresh once on 401
    if (err.response?.status === 401) {
      try {
        tokens = await refreshAccessToken();

        const wData = await fetchLatestWeight(tokens.access_token);
        const latest = wData?.weight?.[0];

        if (!latest?.weight) {
          return res.json({
            message: "No weight logs found for this user.",
            weight: null,
            bmi: null,
            refreshed: true,
          });
        }

        let bmi = latest.bmi ?? null;
        if (bmi == null) {
          const pData = await fetchProfile(tokens.access_token);
          const heightCm = pData?.user?.height;
          if (heightCm) {
            const heightM = heightCm / 100;
            bmi = +(latest.weight / (heightM * heightM)).toFixed(2);
          }
        }

        return res.json({
          date: latest.date,
          time: latest.time,
          weightKg: latest.weight,
          bmi,
          source: latest.bmi != null ? "fitbit" : "calculated",
          refreshed: true,
        });

      } catch (refreshErr) {
        return res.status(401).json({
          error: "Token expired and refresh failed",
        });
      }
    }

    console.error("❌ Weight/BMI error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Failed to fetch weight/BMI",
      details: err.response?.data || err.message,
    });
  }
});


function computeDietRecommendation(snapshot) {
  const { caloriesOut, weightKg, bmi, bmiCategory, raw } = snapshot;

  const bmr = raw?.summary?.caloriesBMR ?? null;

  // 1) Base maintenance estimate
  let baseMaintenance;
  if (bmr) {
    // sedentary factor ~1.2
    baseMaintenance = Math.round(bmr * 1.2);
  } else if (weightKg) {
    // simple fallback: 25 kcal per kg
    baseMaintenance = Math.round(weightKg * 25);
  } else {
    baseMaintenance = 1800; // generic fallback
  }

  // 2) Goal from BMI
  let goal = "maintain";
  let goalAdjustment = 0;

  if (bmi != null) {
    if (bmi < 18.5) {
      goal = "gain";
      goalAdjustment = +300; // small surplus
    } else if (bmi >= 25) {
      goal = "lose";
      goalAdjustment = -400; // moderate deficit
    } else {
      goal = "maintain";
      goalAdjustment = 0;
    }
  }

  // 3) Activity adjustment using caloriesOut vs BMR
  let activityAdjustment = 0;
  if (caloriesOut != null && bmr != null) {
    const ratio = caloriesOut / bmr; // around 1.0 for your example
    if (ratio < 1.05) {
      // very low activity
      activityAdjustment = -150;
    } else if (ratio > 1.4) {
      // very active day
      activityAdjustment = +150;
    } else {
      activityAdjustment = 0;
    }
  }

  let targetCalories = baseMaintenance + goalAdjustment + activityAdjustment;

  // never go too low
  targetCalories = Math.max(1200, Math.round(targetCalories));

  const reason = [
    `BMI ${bmi?.toFixed ? bmi.toFixed(2) : bmi} (${bmiCategory || "unknown"})`,
    `BMR ≈ ${bmr || "N/A"}`,
    `Calories out today ≈ ${caloriesOut || "N/A"}`,
    `Base maintenance ≈ ${baseMaintenance} kcal`,
    goalAdjustment !== 0 ? `Goal adjustment: ${goalAdjustment > 0 ? "+" : ""}${goalAdjustment} kcal` : `Goal: maintain`,
    activityAdjustment !== 0 ? `Activity adjustment: ${activityAdjustment > 0 ? "+" : ""}${activityAdjustment} kcal` : `Activity: neutral`,
  ].filter(Boolean).join("; ");

  return {
    targetCalories,
    goal,
    reason,
  };
}


// GET /fitbit/health-snapshot?date=YYYY-MM-DD
router.get("/health-snapshot", async (req, res) => {
  let tokens = getTokens();
  if (!tokens?.access_token) {
    return res.status(401).json({ error: "Not connected to Fitbit yet." });
  }

  // If no date provided, use today
  const date =
    req.query.date ||
    new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

  async function fetchCalories(accessToken) {
    const url = `https://api.fitbit.com/1/user/-/activities/date/${date}.json`;
    const resp = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return resp.data;
  }

  async function fetchWeight(accessToken) {
    const url = `https://api.fitbit.com/1/user/-/body/log/weight/date/${date}/1d.json`;
    const resp = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return resp.data;
  }

  function bmiCategory(bmi) {
    if (bmi == null) return null;
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "normal";
    if (bmi < 30) return "overweight";
    return "obese";
  }

  try {
    // Call both Fitbit APIs in parallel
    const [calData, wData] = await Promise.all([
      fetchCalories(tokens.access_token),
      fetchWeight(tokens.access_token),
    ]);

    const caloriesOut = calData?.summary?.caloriesOut ?? null;

    const latest = wData?.weight?.[0]; // most recent weight log that day
    let weightKg = null;
    let bmi = null;
    let bmiSource = null;

    if (latest?.weight != null) {
      weightKg = latest.weight;
      if (latest.bmi != null) {
        bmi = latest.bmi;
        bmiSource = "fitbit";
      } else {
        // If you want, you could fetch profile & calculate here like we did before
        bmiSource = null;
      }
    }

    const snapshot = {
  date,
  caloriesOut,
  weightKg,
  bmi,
  bmiCategory: bmiCategory(bmi),
  bmiSource,
  raw: {
    summary: calData.summary,
    weight: wData.weight,
  },
};

// ⬇️ new: compute recommendation
const recommendation = computeDietRecommendation(snapshot);


return res.json({snapshot, recommendation,});



  } catch (err) {
    // Handle expired token (401) once, then retry
    if (err.response?.status === 401) {
      try {
        tokens = await refreshAccessToken();

        const [calData, wData] = await Promise.all([
          fetchCalories(tokens.access_token),
          fetchWeight(tokens.access_token),
        ]);

        const caloriesOut = calData?.summary?.caloriesOut ?? null;
        const latest = wData?.weight?.[0];

        let weightKg = null;
        let bmi = null;
        let bmiSource = null;

        if (latest?.weight != null) {
          weightKg = latest.weight;
          if (latest.bmi != null) {
            bmi = latest.bmi;
            bmiSource = "fitbit";
          }
        }

           const snapshot = {
  date,
  caloriesOut,
  weightKg,
  bmi,
  bmiCategory: bmiCategory(bmi),
  bmiSource,
  raw: {
    summary: calData.summary,
    weight: wData.weight,
  },
};

// ⬇️ new: compute recommendation
const recommendation = computeDietRecommendation(snapshot);

return res.json({snapshot, recommendation,});


        
      } catch (refreshErr) {
        console.error("❌ refresh failed in health-snapshot:", refreshErr.response?.data || refreshErr.message);
        return res.status(401).json({
          error: "Token expired and refresh failed in health-snapshot",
        });
      }
    }

    console.error("❌ health-snapshot error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Failed to fetch health snapshot",
      details: err.response?.data || err.message,
    });
  }
});
