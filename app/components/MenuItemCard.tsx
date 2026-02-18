"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";

interface MenuItemProps {
    id: number;
    name: string;
    price: string;
    rating: string;
    subtitle: string;
    image: string;
}

export default function MenuItemCard({ item }: { item: MenuItemProps }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price),
            image: item.image,
            quantity: 1,
            subtitle: item.subtitle,
        });

        // Show temporary feedback
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-[#252525] rounded-3xl p-3 shadow-sm hover:translate-y-[-4px] transition-transform duration-300 group">
            <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-3">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
                    <span className="text-yellow-400 text-[10px] mb-[1px]">★</span>
                    <span className="text-white text-[10px] font-bold">{item.rating}</span>
                </div>
            </div>

            <div className="px-1">
                <h3 className="text-base font-bold text-white mb-1 leading-tight truncate">
                    {item.name}
                </h3>
                <p className="text-xs text-[#9B9B9B] mb-3 truncate">{item.subtitle}</p>

                <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-white">
                        <span className="text-[#C67C4E] mr-1">$</span>
                        {item.price}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${isAdded ? "bg-green-500 hover:bg-green-600" : "bg-[#C67C4E] hover:bg-[#A66238]"
                            }`}
                    >
                        {isAdded ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
