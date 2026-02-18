import { NextResponse } from 'next/server';
import { MenuItem } from '@/lib/db';

export async function GET() {
    try {
        // We use upsert logic to avoid Foreign Key errors

        const menuItems = [
            // --- COFFEE CLASSICS ---
            {
                name: "Espresso",
                price: 3.00,
                description: "A concentrated shot of rich, bold coffee with a golden crema.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80",
                is_available: true
            },
            {
                name: "Double Espresso",
                price: 4.00,
                description: "Two shots of our signature robust espresso blend for an extra kick.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80",
                is_available: true
            },
            {
                name: "Americano",
                price: 3.50,
                description: "Espresso shots topped with hot water, creating a light layer of crema.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
                is_available: true
            },
            {
                name: "Cappuccino",
                price: 4.50,
                description: "Equal parts espresso, steamed milk, and milk foam, dusted with cocoa.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80",
                is_available: true
            },
            {
                name: "Latte",
                price: 4.75,
                description: "Espresso with plenty of steamed milk and a thin layer of microfoam.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1570968992193-d6ea066518b3?w=800&q=80",
                is_available: true
            },
            {
                name: "Vanilla Latte",
                price: 5.25,
                description: "Our classic Latte infused with premium Madagascar vanilla syrup.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1570968992193-d6ea066518b3?w=800&q=80",
                is_available: true
            },
            {
                name: "Flat White",
                price: 4.50,
                description: "Smooth ristretto shots with velvety steamed milk.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=800&q=80",
                is_available: true
            },
            {
                name: "Macchiato",
                price: 3.75,
                description: "Espresso 'stained' with a dollop of milk foam.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1485808191679-5f8078074693?w=800&q=80",
                is_available: true
            },
            {
                name: "Mocha",
                price: 5.00,
                description: "Espresso meets chocolate and steamed milk, topped with whipped cream.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&q=80",
                is_available: true
            },
            {
                name: "Caramel Macchiato",
                price: 5.25,
                description: "Vanilla syrup, steamed milk, espresso, and caramel drizzle.",
                category: "Coffee",
                image_url: "https://images.unsplash.com/photo-1485808191679-5f8078074693?w=800&q=80",
                is_available: true
            },

            // --- COLD BREWS & ICED ---
            {
                name: "Cold Brew",
                price: 4.50,
                description: "Slow-steeped for 24 hours for a smooth, full-bodied flavor.",
                category: "Cold Coffee",
                image_url: "https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?w=800&q=80",
                is_available: true
            },
            {
                name: "Iced Americano",
                price: 3.75,
                description: "Espresso shots topped with cold water and ice.",
                category: "Cold Coffee",
                image_url: "https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?w=800&q=80", // Using similar cold coffee image
                is_available: true
            },
            {
                name: "Iced Latte",
                price: 4.75,
                description: "Espresso and milk poured over ice.",
                category: "Cold Coffee",
                image_url: "https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?w=800&q=80",
                is_available: true
            },
            {
                name: "Affogato",
                price: 5.50,
                description: "A scoop of vanilla gelato drowned in a shot of hot espresso.",
                category: "Dessert Coffee",
                image_url: "https://images.unsplash.com/photo-1593026330368-2a8183060714?w=800&q=80",
                is_available: true
            },

            // --- PASTRIES & FOOD ---
            {
                name: "Butter Croissant",
                price: 3.50,
                description: "Classic french pastry, flaky and buttery.",
                category: "Pastry",
                image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
                is_available: true
            },
            {
                name: "Blueberry Muffin",
                price: 3.00,
                description: "Freshly baked muffin bursting with wild blueberries.",
                category: "Pastry",
                image_url: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80",
                is_available: true
            },
            {
                name: "Chocolate Chip Cookie",
                price: 2.50,
                description: "Soft and chewy cookie with chunks of semi-sweet chocolate.",
                category: "Pastry",
                image_url: "https://images.unsplash.com/photo-1499636138143-bd630f5cf446?w=800&q=80",
                is_available: true
            },
            {
                name: "Avocado Toast",
                price: 8.50,
                description: "Sourdough toast topped with smashed avocado, chili flakes, and sesame.",
                category: "Breakfast",
                image_url: "https://images.unsplash.com/photo-1588137372308-15f75323ca8f?w=800&q=80",
                is_available: true
            }
        ];

        let createdCount = 0;
        let updatedCount = 0;

        for (const item of menuItems) {
            // Check by name AND category to handle potential duplicates cleanly, though name should be unique
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
            message: 'Database updated successfully!',
            details: `Processed ${menuItems.length} items. Created ${createdCount}, Updated ${updatedCount}.`,
            items: menuItems.map(i => i.name)
        });
    } catch (error: any) {
        console.error('Reset seed error:', error);
        return NextResponse.json({ message: 'Error updating database', error: error.message }, { status: 500 });
    }
}
