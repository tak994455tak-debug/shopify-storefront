import Link from "next/link";
import { getCollections } from "@/lib/shopify";

export const revalidate = 60;

export const metadata = {
  title: "Collections — Rigani",
  description: "Browse our curated health & wellness collections.",
};

export default async function CollectionsPage() {
  const collections = await getCollections(20);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-sage-50 via-rigani-50 to-warm-50 border-b border-sage-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-rigani-700 text-xs font-semibold tracking-wide uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rigani-500" />
              Browse
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
              Our Collections
            </h1>
            <p className="text-sage-500 mt-3 text-base sm:text-lg">
              Explore our thoughtfully curated product categories
            </p>
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, i) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group relative bg-white border border-sage-100 rounded-2xl overflow-hidden card-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rigani-50/50 to-sage-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8 sm:p-10 min-h-[220px] flex flex-col justify-end">
                <div className="absolute top-6 right-6">
                  <div className="w-10 h-10 rounded-full bg-rigani-50 border border-rigani-100 flex items-center justify-center group-hover:bg-rigani-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-rigani-600 group-hover:translate-x-0.5 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs font-semibold text-rigani-600 uppercase tracking-wider mb-2">
                  Collection {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-[family-name:var(--font-playfair)] group-hover:text-rigani-700 transition-colors">
                  {collection.title}
                </h2>
                {collection.description && (
                  <p className="text-sm text-sage-500 mt-2 line-clamp-2 leading-relaxed">
                    {collection.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {collections.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-sage-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-1.036.7-1.908 1.654-2.17" />
              </svg>
            </div>
            <p className="text-sage-500 text-lg">No collections available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
