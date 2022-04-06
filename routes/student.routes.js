const router = require("express").Router();
const mongoose = require("mongoose");
const axios = require("axios");
const Student = require("../models/Student.model");
const Teacher = require("../models/Teacher.model");
const Message = require("../models/Message.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isStudent = require("../middleware/isStudent");

router.use(isLoggedIn);

