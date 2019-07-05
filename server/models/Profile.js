const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  following: [{ type: Schema.Types.ObjectId, ref: "users" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  username: {
    type: String
  },
  profilename: { type: String, default: "Untitled" },
  description: { type: String },
  social: [{ type: String }]
};

const Profile = mongoose.model("profiles", profileSchema);
module.exports = Profile;
