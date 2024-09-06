const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

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
// Access: Public
router.get("/fetchallblogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route3 :Fetch a single Blog Post using:GET /api/blogs/:id
// Access: Public
router.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route4 : Delete a blog using : Delete (Login required) /api/blogs/delete/:id
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const blog = await Blog.findByPk(blogId);
    //check if blog post exists
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Check if user is the author
    if (blog.authorId !== userId) {
      return res
        .status(403)
        .json({ error: "Access denied. You can only delete your own posts." });
    }

    // Delete the blog post
    await blog.destroy();

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route4 : Update a blog post using : PUT (Login required) /api/blogs/update/:id
router.put("/update/:id", fetchuser, [
  body("title", "Title is required").notEmpty(),
  body("content", "Content must be at least 10 characters long").isLength({
    min: 10,
  }),
  body("category", "Category is required").notEmpty(),
],async (req,res) => {
  try {
    //validation check
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const blogId = req.params.id
    const userId = req.user.id

    const { title, content, category } = req.body;
    let blog = await Blog.findByPk(blogId)

    if(!blog){
      return res.status(404).json({ error: "Blog post not found" });
    }

    if(blog.authorId !== userId){
      return res.status(403).json({ error: "Access denied. You can only update your own posts." });
    }

     // Update the blog post
     blog.title = title;
     blog.content = content;
     blog.category = category;

     // Save the updated blog post
     await blog.save();
     res.json(blog)

  } catch (error) {
    console.log(error)
    return res.status(500).json({error : 'Internal Server error'})
  }
});

module.exports = router;
