const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  datecreated: { type: Date, default: Date.now }
};

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
