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
      {/* ===== HERO SECTION ===== */}
      <section className="relative hero-gradient text-white overflow-hidden">
        {/* Organic decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-rigani-400/10 rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-rigani-400 animate-pulse" />
              100% Natural Ingredients
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up font-[family-name:var(--font-playfair)]">
              Nourish Your Body,{" "}
              <span className="text-rigani-300">Elevate</span> Your Life
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed animate-fade-in-up stagger-1">
              Discover premium health products made from the purest natural ingredients. Your wellness journey starts here.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-rigani-800 px-8 py-4 rounded-xl font-semibold hover:bg-rigani-50 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Shop Collection
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES BAR ===== */}
      <section className="border-b border-sage-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "🌿", title: "100% Natural", desc: "Pure ingredients only" },
              { icon: "🔬", title: "Lab Tested", desc: "Quality guaranteed" },
              { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
              { icon: "💯", title: "30-Day Guarantee", desc: "Full refund policy" },
            ].map((badge) => (
              <div key={badge.title} className="flex items-center gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl">{badge.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{badge.title}</p>
                  <p className="text-xs text-sage-500">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <span className="text-rigani-600 text-sm font-semibold tracking-widest uppercase">Our Products</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 font-[family-name:var(--font-playfair)]">
              Best Sellers
            </h2>
            <p className="text-sage-500 mt-3 max-w-md mx-auto">
              Trusted by thousands for their daily wellness routine
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="btn-secondary inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-sm"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* ===== WHY RIGANI SECTION ===== */}
      <section className="bg-sage-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rigani-100/30 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <span className="text-rigani-600 text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 font-[family-name:var(--font-playfair)]">
              The Rigani Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                ),
                title: "Pure Ingredients",
                desc: "Every product is made from carefully selected natural ingredients, free from harmful chemicals and artificial additives.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                ),
                title: "Scientifically Formulated",
                desc: "Backed by research and developed in partnership with health experts to deliver real, measurable results.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                ),
                title: "Made with Love",
                desc: "Small-batch production ensures every product meets our exacting quality standards. Your health is our passion.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 text-center card-hover border border-sage-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-rigani-50 text-rigani-600 flex items-center justify-center mx-auto mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-sage-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COLLECTIONS ===== */}
      {collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <span className="text-rigani-600 text-sm font-semibold tracking-widest uppercase">Browse</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 font-[family-name:var(--font-playfair)]">
              Shop by Collection
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group relative bg-sage-50 rounded-2xl overflow-hidden card-hover border border-sage-100"
              >
                <div className="p-8 min-h-[200px] flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-xl bg-rigani-100 text-rigani-700 flex items-center justify-center mb-6 group-hover:bg-rigani-600 group-hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-1.243 1.007-2.25 2.25-2.25h13.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-rigani-700 transition-colors font-[family-name:var(--font-playfair)]">
                      {collection.title}
                    </h3>
                    {collection.description && (
                      <p className="text-sm text-sage-500 mt-2 line-clamp-2 leading-relaxed">
                        {collection.description}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-rigani-600 mt-4 group-hover:gap-3 transition-all duration-300">
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-rigani-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-rigani-700/50 rounded-full -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-rigani-700/50 rounded-full translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <span className="text-rigani-300 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-[family-name:var(--font-playfair)]">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                text: "Rigani products have completely transformed my daily routine. I feel more energized and healthy than ever before!",
                rating: 5,
              },
              {
                name: "James K.",
                text: "The quality is unmatched. You can tell these products are made with genuine care and the best natural ingredients.",
                rating: 5,
              },
              {
                name: "Emily R.",
                text: "Fast shipping, beautiful packaging, and incredible products. Rigani is now my go-to for all things health & wellness.",
                rating: 5,
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rigani-600 flex items-center justify-center font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-white/60">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-sage-50 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden border border-sage-100">
          <div className="absolute top-0 left-0 w-48 h-48 bg-rigani-100/40 rounded-full -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rigani-100/40 rounded-full translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <span className="text-4xl mb-4 block">🌱</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-[family-name:var(--font-playfair)]">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-sage-500 mt-4 max-w-md mx-auto leading-relaxed">
              Join thousands who trust Rigani for their daily health and wellness needs.
            </p>
            <Link
              href="/products"
              className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-xl text-white font-semibold mt-8"
            >
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
