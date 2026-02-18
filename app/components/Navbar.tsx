"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

import CoffeeLogo from "./CoffeeLogo";

export default function Navbar() {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#131313]/95 backdrop-blur-md border-b border-[#2A2A2A] transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo - kept simple or hidden if Home handles header, 
                        but keeping it for other pages */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-white hover:text-[#C67C4E] transition-colors flex items-center gap-2">
                            <CoffeeLogo />
                            {/* <span className="font-serif tracking-widest text-lg">BREWHAVEN</span> */}
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/menu">Menu</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                        <NavLink href="/cart">Cart</NavLink>

                        {/* Cart/Auth Container */}
                        <div className="ml-6 flex items-center space-x-4 pl-6 border-l border-[#2A2A2A]">
                            {session ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-[#DDDDDD]">
                                        {session.user?.name || session.user?.email}
                                    </span>
                                    <button
                                        onClick={() => signOut()}
                                        className="px-5 py-2 rounded-xl bg-[#252525] text-white text-sm font-medium hover:bg-[#C67C4E] transition-colors border border-[#2A2A2A]"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-[#DDDDDD] hover:text-[#C67C4E] transition-colors font-medium text-sm"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="px-6 py-2 rounded-xl bg-[#C67C4E] text-white text-sm font-bold hover:bg-[#A66238] transition-colors shadow-lg shadow-[#C67C4E]/20"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-[#252525] focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#131313] border-b border-[#2A2A2A]">
                    <div className="px-4 pt-4 pb-6 space-y-2 sm:px-3">
                        <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
                        <MobileNavLink href="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</MobileNavLink>
                        <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
                        <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
                        <MobileNavLink href="/cart" onClick={() => setIsMobileMenuOpen(false)}>Cart</MobileNavLink>

                        <div className="pt-6 mt-4 border-t border-[#2A2A2A]">
                            {session ? (
                                <div className="flex flex-col space-y-4">
                                    <span className="text-sm font-medium text-[#DDDDDD]">
                                        Signed in as {session.user?.name || session.user?.email}
                                    </span>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left px-4 py-3 rounded-xl bg-[#252525] text-white font-medium hover:bg-[#C67C4E] transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-center px-4 py-3 rounded-xl border border-[#2A2A2A] text-white font-medium hover:bg-[#252525]"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-center px-4 py-3 rounded-xl bg-[#C67C4E] text-white font-bold hover:bg-[#A66238]"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-[#9B9B9B] hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C67C4E] transition-all duration-300 group-hover:w-full"></span>
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block px-4 py-3 rounded-xl text-base font-medium text-[#DDDDDD] hover:bg-[#252525] hover:text-[#C67C4E] transition-all"
        >
            {children}
        </Link>
    );
}
