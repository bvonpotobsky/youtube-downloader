const fs = require("fs");
const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname, "public/index.html");
  } catch (err) {
    console.error(err);
  }
});

app.get("/videoInfo", async (req, res) => {
  try {
    const videoURL = req.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    res.status(200).json(info);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/download", async (req, res) => {
  try {
    const videoURL = req.query.videoURL;
    const itag = req.query.itag;
    console.log(req);
    ytdl(videoURL, {
      format: itag,
    }).pipe(fs.createWriteStream("videos/video.mp4"));
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  try {
    console.log("SERVER STARTED");
  } catch (err) {
    console.error(err.message);
  }
});
