import { NextResponse } from 'next/server';
import { MenuItem } from '@/lib/db';

export async function GET() {
    try {
        const count = await MenuItem.count();
        if (count > 0) {
            return NextResponse.json({ message: 'Database already seeded' });
        }

        await MenuItem.bulkCreate([
            {
                name: 'Butter Chicken',
                price: 350,
                description: 'Creamy tomato curry with tender chicken pieces',
                image_url: '/images/butter_chicken.png',
                category: 'Main Course',
                is_available: true
            },
            {
                name: 'Paneer Tikka',
                price: 280,
                description: 'Grilled cottage cheese cubes with spices',
                image_url: '/images/paneer_tikka.png', // You might need to update this if you don't have the image
                category: 'Starters',
                is_available: true
            },
            {
                name: 'Naan',
                price: 40,
                description: 'Traditional Indian bread',
                image_url: '/images/naan.png',
                category: 'Breads',
                is_available: true
            },
            {
                name: 'Gulab Jamun',
                price: 120,
                description: 'Sweet milk dumplings dipped in syrup',
                image_url: '/images/gulab_jamun.png',
                category: 'Desserts',
                is_available: true
            }
        ]);

        return NextResponse.json({ message: 'Menu items seeded successfully' });
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json({ message: 'Error seeding database', error: error.message }, { status: 500 });
    }
}
