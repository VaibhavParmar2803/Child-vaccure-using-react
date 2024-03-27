module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        user_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT
        },
        user_name: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        user_status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            defaultValue: '1', 
            comment: '0-inactive 1-active'
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            defaultValue: 'Active'
        }
    },{
        freezeTableName: true,
    });
 
    return User;
 
}