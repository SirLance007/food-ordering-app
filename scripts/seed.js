const { Sequelize, DataTypes } = require('sequelize');
const pg = require('pg');

// Initialize Sequelize with the same configuration as lib/db.ts
const sequelize = new Sequelize(
    process.env.DB_NAME || 'food_ordering_db',
    process.env.DB_USER || 'prankursharma',
    process.env.DB_PASSWORD || 'Prankur@2005',
    {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        logging: console.log, // Log queries so we can see what's happening
        dialectModule: pg,
    }
);

// Define the model exactly as in lib/db.ts to ensure compatibility
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

const dummyData = [
    // COFFEE
    {
        name: "Cappuccino",
        price: 4.50,
        description: "Rich espresso with steamed milk foam and a dusting of cocoa.",
        category: "Coffee",
        image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80",
        is_available: true
    },
    {
        name: "Vanilla Latte",
        price: 5.00,
        description: "Smooth espresso with steamed milk and premium vanilla syrup.",
        category: "Coffee",
        image_url: "https://images.unsplash.com/photo-1570968992193-d6ea066518b3?w=500&q=80",
        is_available: true
    },
    {
        name: "Americano",
        price: 3.50,
        description: "Espresso shots topped with hot water for a light layer of crema.",
        category: "Coffee",
        image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80",
        is_available: true
    },
    {
        name: "Double Espresso",
        price: 3.00,
        description: "Two shots of our signature robust espresso blend.",
        category: "Coffee",
        image_url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80",
        is_available: true
    },

    // PASTRIES
    {
        name: "Butter Croissant",
        price: 3.50,
        description: "Classic french pastry, flaky and buttery.",
        category: "Pastry",
        image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80",
        is_available: true
    },
    {
        name: "Blueberry Muffin",
        price: 3.00,
        description: "Freshly baked muffin bursting with wild blueberries.",
        category: "Pastry",
        image_url: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&q=80",
        is_available: true
    },
    {
        name: "Chocolate Chip Cookie",
        price: 2.50,
        description: "Soft and chewy cookie with chunks of semi-sweet chocolate.",
        category: "Pastry",
        image_url: "https://images.unsplash.com/photo-1499636138143-bd630f5cf446?w=500&q=80",
        is_available: true
    },
    {
        name: "Avocado Toast",
        price: 8.50,
        description: "Sourdough toast topped with smashed avocado, chili flakes, and sesame.",
        category: "Breakfast",
        image_url: "https://images.unsplash.com/photo-1588137372308-15f75323ca8f?w=500&q=80",
        is_available: true
    }
];

async function seed() {
    try {
        // Test connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync model (ensure table exists)
        // await MenuItem.sync({ force: false }); // Don't force, we assume table exists or we want to append. 
        // Actually, to be safe, let's sync to ensure table exists.
        await MenuItem.sync();

        console.log('Seeding data...');

        for (const item of dummyData) {
            // Create if not exists (check by name)
            const [record, created] = await MenuItem.findOrCreate({
                where: { name: item.name },
                defaults: item
            });

            if (created) {
                console.log(`Created: ${item.name}`);
            } else {
                console.log(`Skipped (already exists): ${item.name}`);
            }
        }

        console.log('Seeding complete!');
    } catch (error) {
        console.error('Unable to connect to the database or seed data:', error);
    } finally {
        await sequelize.close();
    }
}

seed();
