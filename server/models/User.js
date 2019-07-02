const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = {};

const User = mongoose.model("users", userSchema);
module.exports = User;
