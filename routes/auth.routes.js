const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/user", (req, res) => {
	console.log(req.session, "%%%%%%%%%%%%%%%%");
	res.json(req.session.user);
});

router.get("/signup", (req, res) => {
	res.json("this will be sign up form");
});

router.post("/signup", isLoggedOut, async (req, res) => {
	console.log(req.body, "after");
	try {
		const { email, password, fullName, country, city, isTeacher } = req.body;

		const emailExists = await User.findOne({ email });
		if (emailExists) {
			return res
				.status(400)
				.json({ errorMessage: "A user with that email already exists!" });
		}

		if (password.length < 8) {
			return res.status(400).json({
				errorMessage: "Your password needs to be at least 8 characters long.",
			});
		}

		const salt = await bcrypt.genSalt(12);
		const hashedPass = await bcrypt.hash(password, salt);

		const userDB = await User.create({
			fullName,
			email,
			password: hashedPass,
			country,
			city,
			isTeacher,
		});
		console.log(userDB);
		return res.json({ message: "You're all signed up and good to go!" });
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ errormessage: "Whoops... something went wrong!" });
	}
});

router.post("/login", isLoggedOut, async (req, res, next) => {
	const { email, password } = req.body;

	if (!email) {
		return res.status(400).json({ errorMessage: "Please provide your email." });
	}

	if (password.length < 8) {
		return res.status(400).json({
			errorMessage: "Your password needs to be at least 8 characters long.",
		});
	}

	User.findOne({ email })
		.then((user) => {
			console.log(user, "whats up");
			if (!user) {
				return res.status(400).json({ errorMessage: "Wrong credentials." });
			}

			bcrypt.compare(password, user.password).then((isSamePassword) => {
				if (!isSamePassword) {
					return res
						.status(400)
						.json({ errorMessage: "Email or password incorrect" });
				}
				req.session.user = user;
				console.log(user, "yo yo yo yo yo ", req.session);
				// req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
				return res.json(user);
			});
		})

		.catch((err) => {
			next(err);
			return res.status(500).render("login", { errorMessage: err.message });
		});
});

router.post("/logout", isLoggedIn, (req, res) => {
	console.log("why you no log out?");
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({ errorMessage: err.message });
		}
		res.json({ message: "Logged Out" });
	});
});

module.exports = router;
