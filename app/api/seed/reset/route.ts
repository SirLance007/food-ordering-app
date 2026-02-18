import { NextResponse } from 'next/server';
import { MenuItem } from '@/lib/db';

export async function GET() {
    try {
        // EXACT items from your seeders/20240131000000-demo-menu-items.js file
        const menuItems = [
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
        ];

        let createdCount = 0;
        let updatedCount = 0;

        for (const item of menuItems) {
            const existing = await MenuItem.findOne({ where: { name: item.name } });
            if (existing) {
                await existing.update(item);
                updatedCount++;
            } else {
                await MenuItem.create(item);
                createdCount++;
            }
        }

        return NextResponse.json({
            message: 'Database updated to match your Seeder file!',
            details: `Processed ${menuItems.length} items. Created ${createdCount}, Updated ${updatedCount}.`,
            items: menuItems.map(i => i.name)
        });
    } catch (error: any) {
        console.error('Reset seed error:', error);
        return NextResponse.json({ message: 'Error updating database', error: error.message }, { status: 500 });
    }
}
