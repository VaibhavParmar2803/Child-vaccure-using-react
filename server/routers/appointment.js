const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth, isAdmin } = require("../middleware/auth")

const { bookAppintment, updateAppointment, deleteAppointment, getAllAppointment, getPendingAppointment, getCompletedAppointment, getSingleAppointment, updateStatusOfAppointment } = require("../controllers/appointment")

router.get("/", auth, isAdmin, getAllAppointment)

router.get("/pending", auth, isAdmin, getPendingAppointment)

router.get("/completed", auth, isAdmin, getCompletedAppointment)

router.get("/single/:id", auth, isAdmin, getSingleAppointment)

router.post("/book",
    check('fullName', 'Full name is required.').notEmpty(),
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.').notEmpty(),
    check('password', 'Please enter a password with 8 or more characters.').isLength({ min: 8 }),
    check('phone', 'Phone number is required.').notEmpty(),
    check('phone', 'Please enter a valid phone number').isLength({ min: 10, max: 13 }),
    check('address', 'Address is required.').notEmpty(),
    check('date', 'Date is required.').notEmpty(),
    check('time', 'Time is required.').notEmpty(),
    check('vaccine', 'Vaccine is required.').notEmpty(),
    check('gender', 'Gender is required.').notEmpty(),
    bookAppintment
)

router.put("/update/:id",
    check('fullName', 'Full name is required.').notEmpty(),
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('phone', 'Phone number is required.').notEmpty(),
    check('phone', 'Please enter a valid phone number').isLength({ min: 10, max: 13 }),
    check('address', 'Address is required.').notEmpty(),
    check('date', 'Date is required.').notEmpty(),
    check('time', 'Time is required.').notEmpty(),
    check('vaccine', 'Vaccine is required.').notEmpty(),
    check('gender', 'Gender is required.').notEmpty(),
    auth, isAdmin, updateAppointment)

router.put("/update/status/:id",
    check('fullName', 'Full name is required.').notEmpty(),
    check('email', 'Email is required.').notEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('phone', 'Phone number is required.').notEmpty(),
    check('phone', 'Please enter a valid phone number').isLength({ min: 10, max: 13 }),
    auth, isAdmin, updateStatusOfAppointment)

router.delete("/delete/:id", auth, isAdmin, deleteAppointment)

module.exports = router    
