import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "./components/SessionProvider";
import Navbar from "./components/Navbar";
import { CartProvider } from "../context/CartContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrewHaven | Artisanal Coffee Shop",
  description: "Experience the best coffee in town at BrewHaven.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="noise-overlay"></div>
        <AuthSessionProvider>
          <CartProvider>
            <Navbar />
            <div className=""> 
              {children}
            </div>
          </CartProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                zIndex: 9999,
              },
            }}
          />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
