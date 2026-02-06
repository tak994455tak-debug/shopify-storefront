import { searchProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "Search — STORE",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const products = query ? await searchProducts(query, 30) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {query ? `Results for "${query}"` : "Search"}
        </h1>
        {query && (
          <p className="text-gray-600 mt-1">{products.length} products found</p>
        )}
      </div>

      {!query && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Enter a search term to find products.</p>
        </div>
      )}

      {query && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">No products found for &quot;{query}&quot;</p>
          <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-gray-900 underline">
            Browse all products
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
  );
}
