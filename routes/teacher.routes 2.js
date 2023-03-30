const router = require("express").Router();
const Message = require("../models/Message.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isTeacher = require("../middleware/isTeacher");
const AddTeacher = require("../models/AddTeacher.model");

router.get("/teacher-profile", isLoggedIn, (req, res) => {
	res.json("teacher-profile");
});

router.get("/message-board", isLoggedIn, async (req, res) => {
	const messages = await Message.find();
	//console.log(messages, "all messages ****");
	res.json({ messages });
});

router.get("/message-board/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;

	const message = await Message.findById(id);
	res.json({ message });
});

router.put("/message-board/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	console.log("here", id, req.body);

	const message = await Message.findByIdAndUpdate(id, {
		comment: req.body.comment,
	});
	//	console.log(message, "foundmessage ****");
	res.json({ message });
});

router.get("/new-message", isLoggedIn, (req, res) => {
	res.json("new message");
});

router.get("/video-chat", isLoggedIn, (req, res) => {
	res.json("video-chat");
});

// router.get("/add-teacher", isTeacher, (req,res) => {
//     res.json("add-teacher")
// })

router.post("/add-teacher", isLoggedIn, async (req, res, next) => {
	console.log(
		req.session.user.city,
		req.session.user.fullName,
		"<<<<<< I hopw this logs",
	);
	try {
		const { fullName, languages, cityRec, langLevel, goals, funFact, price } =
			req.body;
		const newTeach = new AddTeacher({
			fullName: req.session.user.fullName,
			languages,
			cityRec,
			langLevel,
			goals,
			funFact,
			price,
			city: req.session.user.city,
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
	console.log(req.body, "reqq bodyyyy");
	try {
		const { comment, from } = req.body;

		const userPersonId = req.session.user.fullName;

		await Message.create({ comment, from: userPersonId });

		res.json({ message: "Succesfully posted new message" });
	} catch (err) {
		console.log(err, "*********");
		res.status(400).json({
			errorMessage: "Something went wrong! " + err.message,
		});
	}
});

router.post("/message-board/:id", isLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(id);
		await Message.findByIdAndDelete(id);
		res.json({ message: "Successfully delete message " + id });
	} catch (err) {
		res
			.status(400)
			.json({ errorMessage: "Error in deleting message! " + err.message });
	}
});

router.get("/find-teacher", isLoggedIn, async (req, res) => {
	const allTeachers = await AddTeacher.find();

	res.json({ allTeachers });
});

router.get("/add-teacher/:id", isLoggedIn, async (req, res) => {
	console.log("am I in this route????");
	const { id } = req.params;

	const message = await AddTeacher.findById(id);
	res.json({ message });
});

router.put("/add-teacher/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const {
		city,
		cityRec,
		fullName,
		funFact,
		goals,
		langLevel,
		languages,
		price,
	} = req.body;
	console.log(req.body);

	const message = await AddTeacher.findByIdAndUpdate(id, {
		city,
		cityRec,
		fullName,
		funFact,
		goals,
		langLevel,
		languages,
		price,
	});

	res.json({ message });
});

router.post("/add-teacher/:id", isLoggedIn, async (req, res, next) => {
	console.log("am I here in the delete");
	try {
		const { id } = req.params;
		console.log(id);
		await AddTeacher.findByIdAndDelete(id);
		res.json({ message: "Successfully delete message " + id });
	} catch (err) {
		res
			.status(400)
			.json({ errorMessage: "Error in deleting message! " + err.message });
	}
});

module.exports = router;
