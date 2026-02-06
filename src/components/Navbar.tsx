"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { totalQuantity, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors">
              STORE
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Shop
              </Link>
              <Link href="/collections" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Collections
              </Link>
            </div>

            {/* Search + Cart */}
            <div className="flex items-center space-x-4">
              <SearchBar />

              <button
                onClick={openCart}
                className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Open cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Home
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Shop
              </Link>
              <Link href="/collections" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Collections
              </Link>
            </div>
          )}
        </div>
      </nav>
      <CartDrawer />
    </>
  );
}
