const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const User = require('../models/User')

//Route 1:Create a new blog using Post. api/blogs/createblog (Login Required)
router.post(
  "/createblog",
  fetchuser,
  [
    body("title", "Title is required").notEmpty(),
    body("content", "Content must be at least 10 characters long").isLength({
      min: 10,
    }),
    body("category", "Category is required").notEmpty(),
  ],
  async (req, res) => {
    //if there are errors then return the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, category } = req.body;
      const blog = await Blog.create({
        title,
        content,
        category,
        authorId: req.user.id,
      });
      res.status(201).json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//Route2 :Fetch All Blog Posts using:GET /api/blogs/fetchallblogs
router.get("/fetchallblogs", async (req, res) => {
    try {
        const blogs = await Blog.findAll({
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['id', 'username', 'email'] 
            }
          ] 
        })
        res.json(blogs);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
