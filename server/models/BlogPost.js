const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  datecreated: { type: Date, default: Date.now }
};

const BlogPost = mongoose.model("blogposts", blogPostSchema);
module.exports = BlogPost;
