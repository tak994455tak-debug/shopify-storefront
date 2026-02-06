import Link from "next/link";
import { getProducts, getCollections } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts(8),
    getCollections(6),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              New Arrivals
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Discover our latest collection of premium products crafted with care.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Collections */}
      {collections.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-8 min-h-[160px] flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                      {collection.title}
                    </h3>
                    {collection.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                    <span className="text-sm font-medium text-gray-600 mt-3 group-hover:text-gray-900 transition-colors">
                      Browse &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
