const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  password: {
    type: String,
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

userSchema.pre("save", function(next) {
  console.log("THIS", this);
  bcrypt.hash(
    this.password,
    10,
    function(err, hash) {
      if (err) next(err);
      this.password = hash;
      next();
    }.bind(this)
  );
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { id: this.id, username: this.username, avatar: this.avatar },
    keys.secretOrKey,
    {
      expiresIn: 3600
    }
  );
  return token;
};

const User = mongoose.model("users", userSchema);
module.exports = User;
