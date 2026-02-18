"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen bg-[#131313] text-white pt-32 pb-12 px-6 flex flex-col items-center justify-center">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-8 flex justify-center">
                    <div className="h-24 w-24 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
                <p className="text-[#9B9B9B] mb-8">
                    Thank you for your order. We've received it and will start preparing your delicious food right away.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/orders"
                        className="bg-[#252525] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#333] transition-colors"
                    >
                        View My Orders
                    </Link>
                    <Link
                        href="/menu"
                        className="bg-[#C67C4E] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#A66238] transition-colors shadow-lg shadow-[#C67C4E]/20"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
