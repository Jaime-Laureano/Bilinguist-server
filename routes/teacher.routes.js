const router = require("express").Router();
const mongoose = require("mongoose");
const Teacher = require("../models/Teacher.model");
const Student = require("../models/Student.model");
const User = require("../models/User.model");
const Message = require("../models/Message.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isTeacher = require("../middlewares/isTeacher");

router.use(isLoggedIn);

