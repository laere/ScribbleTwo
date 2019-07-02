const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = {
  following: [],
  followers: [],
  name: {},
  avatar: {},
  description: {},
  social: {}
};

const Profile = mongoose.model("profiles", profileSchema);
module.exports = Profile;
