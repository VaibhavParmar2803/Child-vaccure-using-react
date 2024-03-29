const moment = require('moment')
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

const comparePassword = async (password, hashPassword) => {
    try {
        return bcrypt.compare(password, hashPassword);
    } catch (error) {
        console.log(error);
    }
};

const formattedDate = (date) => {
    return moment(date).format('DD-MM-YYYY')
}

module.exports = { hashPassword, comparePassword, formattedDate }