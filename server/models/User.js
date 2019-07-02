const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  profilename: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 24
  },
  avatar: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("users", userSchema);
module.exports = User;
