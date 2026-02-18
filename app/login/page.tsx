'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Invalid credentials');
            } else {
                toast.success('Welcome back');
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            toast.error('Something went wrong');
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
                    src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2671&auto=format&fit=crop"
                    alt="Coffee background"
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
                        <Lock className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-semibold text-white mb-2">Welcome Back</h1>
                    <p className="text-[#888] text-sm">Please enter your details to sign in.</p>
                </div>

                {/* Card Body */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

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
                                    placeholder="Enter your email"
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
                                    placeholder="Enter your password"
                                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-[#444] focus:outline-none focus:border-[#C67C4E] focus:ring-1 focus:ring-[#C67C4E]/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-2 cursor-pointer text-[#888] hover:text-white transition-colors">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#444] bg-[#1A1A1A] text-[#C67C4E] focus:ring-0 focus:ring-offset-0" />
                                <span>Remember for 30 days</span>
                            </label>
                            <Link href="#" className="text-[#C67C4E] hover:text-[#A66238] font-medium transition-colors">Forgot password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#C67C4E] hover:bg-[#A66238] text-white text-sm font-semibold rounded-lg shadow-lg shadow-[#C67C4E]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#333]"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#121212] px-2 text-[#666]">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="w-full py-3 bg-white text-black hover:bg-gray-100 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </button>
                    </form>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-[#161616] border-t border-[#2A2A2A] text-center">
                    <p className="text-[#888] text-xs">
                        Don't have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-[#C67C4E] hover:text-[#A66238] font-medium transition-colors"
                        >
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
