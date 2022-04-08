const router = require("express").Router();
const Message = require("../models/Message.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isTeacher = require("../middlewares/isTeacher");

router.use(isLoggedIn);

router.get("/teacher-profile", isTeacher, (req,res) => {
    res.render("teacher-profile")
})

router.get("/message-board", isTeacher, (req,res) => {
    res.render("message-board")
})

router.get("/video-chat", isTeacher, (req,res) => {
    res.render("video-chat")
})

router.get("/post-ad", isStudent, (req,res) => {
    res.render("post-ad")
})

module.exports = router;