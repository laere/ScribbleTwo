const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: { type: String, required: true },
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  dislikes: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  datecreated: { type: Date, default: Date.now }
};

const blogPostSchema = {
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  image: { type: String },
  content: { type: String, required: true },
  comments: [commentSchema],
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  datecreated: { type: Date, default: Date.now }
};

const BlogPost = mongoose.model("blogposts", blogPostSchema);
module.exports = BlogPost;
