

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 5000;


const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
});
const Video = mongoose.model("Video", VideoSchema);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.get("/videos", async (req, res) => {
  try {
    const videoDocs = await Video.find({});
    if (videoDocs.length === 0) {
      return res.json({ message: "No videos found in database." });
    }

    const videoIds = videoDocs.map((v) => v.videoId).join(",");

    
    const fetch = (await import("node-fetch")).default;

  
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await ytRes.json();

    if (!data.items) {
      return res.status(400).json({ error: "Failed to fetch YouTube data" });
    }

    const result = data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: item.contentDetails.duration,
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

