import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export const metadata = {
  title: "All Products — STORE",
  description: "Browse our complete collection of products.",
};

export default async function ProductsPage() {
  const products = await getProducts(50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-600 mt-1">{products.length} products</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
