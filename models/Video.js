const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  videoId: { type: String, required: true,unique: true },
});

module.exports = mongoose.model("Video", VideoSchema);
