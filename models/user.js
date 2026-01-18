'use strict'
const {Model} = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize , DataTypes) => {
    class User extends Model{
        static associate(models){
            User.hasMany(models.CartItem, {foreignKey : 'user_id'});
            User.hasMany(models.Order , { foreignKey : 'user_id'});
        }
    }
    User.init({
        name : DataTypes.STRING,
        email : {
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        password : {
            type : DataTypes.STRNG,
            allowNull : false
        },
        phone : DataTypes.STRING
    } , {
        sequelize,
        modelName : 'User',
        tableName : 'users',
        underscored : true
    });

    return User;
}

