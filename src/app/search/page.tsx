import { searchProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Search — Rigani",
  description: "Search our natural health & wellness products.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const products = query ? await searchProducts(query, 30) : [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-sage-50 via-warm-50 to-rigani-50 border-b border-sage-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-2xl">
            {query ? (
              <>
                <span className="text-sm text-sage-400 font-medium">Search results for</span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-[family-name:var(--font-playfair)] mt-1">
                  &ldquo;{query}&rdquo;
                </h1>
                <p className="text-sage-500 mt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rigani-400" />
                  {products.length} {products.length === 1 ? "product" : "products"} found
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
                  Search
                </h1>
                <p className="text-sage-500 mt-2">
                  Find the perfect product for your wellness journey
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {!query && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-sage-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <p className="text-sage-500 text-lg mb-1">Enter a search term to find products</p>
            <p className="text-sage-400 text-sm">Use the search icon in the navigation bar</p>
          </div>
        )}

        {query && products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-sage-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
            </div>
            <p className="text-gray-700 text-lg font-medium mb-1">No products found for &ldquo;{query}&rdquo;</p>
            <p className="text-sage-400 text-sm mb-6">Try a different search term or browse our catalog</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 btn-primary text-white px-6 py-3 rounded-xl text-sm font-semibold"
            >
              Browse All Products
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
