const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    }
}, {
    timestamps: true,
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
