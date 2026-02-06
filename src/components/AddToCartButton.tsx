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
  const images = product.images.edges.map((e) => e.node);

  const handleAddToCart = () => {
    if (selectedVariant && selectedVariant.availableForSale) {
      addItem(selectedVariant.id);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
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
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.altText || `${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
            {product.vendor}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-medium text-gray-900">
              {formatPrice(selectedVariant.price)}
            </span>
            {selectedVariant.compareAtPrice &&
              parseFloat(selectedVariant.compareAtPrice.amount) >
                parseFloat(selectedVariant.price.amount) && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(selectedVariant.compareAtPrice)}
                </span>
              )}
          </div>
        </div>

        {/* Variant Selector */}
        {variants.length > 1 && (
          <div className="space-y-3">
            {variants[0].selectedOptions.map((option, optionIndex) => (
              <div key={option.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {option.name}
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
                          className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                            isSelected
                              ? "border-black bg-black text-white"
                              : matchingVariant?.availableForSale
                              ? "border-gray-300 hover:border-gray-500 text-gray-700"
                              : "border-gray-200 text-gray-300 cursor-not-allowed line-through"
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
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale || isLoading}
          className="w-full bg-black text-white py-4 px-6 rounded-xl font-medium text-base hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Adding..."
            : !selectedVariant?.availableForSale
            ? "Sold Out"
            : "Add to Cart"}
        </button>

        {/* Description */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
          <div
            className="prose prose-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
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
