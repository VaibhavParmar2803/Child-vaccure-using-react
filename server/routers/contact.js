const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth, isAdmin } = require("../middleware/auth")

const { createContact, getAllContact } = require("../controllers/contact")

router.get("/", auth, isAdmin, getAllContact)

router.post("/create",
    check('fullName', 'Full name is required.').notEmpty(),
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('phone', 'Phone number is required.').notEmpty(),
    check('phone', 'Please enter a valid phone number').isLength({ min: 10, max: 13 }),
    check('message', 'Message is required.').notEmpty(),
    check('vaccine', 'Vaccine is required.').notEmpty(),
    createContact
)

module.exports = router    
