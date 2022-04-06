const router = require("express").Router();
const authRoutes = require("./auth.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
  console.log("hello")
});

router.use("/auth", authRoutes);

module.exports = router;
