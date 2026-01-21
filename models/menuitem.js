'use strict'
const {Model} = require('sequelize');
const {sequelize} = require('.');
const { truncateSync } = require('fs');

module.exports = (sequelize , DataTypes) => {
    class MenuItem extends Model{
        static associate(models){
            MenuItem.hasMany(models.CartItem , {foreignKey : 'menu_item_id'});
            MenuItem.hasMany(models.OrderItem , {foreignKey : 'menu_item_id'});
        }
    }

    MenuItem.init({
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        price : {
            type : DataTypes.DECIMAL(10 , 2),
            allowNull : false
        },
        description : {
            type : DataTypes.STRING,
            allowNull : false
        },
        image_url : {
            type : DataTypes.STRING,
        },
        category : DataTypes.STRING,
        is_available : {
            type : DataTypes.BOOLEAN,
            defaultValue : true
        }
    }, {
        sequelize,
        modelName : 'MenuItem',
        tableName : 'MenuItem',
        underscored : true
    });

    return MenuItem;
}