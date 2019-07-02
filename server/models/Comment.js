const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  content: {},
  liked: [],
  disliked: [],
  datecreated: {}
};

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
