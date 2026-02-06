"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";
import { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart();
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const images = product.images.edges.map((e) => e.node);

  const handleAddToCart = async () => {
    if (selectedVariant && selectedVariant.availableForSale) {
      await addItem(selectedVariant.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const hasDiscount =
    selectedVariant.compareAtPrice &&
    parseFloat(selectedVariant.compareAtPrice.amount) >
      parseFloat(selectedVariant.price.amount);

  const discountPercent = hasDiscount
    ? Math.round(
        (1 -
          parseFloat(selectedVariant.price.amount) /
            parseFloat(selectedVariant.compareAtPrice!.amount)) *
          100
      )
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-sage-50 rounded-2xl overflow-hidden border border-sage-100">
          {images[selectedImageIndex] && (
            <Image
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].altText || product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          )}
          {hasDiscount && (
            <span className="absolute top-4 left-4 badge-sale text-white text-xs px-3 py-1.5 rounded-lg font-bold">
              -{discountPercent}% OFF
            </span>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-18 h-18 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImageIndex === index
                    ? "border-rigani-600 ring-2 ring-rigani-200"
                    : "border-sage-200 hover:border-sage-400"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.altText || `${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6 lg:py-4">
        {/* Breadcrumb-like vendor */}
        {product.vendor && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rigani-50 text-rigani-700 text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-rigani-500" />
            {product.vendor}
          </span>
        )}

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight font-[family-name:var(--font-playfair)]">
            {product.title}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <span className={`text-2xl sm:text-3xl font-bold ${hasDiscount ? "text-red-600" : "text-gray-900"}`}>
              {formatPrice(selectedVariant.price)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-sage-400 line-through">
                  {formatPrice(selectedVariant.compareAtPrice!)}
                </span>
                <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg">
                  SAVE {discountPercent}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Variant Selector */}
        {variants.length > 1 && (
          <div className="space-y-4 pt-2">
            {variants[0].selectedOptions.map((option, optionIndex) => (
              <div key={option.name}>
                <label className="block text-sm font-semibold text-gray-900 mb-2.5">
                  {option.name}: <span className="font-normal text-sage-500">{selectedVariant.selectedOptions[optionIndex]?.value}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(variants.map((v) => v.selectedOptions[optionIndex]?.value))].map(
                    (value) => {
                      const matchingVariant = variants.find((v) =>
                        v.selectedOptions.every(
                          (o, i) =>
                            i === optionIndex
                              ? o.value === value
                              : o.value === selectedVariant.selectedOptions[i]?.value
                        )
                      );
                      const isSelected = selectedVariant.selectedOptions[optionIndex]?.value === value;
                      return (
                        <button
                          key={value}
                          onClick={() => matchingVariant && setSelectedVariant(matchingVariant)}
                          disabled={!matchingVariant?.availableForSale}
                          className={`px-5 py-2.5 text-sm rounded-xl border-2 transition-all duration-200 font-medium ${
                            isSelected
                              ? "border-rigani-600 bg-rigani-50 text-rigani-700"
                              : matchingVariant?.availableForSale
                              ? "border-sage-200 hover:border-sage-400 text-gray-700 bg-white"
                              : "border-sage-100 text-sage-300 cursor-not-allowed bg-sage-50 line-through"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add to Cart */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale || isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? "bg-rigani-600 text-white"
                : !selectedVariant?.availableForSale
                ? "bg-sage-100 text-sage-400 cursor-not-allowed"
                : "btn-primary text-white"
            }`}
          >
            {added ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Added to Cart!
              </>
            ) : isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding...
              </>
            ) : !selectedVariant?.availableForSale ? (
              "Sold Out"
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Add to Cart — {formatPrice(selectedVariant.price)}
              </>
            )}
          </button>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[
            { icon: "🌿", text: "Natural" },
            { icon: "🔬", text: "Lab Tested" },
            { icon: "🚚", text: "Free Ship $50+" },
          ].map((badge) => (
            <div key={badge.text} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-sage-50 border border-sage-100">
              <span className="text-lg">{badge.icon}</span>
              <span className="text-[10px] sm:text-xs text-sage-600 font-medium text-center">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="border-t border-sage-100 pt-6">
          <details className="group" open>
            <summary className="flex items-center justify-between cursor-pointer py-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Description</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-sage-400 group-open:rotate-180 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div
              className="prose-rigani text-sm mt-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </details>
        </div>

        {/* Shipping info */}
        <div className="border-t border-sage-100 pt-6">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer py-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Shipping & Returns</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-sage-400 group-open:rotate-180 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div className="text-sm text-sage-500 mt-3 leading-relaxed space-y-2">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ Standard delivery: 3-7 business days</p>
              <p>✓ 30-day money-back guarantee</p>
              <p>✓ Easy returns & exchanges</p>
            </div>
          </details>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-sage-50 text-sage-600 text-xs rounded-full border border-sage-100 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
