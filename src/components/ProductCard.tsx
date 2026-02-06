"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/shopify";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.priceRange.minVariantPrice;
  const comparePrice = product.priceRange.maxVariantPrice;
  const hasDiscount =
    comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const image = product.featuredImage;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5Z" />
            </svg>
          </div>
        )}

        {!product.availableForSale && (
          <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md font-medium">
            Sold Out
          </div>
        )}

        {hasDiscount && product.availableForSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
            Sale
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider">{product.vendor}</p>
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
