const router = require("express").Router();
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model");
const cors = require("cors");
const fetch = require("node-fetch");
const logger = require("morgan");




// ***** This is all for Cloudinary *****

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/student-profile", fileUploader.single("imageUrl"), (req, res) => {
  console.log(req.body, "heyooo", req.file.path);
  let newImage = req.file.path;
  let userId = req.body.userId

  User.findByIdAndUpdate(userId, { imageUrl: newImage })
    .then((updatedUser) => {
      console.log("here is the Updated User", updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((error) =>
      console.log(`Error while creating uploading image: ${error}`)
    );
});

// ***** This is all for Video Chat *****

const API_KEY2 = process.env.daily_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY2,
};

const getRoom = (room) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};


const createRoom = (room) => {
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("error: hello" + err));
};

router.get("/video-call/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});

module.exports = router;
