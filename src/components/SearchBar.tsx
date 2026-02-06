"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Search Icon Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>

      {/* Search Input */}
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            autoFocus
            className="w-full px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
          />
        </form>
      )}
    </div>
  );
}
