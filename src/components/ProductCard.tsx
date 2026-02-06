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

  const discountPercent = hasDiscount
    ? Math.round((1 - parseFloat(price.amount) / parseFloat(comparePrice.amount)) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block card-hover rounded-2xl bg-white border border-sage-100 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square bg-sage-50 overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sage-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5Z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {!product.availableForSale && (
            <span className="bg-gray-900/80 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-semibold">
              Sold Out
            </span>
          )}
          {hasDiscount && product.availableForSale && (
            <span className="badge-sale text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-lg font-semibold">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="bg-white text-gray-900 px-5 py-2.5 rounded-xl text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
            View Product
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.vendor && (
          <p className="text-[10px] sm:text-xs text-rigani-600 uppercase tracking-widest font-semibold mb-1">
            {product.vendor}
          </p>
        )}
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-rigani-700 transition-colors line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-sm font-bold ${hasDiscount ? "text-red-600" : "text-gray-900"}`}>
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-sage-400 line-through">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
