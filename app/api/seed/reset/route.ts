import { NextResponse } from 'next/server';
import { MenuItem } from '@/lib/db';

export async function GET() {
    try {
        // 1. Delete all existing items
        await MenuItem.destroy({ where: {}, truncate: true });

        // 2. Re-seed with correct items
        await MenuItem.bulkCreate([
            {
                name: 'Avocado Toast',
                price: 8.50,
                description: 'Sourdough toast topped with smashed avocado, cherry tomatoes, and microgreens.',
                image_url: '/images/avocado_toast.png',
                category: 'Food',
                is_available: true
            },
            {
                name: 'Vanilla Latte',
                price: 5.00,
                description: 'Smooth espresso with steamed milk and vanilla syrup.',
                image_url: '/images/vanilla_latte.png',
                category: 'Coffee',
                is_available: true
            },
            {
                name: 'Butter Chicken',
                price: 14.00,
                description: 'Creamy, rich Butter Chicken served with naan bread.',
                image_url: '/images/butter_chicken.png',
                category: 'Food',
                is_available: true
            },
            {
                name: 'Cappuccino',
                price: 4.50,
                description: 'Rich espresso with a thick layer of milk foam.',
                image_url: '/images/cappuccino.png',
                category: 'Coffee',
                is_available: true
            },
            {
                name: 'Blueberry Muffin',
                price: 3.50,
                description: 'Freshly baked muffin with real blueberries.',
                image_url: '/images/blueberry_muffin.png',
                category: 'Pastries',
                is_available: true
            },
            {
                name: 'Croissant',
                price: 3.00,
                description: 'Buttery, flaky, and golden brown croissant.',
                image_url: '/images/croissant.png',
                category: 'Pastries',
                is_available: true
            }
        ]);

        return NextResponse.json({ message: 'Database RESET and re-seeded successfully with correct items!' });
    } catch (error: any) {
        console.error('Reset seed error:', error);
        return NextResponse.json({ message: 'Error resetting database', error: error.message }, { status: 500 });
    }
}
