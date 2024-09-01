const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')

// Create a user using: POST 'api/auth/createuser'. Doesn't require Auth
router.post(
  "/createuser",
  [
    body("username")
      .isLength({ min: 2 })
      .withMessage("Username must be at least 2 characters long"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    //if there are errors then return the errors
    const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }
    try {
      console.log(req.body);
      //check wheather user already exists
      let user = await User.findOne({ where: { email: req.body.email } });
      console.log(user)
      if(user){
        return res.status(400).json({error : "Sorry a user with this email already exists"})
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password , salt); 

      user = await User.create({
        username:req.body.username,
        email : req.body.email,
        password : secPass,
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Unable to create user" });
    }
  }
);

module.exports = router;
