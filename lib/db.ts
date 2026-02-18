// Explicitly require pg first to ensure it's available
const pg = require('pg');
const { Sequelize, DataTypes } = require('sequelize');

// Create sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'food_ordering_db',
  process.env.DB_USER || 'prankursharma',
  process.env.DB_PASSWORD || 'Prankur@2005',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
    dialectModule: pg,
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : undefined,
  }
);

// Define all models directly here
const MenuItem = sequelize.define('MenuItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
  },
  category: DataTypes.STRING,
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'menu_items',
  underscored: true
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'oauth_user' // Default for OAuth users
  }
}, {
  tableName: 'users',
  underscored: true
});

const CartItem = sequelize.define('CartItem', {
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
  tableName: 'cart_items',
  underscored: true
});

const Order = sequelize.define('Order', {
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
    defaultValue: 'pending'
  },
  delivery_address: DataTypes.TEXT,
  payment_mode: {
    type: DataTypes.STRING,
    defaultValue: 'cod',
    allowNull: false
  }
}, {
  tableName: 'orders',
  underscored: true
});

const OrderItem = sequelize.define('OrderItem', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  menu_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'order_items',
  underscored: true
});

// Define associations
MenuItem.hasMany(CartItem, { foreignKey: 'menu_item_id' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menu_item_id' });

User.hasMany(CartItem, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

CartItem.belongsTo(User, { foreignKey: 'user_id' });
CartItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });

Order.belongsTo(User, { foreignKey: 'user_id' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });

OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });

export {
  sequelize,
  MenuItem,
  User,
  CartItem,
  Order,
  OrderItem
};