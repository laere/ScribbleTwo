const _ = require("lodash");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BlogPost = require("../models/BlogPost");
const myAsync = require("../middleware/async");
const passport = require("passport");

router.get(
  "/:blogPostId",
  myAsync(async (req, res, next) => {
    let blogPost = await BlogPost.findById(req.params.blogPostId);

    if (!blogPost) return next();

    res.send(blogPost);
  })
);

router.post(
  "/",
  myAsync(async (req, res, next) => {
    console.log(req.body);

    let newBlogPost = new BlogPost({ ...req.body });

    await newBlogPost.save();

    res.send(newBlogPost);
  })
);

module.exports = router;
