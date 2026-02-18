import Image from "next/image";
import MenuItemCard from "@/app/components/MenuItemCard";

interface MenuItems {
    id: number;
    name: string;
    price: string;
    rating: string;
    subtitle: string;
    image: string;
}

interface MenuCategory {
    category: string;
    items: MenuItems[];
}

import { MenuItem } from "@/lib/db";

async function getMenuItems(): Promise<MenuCategory[]> {
    try {
        const items = await MenuItem.findAll({
            where: { is_available: true },
            order: [['category', 'ASC']]
        });

        // Group items by category
        const groupedItems = items.reduce((acc: any, item: any) => {
            const category = item.category || 'Other';
            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push({
                id: item.id,
                name: item.name,
                price: item.price.toString(),
                rating: "4.5", // Default rating
                subtitle: item.description || "",
                image: item.image_url || "/images/placeholder-food.png"
            });

            return acc;
        }, {});

        return Object.keys(groupedItems).map(category => ({
            category,
            items: groupedItems[category]
        }));
    } catch (error) {
        console.error("Error fetching menu items:", error);
        return [];
    }
}

export default async function MenuPage() {
    const menuItems = await getMenuItems();

    return (
        <div className="min-h-screen bg-[#131313] text-white pt-32 pb-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
                    <p className="text-[#9B9B9B] max-w-xl mx-auto text-sm">
                        Meticulously crafted beverages and scratch-made pastries.
                    </p>
                </div>

                {menuItems.map((category) => (
                    <div key={category.category} className="mb-12">
                        <h2 className="text-xl font-bold mb-6 text-white border-l-4 border-[#C67C4E] pl-3">
                            {category.category}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {category.items.map((item) => (
                                <MenuItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

