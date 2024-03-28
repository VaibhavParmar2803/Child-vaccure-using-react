const Appointment = require("../models/appointmentModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { hashPassword } = require("../helper/helper");

const bookAppintment = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullName, email, password, phone, address, vaccine, date, time, gender } = req.body;

        const existingAppointment = await Appointment.findOne({ email });
        if (existingAppointment) {
            return res.status(200).json({
                error: true,
                message: "Appointment already register with this email.Please enter another email.",
            });
        }

        const existingPhone = await Appointment.findOne({ phone });
        if (existingPhone) {
            return res.status(200).json({
                error: true,
                message: "Appointment already register with this phone number.Please enter another phone number.",
            });
        }

        const hashedPassword = await hashPassword(password);

        const newAppointment = await new Users({
            fullName,
            email,
            password: hashedPassword,
            phone,
            address,
            vaccine,
            date,
            time,
            gender
        }).save();

        return res.status(201).json({
            error: false,
            message: "Appointment created successfully.",
            appointment: newAppointment,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

const updateAppointment = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullName, email, phone, address, vaccine, date, time, gender } = req.body;
        const { id } = req.params;

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(400).json({
                error: true,
                message: "Appointment not found.",
            });
        }

        const existingPhone = await Appointment.findOne({ phone, _id: { $ne: appointment._id }, });
        if (existingPhone !== null) {
            return res.status(200).json({
                error: true,
                message: "Appointment already register with this phone number.Please enter another phone number.",
            });
        }

        const existingEmail = await Appointment.findOne({ email, _id: { $ne: appointment._id }, });
        if (existingEmail !== null) {
            return res.status(200).json({
                error: true,
                message: "Appointment already register with this email.Please enter another email.",
            });
        }

        const updatedFields = {
            fullName,
            email,
            phone,
            address,
            vaccine,
            date,
            time,
            gender
        };

        const updateAppointment = await Appointment.findByIdAndUpdate(appointment._id, updatedFields, { new: true, });

        return res.status(201).send({
            error: false,
            message: "Updated Successfully !!",
            updateAppointment,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

const deleteAppointment = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findOne({ _id: id });
        if (!appointment) {
            return res.status(400).json({
                error: true,
                message: "Appointment not found.",
            });
        }

        await Appointment.findByIdAndDelete({ _id: id });
        return res.status(200).send({
            error: false,
            message: "Appointment deleted successfully.",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

const getAllAppointment = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder || -1;

    try {
        const skip = (page - 1) * limit;

        const totalAppointments = await Appointment.countDocuments();
        const appointments = await Appointment.find().sort({ [sortField]: sortOrder }).skip(skip).limit(limit).populate("department").lean();

        return res.status(200).json({
            error: false,
            message: "Users retrieved successfully.",
            appointments,
            currentPage: page,
            totalPages: Math.ceil(totalAppointments / limit),
            totalAppointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Server error" });
    }
});

const getPendingAppointment = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder || -1;

    try {
        const skip = (page - 1) * limit;

        const totalAppointments = await Appointment.countDocuments({ status: 'pending' });
        const appointments = await Appointment.find({ status: 'pending' }).sort({ [sortField]: sortOrder }).skip(skip).limit(limit).populate("department").lean();

        return res.status(200).json({
            error: false,
            message: "Users retrieved successfully.",
            appointments,
            currentPage: page,
            totalPages: Math.ceil(totalAppointments / limit),
            totalAppointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Server error" });
    }
});

const getCompletedAppointment = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder || -1;

    try {
        const skip = (page - 1) * limit;

        const totalAppointments = await Appointment.countDocuments({ status: 'completed' });
        const appointments = await Appointment.find({ status: 'completed' }).sort({ [sortField]: sortOrder }).skip(skip).limit(limit).populate("department").lean();

        return res.status(200).json({
            error: false,
            message: "Users retrieved successfully.",
            appointments,
            currentPage: page,
            totalPages: Math.ceil(totalAppointments / limit),
            totalAppointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Server error" });
    }
});

const getSingleAppointment = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        let appointment = await Appointment.findById({ _id: id });

        return res.status(200).json({
            error: false,
            message: "Appointment get successfully!!",
            appointment
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

const updateStatusOfAppointment = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { status } = req.body;
        const { id } = req.params;

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(400).json({
                error: true,
                message: "Appointment not found.",
            });
        }

        const updatedFields = {
            status
        };

        const updateAppointment = await Appointment.findByIdAndUpdate(appointment._id, updatedFields, { new: true, });

        return res.status(201).send({
            error: false,
            message: "Updated Successfully !!",
            updateAppointment,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = { bookAppintment, updateAppointment, deleteAppointment, getAllAppointment, getPendingAppointment, getCompletedAppointment, getSingleAppointment, updateStatusOfAppointment };
