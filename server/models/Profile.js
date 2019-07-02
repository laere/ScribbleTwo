const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = {};

const Profile = mongoose.model("profiles", profileSchema);
module.exports = Profile;
