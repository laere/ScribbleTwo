const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogPostSchema = {};

const BlogPost = mongoose.model("blogposts", blogPostSchema);
module.exports = BlogPost;
