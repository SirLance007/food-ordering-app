"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Package, ShoppingBag } from "lucide-react";

interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    MenuItem: {
        name: string;
        image_url: string;
    };
}

interface Order {
    id: number;
    status: string;
    total_amount: string;
    created_at: string;
    OrderItems: OrderItem[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                const data = await res.json();

                if (data.success) {
                    setOrders(data.orders);
                } else {
                    setError(data.error || "Failed to fetch orders");
                }
            } catch (err) {
                setError("An error occurred while fetching orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#131313] text-white pt-32 pb-12 px-6 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#C67C4E]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#131313] text-white pt-32 pb-12 px-6 text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-[#C67C4E] hover:underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-[#131313] text-white pt-32 pb-12 px-6 flex flex-col items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="h-16 w-16 text-[#9B9B9B] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
                    <p className="text-[#9B9B9B] mb-8">You haven't placed any orders yet.</p>
                    <Link href="/menu" className="bg-[#C67C4E] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#A66238] transition-colors">
                        Start Ordering
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#131313] text-white pt-32 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-[#252525] rounded-3xl p-6 border border-[#333]">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold">Order #{order.id}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                                'bg-gray-500/20 text-gray-500'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-[#9B9B9B] text-sm">
                                        {(() => {
                                            try {
                                                return format(new Date(order.created_at), "MMM d, yyyy 'at' h:mm a");
                                            } catch (e) {
                                                return "Date unavailable";
                                            }
                                        })()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-[#9B9B9B]">Total Amount</p>
                                    <p className="text-xl font-bold text-[#C67C4E]">${parseFloat(order.total_amount).toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="border-t border-[#333] pt-4">
                                <h4 className="text-sm font-medium text-[#9B9B9B] mb-3">Items</h4>
                                <div className="space-y-3">
                                    {order.OrderItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-black rounded-lg overflow-hidden relative flex-shrink-0">
                                                {item.MenuItem?.image_url ? (
                                                    <Image
                                                        src={item.MenuItem.image_url}
                                                        alt={item.MenuItem.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-gray-800">
                                                        <Package className="h-6 w-6 text-gray-600" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-white">
                                                        {item.MenuItem?.name || "Unknown Item"}
                                                        <span className="text-[#9B9B9B] ml-2">x{item.quantity}</span>
                                                    </span>
                                                    <span className="text-white">
                                                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
