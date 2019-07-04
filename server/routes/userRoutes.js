const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const myAsync = require("../middleware/async");
const passport = require("passport");
const validateUser = require("../validation/userValidation");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res, next) =>
  res.send({ msg: "Hello this is a test" })
);

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post(
  "/register",
  myAsync(async (req, res, next) => {
    // validate req.body as valid register input
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    const { username, email, password } = req.body;

    const avatar = gravatar.url(email, {
      s: "200", // Size
      r: "pg", // Rating
      d: "mm" // Default
    });

    // check if user email already exists.
    let user = await User.findOne({ email });

    if (user) return next();

    // If req makes it past both checks it must be valid and non existant
    user = new User({ username, email, password, avatar });

    console.log("USER", user);

    await user.save();

    res.send(_.pick(user, ["_id", "username", "email", "avatar"]));
  })
);

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post(
  "/login",
  myAsync(async (req, res, next) => {
    // seperate validation for login
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    console.log("USER", user);

    if (!user) return next();

    const validPassword = await bcrypt.compare(password, user.password);

    console.log("PW", validPassword);

    if (!validPassword) return next();

    const token = user.generateAuthToken();

    res.send(`Bearer ${token}`);
  })
);

module.exports = router;
