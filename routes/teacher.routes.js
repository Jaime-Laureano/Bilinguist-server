const router = require("express").Router();
const Message = require("../models/Message.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isTeacher = require("../middleware/isTeacher");

router.use(isLoggedIn);

router.get("/teacher-profile", isTeacher, (req,res) => {
    res.json("teacher-profile")
})

router.get("/message-board", isTeacher, (req,res) => {
    res.json("message-board")
})

router.get("/new-message", isTeacher, (req,res) => {
    res.json("new message")
})

router.get("/video-chat", isTeacher, (req,res) => {
    res.json("video-chat")
})

router.get("/post-ad", isTeacher, (req,res) => {
    res.json("post-ad")
})

router.post("/new-message", isTeacher, (req, res) => {
    
}) 

module.exports = router;