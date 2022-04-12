const router = require("express").Router();
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model");



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

module.exports = router;
