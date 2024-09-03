const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

JWT_SECRET = 'ProjectBlog$12'

//Route 1. Create a user using: POST 'api/auth/createuser'. Doesn't require Auth
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

      const data = {
        user : {
          id : user.id
        }
      }

      const authtoken = jwt.sign(data , JWT_SECRET)
      res.status(201).json({authtoken});
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal server error" });
    }
  }
);

//Route 2. Create a user using: POST 'api/auth/login'. Doesn't require Auth
router.post('/login',[
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password",'Password cannot be blank').exists(),
],async (req,res) =>{
  //if there are errors then return the errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { email , password } = req.body;
  try {
    let user =await User.findOne({ where: { email: req.body.email } })
    if(!user){
      return res.status(400).json('Please try to login with correct credentials')
    }

    const passwordCompare =await bcrypt.compare(password ,user.password);
    if(!passwordCompare){
      return res.status(400).json('Please try to login with correct credentials')
    }

    const data = {
       user :{
        id : user.id
       }
    }

    const authtoken = jwt.sign(data ,JWT_SECRET);
    res.status(201).json({authtoken});
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Internal server error')
  }

})




module.exports = router;
