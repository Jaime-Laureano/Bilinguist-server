const router = require("express").Router();
const Message = require("../models/Message.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isTeacher = require("../middleware/isTeacher");
const AddTeacher = require("../models/AddTeacher.model");

router.use(isLoggedIn);

router.get("/teacher-profile", isTeacher, (req, res) => {
	res.json("teacher-profile");
});

router.get("/message-board", isTeacher, (req, res) => {
	res.json("message-board");
});

router.get("/new-message", isTeacher, (req, res) => {
	res.json("new message");
});

router.get("/video-chat", isTeacher, (req, res) => {
	res.json("video-chat");
});

// router.get("/add-teacher", isTeacher, (req,res) => {
//     res.json("add-teacher")
// })

router.post("/add-teacher", isLoggedIn, async (req, res, next) => {
	try {
		const { fullName, languages, cityRec, langLevel, goals, funFact } =
			req.body;
		const newTeach = new AddTeacher({
			fullName,
			languages,
			cityRec,
			langLevel,
			goals,
			funFact,
		});
		await newTeach.save();
		res.json({ message: "Succesfully created new listing" });
	} catch (err) {
		res.status(400).json({
			errorMessage: "Something went wrong! " + err.message,
		});
	}
});

router.post("/message-board", isLoggedIn, async (req, res, next) => {
	try {
		const { comment, from } = req.body;
		console.log(comment, from, "<<<< comment from server ");
		const userPersonId = req.session.user.fullName;
		console.log(userPersonId, "<<<this too");

		await Message.create({ comment, from: userPersonId });

		res.json({ message: "Succesfully posted new message" });
	} catch (err) {
		console.log(err, "*********");
		res.status(400).json({
			errorMessage: "Something went wrong! " + err.message,
		});
	}
});

router.delete("/message-board", isLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.body;
		await Message.findByIdAndDelete(id);
		res.json({ message: "Successfully delete message " + id });
	} catch (err) {
		res
			.status(400)
			.json({ errorMessage: "Error in deleting message! " + err.message });
	}
});

router.get("/find-teacher", isTeacher, (req, res) => {
	res.json("find-teacher");
});

router.post("/new-message", isTeacher, (req, res) => {});

module.exports = router;
