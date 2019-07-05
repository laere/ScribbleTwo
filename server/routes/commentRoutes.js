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

module.exports = router;
