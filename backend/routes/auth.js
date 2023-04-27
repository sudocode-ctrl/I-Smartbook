const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SIGN = "itsmysign";

//ROUTE: Creating a user using: POST "/api/auth" Doesn't require auth
router.post('/createuser', [
    body('name', "Enter a valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Enter a valid password").isLength({ min: 5 }),

], async (req, res) => {
    success = false;
    // If there are errors then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // Check if user with same email already exist
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })

        }
        const salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SIGN);

        success = true;

        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error occoured");
    }

})

// ROUTE2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [

    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),

], async (req, res) => {
    success = false;
    // If there are errors then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const name = user.name
        const authToken = jwt.sign(data, JWT_SIGN);
        success = true
        res.json({ success, authToken, name })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");
    }
});

// ROUTE3: Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error occoured");

    }

})
module.exports = router