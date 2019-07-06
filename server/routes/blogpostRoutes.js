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
  "/",
  myAsync(async (req, res, next) => {
    let blogPosts = await BlogPost.find({}).populate("user", [
      "username",
      "avatar"
    ]);

    res.send(blogPosts);
  })
);

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

    let newBlogPost = new BlogPost({ user: req.user.id, ...req.body });

    await newBlogPost.save();

    res.send(newBlogPost);
  })
);

router.delete(
  "/:blogPostId",
  myAsync(async (req, res, next) => {
    let blogPost = await BlogPost.findOneAndRemove({
      _id: req.params.blogPostId
    });

    res.send(blogPost);
  })
);

router.put(
  "/:blogPostId",
  myAsync(async (req, res, next) => {
    let blogPost = await BlogPost.findOneAndUpdate(
      { _id: req.params.blogPostId },
      { $set: req.body },
      { new: true }
    );

    await blogPost.save();

    res.send(blogPost);
  })
);

module.exports = router;
