const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
  console.log("first console log");
  res.json("hello Biatch");
});


router.get("/signup", (req,res) => {
  console.log("hi")
  res.json("this will be sign up form")
})

// router.get("/loggedin", (req, res) => {
//   res.json(req.user);
// });

router.post("/signup", isLoggedOut, async (req, res) => {
  try {
    const { user: email, password } = req.body;

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

    await User.create({ username, password: hashedPass });

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
    return res
      .status(400)
      .json({ errorMessage: "Please provide your email." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Email or password incorrect" });
        }
        req.session.user = user;
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
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.json({ message: "Logged Out" });
  });
});

module.exports = router;
