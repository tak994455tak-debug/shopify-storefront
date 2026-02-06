import { notFound } from "next/navigation";
import { getCollection, getCollections } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const revalidate = 60;
export const dynamicParams = true;

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: `${collection.title} — STORE`,
    description: collection.description,
  };
}

export async function generateStaticParams() {
  try {
    const collections = await getCollections(20);
    return collections.map((c) => ({ handle: c.handle }));
  } catch {
    return [];
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) {
    notFound();
  }

  const products = collection.products.edges.map((e) => e.node);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{collection.title}</h1>
        {collection.description && (
          <p className="text-gray-600 mt-2 max-w-2xl">{collection.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">{products.length} products</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No products in this collection yet.</p>
        </div>
      )}
    </div>
  );
}
