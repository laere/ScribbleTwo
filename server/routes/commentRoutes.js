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
const validateUser = require("../validation/userValidation");

router.post(
  "/:blogPostId",
  myAsync(async (req, res, next) => {
    // Find the blog post
    let blogPost = await BlogPost.findById(req.params.blogPostId).populate(
      "user",
      ["username", "avatar"]
    );

    if (!blogPost) return next();

    const newComment = { ...req.body };

    blogPost.comments.unshift(newComment);

    await blogPost.save();

    res.send(blogPost);
  })
);

router.delete(
  "/:blogPostId/:commentId",
  myAsync(async (req, res, next) => {
    let blogPost = await BlogPost.findById(req.params.blogPostId);

    let removedComment = blogPost.comments.id(req.params.commentId);

    console.log(blogPost.comments);

    removedComment.remove();

    await blogPost.save();

    res.send(blogPost);
  })
);

router.put(
  "/:blogPostId/:commentId",
  myAsync(async (req, res, next) => {
    let blogPost = await BlogPost.findById(req.params.blogPostId);

    let newComment = { ...req.body };

    let comment = blogPost.comments.id(req.params.commentId);

    console.log(comment);

    comment.set(newComment);

    await blogPost.save();

    res.send(blogPost);
  })
);

module.exports = router;
