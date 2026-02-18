import { NextResponse } from 'next/server';
import { MenuItem } from '@/lib/db';

export async function GET() {
    try {
        // 1. Delete all existing items
        await MenuItem.destroy({ where: {}, truncate: true });

        // 2. Re-seed with correct items (from scripts/seed.js)
        await MenuItem.bulkCreate([
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
        ]);

        return NextResponse.json({ message: 'Database RESET and re-seeded successfully with COMPLETE items!' });
    } catch (error: any) {
        console.error('Reset seed error:', error);
        return NextResponse.json({ message: 'Error resetting database', error: error.message }, { status: 500 });
    }
}
