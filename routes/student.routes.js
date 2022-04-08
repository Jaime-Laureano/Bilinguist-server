const router = require("express").Router();
const Message = require("../models/Message.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isStudent = require("../middleware/isStudent");

// router.use(isLoggedIn);

router.get("/student-profile", (req,res) => {
    console.log("whats up")
    res.json("student-profile")
})

router.get("/message-board", isStudent, (req,res) => {
    res.json("message-board")
})

router.get("/video-chat", isStudent, (req,res) => {
    res.json("video-chat")
})

router.get("/practice", isStudent, (req,res) => {
    res.json("practice")
})

module.exports = router;