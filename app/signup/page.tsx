'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            toast.success('Account created successfully!');
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        // z-[100] ensures it sits above the navbar
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] text-[#f0f0f0]">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/70 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2574&auto=format&fit=crop"
                    alt="Cafe Interior"
                    className="w-full h-full object-cover blur-sm scale-105"
                />
            </div>

            {/* Professional Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-20 w-full max-w-[400px] mx-4 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Card Header */}
                <div className="px-8 pt-10 pb-2 text-center">
                    <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-6 text-[#C67C4E]">
                        <User className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-semibold text-white mb-2">Create Account</h1>
                    <p className="text-[#888] text-sm">Join us for the best coffee experience.</p>
                </div>

                {/* Card Body */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[#C67C4E] uppercase tracking-wider ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] group-focus-within:text-white transition-colors" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#C67C4E] focus:ring-1 focus:ring-[#C67C4E]/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[#C67C4E] uppercase tracking-wider ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] group-focus-within:text-white transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#C67C4E] focus:ring-1 focus:ring-[#C67C4E]/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[#C67C4E] uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] group-focus-within:text-white transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#C67C4E] focus:ring-1 focus:ring-[#C67C4E]/50 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#C67C4E] hover:bg-[#A66238] text-white text-sm font-semibold rounded-lg shadow-lg shadow-[#C67C4E]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-[#161616] border-t border-[#2A2A2A] text-center">
                    <p className="text-[#888] text-xs">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-[#C67C4E] hover:text-[#A66238] font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
