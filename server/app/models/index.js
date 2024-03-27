"use strict";
 
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

const sequelize = new Sequelize("child_vaccure", "root", "", {
    host: "127.0.0.1",
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
    },
    timezone: '+05:30'
});

var db = {};

// Load models dynamically
fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Apply associations
Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
