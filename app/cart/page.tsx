"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    subtitle: string;
}

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const { push } = useRouter();

    // Delivery fee could be dynamic later
    const deliveryFee = cartItems.length > 0 ? 2.5 : 0;
    const total = cartTotal + deliveryFee;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#131313] text-white pt-32 pb-12 px-6 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                    <p className="text-[#9B9B9B] mb-8">Looks like you haven't added anything yet.</p>
                    <Link href="/menu" className="bg-[#C67C4E] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#A66238] transition-colors shadow-lg">
                        Go to Menu
                    </Link>
                </div>
            </div>
        );
    }

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    delivery_address: "123 Main St, New York, NY 10001", // Placeholder for now
                    cartItems: cartItems // Send local cart items
                }),
            });

            const data = await res.json();

            if (data.success) {
                clearCart();
                toast.success("Order placed successfully!");
                push("/order-confirmation");
            } else {
                toast.error(data.error || "Failed to place order");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#131313] text-white pt-32 pb-12 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-[#252525] rounded-3xl p-4 flex gap-4 items-center shadow-sm group hover:bg-[#2a2a2a] transition-colors"
                            >
                                {/* Image */}
                                <div className="relative h-24 w-24 flex-shrink-0 rounded-2xl overflow-hidden bg-black">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-lg font-bold text-white truncate pr-4">
                                            {item.name}
                                        </h3>
                                        <span className="text-[#C67C4E] font-bold text-lg">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#9B9B9B] mb-4 truncate max-w-[200px] sm:max-w-xs">
                                        {item.subtitle}
                                    </p>

                                    {/* Controls */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-[#131313] rounded-xl px-3 py-1 gap-4 border border-[#333]">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="text-[#9B9B9B] hover:text-white transition-colors text-lg font-medium"
                                            >
                                                −
                                            </button>
                                            <span className="text-white font-bold text-sm min-w-[20px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="text-[#C67C4E] hover:text-[#d48b5e] transition-colors text-lg font-medium"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-xs text-[#9B9B9B] underline hover:text-red-400 transition-colors ml-auto"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Back to Menu Link */}
                        <div className="mt-6">
                            <Link href="/menu" className="text-[#C67C4E] hover:text-[#A66238] flex items-center gap-2 text-sm font-medium transition-colors">
                                ← Back to Menu
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#252525] rounded-3xl p-6 sticky top-32">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-[#9B9B9B] text-sm">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">
                                        ${cartTotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[#9B9B9B] text-sm">
                                    <span>Delivery Fee</span>
                                    <span className="text-white font-medium">
                                        ${deliveryFee.toFixed(2)}
                                    </span>
                                </div>
                                <div className="h-[1px] bg-[#333] my-4"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-white">Total</span>
                                    <span className="text-2xl font-bold text-[#C67C4E]">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full bg-[#C67C4E] text-white font-bold py-4 rounded-xl hover:bg-[#A66238] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#C67C4E]/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {isCheckingOut ? (
                                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                                ) : null}
                                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
