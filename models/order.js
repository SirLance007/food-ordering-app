'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // associations
            Order.belongsTo(models.User, { foreignKey: 'user_id' });
            Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
        }
    }

    Order.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        },
        payment_mode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payment_status: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        transaction_id: DataTypes.STRING,
        delivery_address: DataTypes.TEXT,
        phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        underscored: true
    });

    return Order;
};