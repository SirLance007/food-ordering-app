'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('MenuItem', [
            {
                name: 'Avocado Toast',
                price: 8.50,
                description: 'Sourdough toast topped with smashed avocado, cherry tomatoes, and microgreens.',
                image_url: '/images/avocado_toast.png',
                category: 'Food',
                is_available: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Vanilla Latte',
                price: 5.00,
                description: 'Smooth espresso with steamed milk and vanilla syrup.',
                image_url: '/images/vanilla_latte.png',
                category: 'Coffee',
                is_available: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Butter Chicken',
                price: 14.00,
                description: 'Creamy, rich Butter Chicken served with naan bread.',
                image_url: '/images/butter_chicken.png',
                category: 'Food',
                is_available: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Cappuccino',
                price: 4.50,
                description: 'Rich espresso with a thick layer of milk foam.',
                image_url: '/images/cappuccino.png',
                category: 'Coffee',
                is_available: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Blueberry Muffin',
                price: 3.50,
                description: 'Freshly baked muffin with real blueberries.',
                image_url: '/images/blueberry_muffin.png',
                category: 'Pastries',
                is_available: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Croissant',
                price: 3.00,
                description: 'Buttery, flaky, and golden brown croissant.',
                image_url: '/images/croissant.png',
                category: 'Pastries',
                is_available: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('MenuItem', null, {});
    }
};
