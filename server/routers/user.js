const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth, isAdmin } = require("../middleware/auth")

const { createUser, loginUser, updateUser, deleteUserProfile, getUserProfile, getUsers, changePassword } = require("../controllers/user")

router.get("/", auth, isAdmin, getUsers)

router.get("/profile", auth, getUserProfile)

router.get("/getUserProfile/:id", auth, getUserProfile)

router.get('/admin-auth', auth, isAdmin, (req, res) => {
    res.status(200).json({ ok: true })
})

router.get('/user-auth', auth, (req, res) => {
    res.status(200).json({ ok: true })
})

router.post("/register",
    check('fullName', 'Full name is required.').notEmpty(),
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.').notEmpty(),
    check('password', 'Please enter a password with 8 or more characters.').isLength({ min: 8 }),
    check('phone', 'Phone number is required.').notEmpty(),
    check('phone', 'Please enter a valid phone number').isLength({ min: 10, max: 13 }),
    createUser
)

router.post("/login",
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.').notEmpty(),
    check('password', 'Please enter a password with 8 or more characters.').isLength({ min: 8 }),
    loginUser
)

router.put("/updateProfile",
    check('fullName', 'Full name is required.').notEmpty(),
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('phone', 'Phone number is required.').notEmpty(),
    check('phone', 'Please enter a valid phone number').isLength({ min: 10, max: 13 }),
    auth, updateUser)

router.put("/updateProfile/:id",
    check('fullName', 'Full name is required.').notEmpty(),
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('phone', 'Phone number is required.').notEmpty(),
    check('phone', 'Please enter a valid phone number').isLength({ min: 10, max: 13 }),
    auth, isAdmin, updateUser)

router.put("/resetPassword",
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.').notEmpty(),
    check('password', 'Please enter a password with 8 or more characters.').isLength({ min: 8 }),
    changePassword
)

router.delete("/deleteProfile/:id", auth, isAdmin, deleteUserProfile)

module.exports = router    
