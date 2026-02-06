import Link from "next/link";
import { getCollections } from "@/lib/shopify";

export const revalidate = 60;

export const metadata = {
  title: "Collections — STORE",
  description: "Browse our product collections.",
};

export default async function CollectionsPage() {
  const collections = await getCollections(20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-8 min-h-[200px] flex flex-col justify-end">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                {collection.title}
              </h2>
              {collection.description && (
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {collection.description}
                </p>
              )}
              <span className="text-sm font-medium text-gray-600 mt-4 group-hover:text-gray-900 transition-colors inline-flex items-center gap-1">
                Browse Collection
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {collections.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No collections found.</p>
        </div>
      )}
    </div>
  );
}
