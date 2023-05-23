const express = require("express");
const User = require("../models/User");
const router = express.Router();
// bcryptjs using
const bcrypt = require("bcryptjs");
// json web token
const jwt = require("jsonwebtoken");
// express vallidator
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "nitishisagoodboy@12434";
//ROUTES - 1 creating a user using : post "api/auth/createuser".no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are error, return BAD request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check wheather the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      // create a user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      // using jwebtoken
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server occured");
    }
  }
);

//ROUTES - 2 loging a user using : post "api/auth/login".no login required
router.post("/login",[
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blanked").exists(),
  ],
  async (req, res) => {
    let success = false
    // if there are error, return BAD request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server occured");
    }
  }
); 
//ROUTES - 3 get a loging user detail using : POST "api/auth/getuser".login required
router.post("/getuser",fetchuser,async (req, res) => {
try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server occured");
  }
})
module.exports = router;
