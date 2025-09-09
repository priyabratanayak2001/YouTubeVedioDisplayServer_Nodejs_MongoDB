// server/seed.js
const mongoose = require("mongoose");
require("dotenv").config();
const Video = require("./models/Video");

const seedVideos = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Your 10 YouTube video IDs
  const videoIds = [
    "-mAXBdG61MY",
    "3JZ_D3ELwOQ",
    "kxopViU98Xo",
    "9bZkp7q19f0",
    "RgKAFK5djSk",
    "hY7m5jjJ9mM",
    "L_jWHffIx5E",
    "tVj0ZTS4WF4",
    "e-ORhEE9VVg",
    "fRh_vgS2dFE"
  ];

  await Video.deleteMany({});
  await Video.insertMany(videoIds.map(id => ({ videoId: id })));

  console.log("✅ Seeded 10 video IDs");
  mongoose.disconnect();
};

seedVideos();
