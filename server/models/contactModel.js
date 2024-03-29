const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
