const router = require("express").Router();
const Message = require("../models/Message.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isStudent = require("../middleware/isStudent");

router.use(isLoggedIn);

router.get("/student-profile", (req, res) => {
	res.json("student-profile");
});

router.get("/new-message", isStudent, (req, res) => {
	res.json("new message");
});

router.get("/video-chat", isStudent, (req, res) => {
	res.json("video-chat");
});

router.get("/find-teacher", isStudent, (req, res) => {
	res.json("find-teacher");
});

router.get("/practice", isStudent, (req, res) => {
	res.json("practice");
});

router.post("/new-message", isStudent, (req, res) => {});

module.exports = router;
