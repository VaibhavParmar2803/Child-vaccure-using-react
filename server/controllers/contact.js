const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const createContact = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullName, email, phone, message } = req.body;

        const newContact = await new Contact({
            fullName,
            email,
            phone,
            message
        }).save();

        return res.status(201).json({
            error: false,
            message: "Contact created successfully.",
            contact: newContact,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

const getAllContact = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortOrder = parseInt(req.query.sortOrder) || -1;
    const sortField = req.query.sortField || "createdAt";

    try {
        const skip = (page - 1) * limit;

        const totalContacts = await Contact.countDocuments();
        const contacts = await Contact.find().sort({ [sortField]: sortOrder }).skip(skip).limit(limit).lean();

        return res.status(200).json({
            error: false,
            message: "Contacts retrieved successfully.",
            contacts,
            currentPage: page,
            totalPages: Math.ceil(totalContacts / limit),
            totalContacts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Server error" });
    }
});

module.exports = { createContact, getAllContact };
