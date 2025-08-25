import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 5174;
const YT_API_KEY = process.env.YT_API_KEY;
const YT_CHANNEL_ID = process.env.YT_CHANNEL_ID;

app.use(cors());
app.use(express.json());

function ytUrl(path, params) {
  const url = new URL("https://www.googleapis.com/youtube/v3/" + path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/youtube/latest", async (req, res) => {
  try {
    if (!YT_API_KEY || !YT_CHANNEL_ID) {
      return res.json({
        item: {
          videoId: "dQw4w9WgXcQ",
          title: "Exemple: configure YT_API_KEY et YT_CHANNEL_ID",
          publishedAt: new Date().toISOString(),
        },
      });
    }
    const url = ytUrl("search", {
      key: YT_API_KEY,
      channelId: YT_CHANNEL_ID,
      part: "snippet",
      order: "date",
      maxResults: "1",
      type: "video",
    });
    const r = await fetch(url);
    const j = await r.json();
    const item = j.items?.[0];
    res.json({
      item: item
        ? {
            videoId: item.id.videoId,
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
          }
        : null,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "yt_latest_failed" });
  }
});

app.get("/api/youtube/videos", async (req, res) => {
  try {
    const maxResults = String(Math.min(Number(req.query.maxResults || 5), 10));
    if (!YT_API_KEY || !YT_CHANNEL_ID) {
      const items = Array.from({ length: Number(maxResults) }).map((_, i) => ({
        videoId: "dQw4w9WgXcQ",
        title: `Vidéo exemple #${i + 1} (configure YT_API_KEY & YT_CHANNEL_ID)`,
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
      }));
      return res.json({ items });
    }
    const url = ytUrl("search", {
      key: YT_API_KEY,
      channelId: YT_CHANNEL_ID,
      part: "snippet",
      order: "date",
      maxResults,
      type: "video",
    });
    const r = await fetch(url);
    const j = await r.json();
    const items = (j.items || []).map((it) => ({
      videoId: it.id.videoId,
      title: it.snippet.title,
      thumbnail:
        it.snippet.thumbnails?.high?.url ||
        it.snippet.thumbnails?.medium?.url,
      publishedAt: it.snippet.publishedAt,
    }));
    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "yt_list_failed" });
  }
});

/* -------------------- MARIO KART WORLD -------------------- */
app.get("/api/mkworld/leaderboard", async (req, res) => {
  try {
    const response = await fetch(
      "https://lounge.mkcentral.com/api/player/leaderboard?game=mkworld&season=0"
    );
    const data = await response.json();

    const players = data.data.map((player) => ({
      overallRank: player.overallRank,
      name: player.name,
      mmr: player.mmr,
      countryCode: player.countryCode || null,
    }));

    res.json({ players });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "mkworld_failed" });
  }
});

app.listen(PORT, () => {
  console.log(`[API] listening on http://localhost:${PORT}`);
});
