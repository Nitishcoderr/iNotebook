const express = require('express')
const User = require('../models/User')
const router = express.Router();
// bcryptjs using
const bcrypt = require('bcryptjs');
// json web token
const jwt = require('jsonwebtoken');
// express vallidator
const { body, validationResult } = require('express-validator');


const JWT_SECRET = 'nitishisagoodboy@12434'
// creating a user uding : post "api/auth/createuser".no login required

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 character').isLength({ min: 5 })
], async (req, res) => {
    // if there are error, return BAD request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // check wheather the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash("req.boby.password", salt); 
        // create a user 
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        // using jwebtoken
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);

        // res.json(user)
        res.json({authtoken})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    } {
    }
})

module.exports = router