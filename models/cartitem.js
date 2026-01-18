'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associate(models) {
            // associations
            CartItem.belongsTo(models.User, { foreignKey: 'user_id' });
            CartItem.belongsTo(models.MenuItem, { foreignKey: 'menu_item_id' });
        }
    }

    CartItem.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        menu_item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'CartItem',
        tableName: 'cart_items',
        underscored: true
    });

    return CartItem;
};