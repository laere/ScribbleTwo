const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = {};

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
