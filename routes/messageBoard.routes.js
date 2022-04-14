const router = require("express").Router();
const Message = require("../models/Message.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isStudent = require("../middleware/isStudent");



router.get("/student-profile", isLoggedIn, (req, res) => {
	res.json("student-profile");
});

router.get("/new-message", isLoggedIn,isStudent,(req, res) => {
	res.json("new message");
});

router.get("/video-chat", isLoggedIn, isStudent, (req, res) => {
	res.json("video-chat");
});

router.get("/find-teacher", isLoggedIn,isStudent, (req, res) => {
	res.json("find-teacher");
});

router.get("/practice", isLoggedIn, isStudent, (req, res) => {
	res.json("practice");
});

router.post("/new-message", isLoggedIn, isStudent, (req, res) => {});

module.exports = router;
