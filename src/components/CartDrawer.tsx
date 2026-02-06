"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } =
    useCart();

  const cartItems = cart?.lines.edges.map((edge) => edge.node) ?? [];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-sage-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rigani-50 text-rigani-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Your Cart</h2>
                <p className="text-xs text-sage-500">{cart?.totalQuantity ?? 0} items</p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-sage-400 hover:text-gray-700 rounded-lg hover:bg-sage-50 transition-colors"
              aria-label="Close cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free shipping progress */}
          {cartItems.length > 0 && cart && (
            <div className="px-6 py-3 bg-rigani-50 border-b border-rigani-100">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-rigani-600 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <p className="text-xs font-medium text-rigani-700">
                  {parseFloat(cart.cost.subtotalAmount.amount) >= 50
                    ? "🎉 You qualify for free shipping!"
                    : `Add $${(50 - parseFloat(cart.cost.subtotalAmount.amount)).toFixed(2)} more for free shipping`}
                </p>
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-sage-50 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-sage-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-900">Your cart is empty</p>
                <p className="text-sm text-sage-500 mt-1 mb-6">Discover our wellness products</p>
                <button
                  onClick={closeCart}
                  className="btn-primary px-6 py-2.5 rounded-xl text-white text-sm font-medium"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4 p-3 rounded-xl bg-sage-50/50 border border-sage-100">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.merchandise.product.handle}`}
                      onClick={closeCart}
                      className="relative w-20 h-20 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-sage-100"
                    >
                      {item.merchandise.product.featuredImage && (
                        <Image
                          src={item.merchandise.product.featuredImage.url}
                          alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {item.merchandise.product.title}
                      </h3>
                      {item.merchandise.title !== "Default Title" && (
                        <p className="text-xs text-sage-500 mt-0.5">{item.merchandise.title}</p>
                      )}
                      <p className="text-sm font-bold text-rigani-700 mt-1">
                        {formatPrice(item.cost.totalAmount)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-sage-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => {
                              if (item.quantity === 1) removeItem(item.id);
                              else updateItem(item.id, item.quantity - 1);
                            }}
                            disabled={isLoading}
                            className="w-7 h-7 flex items-center justify-center text-sage-600 hover:bg-sage-50 disabled:opacity-50 text-sm"
                          >
                            −
                          </button>
                          <span className="w-8 h-7 flex items-center justify-center text-xs font-semibold bg-white border-x border-sage-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="w-7 h-7 flex items-center justify-center text-sage-600 hover:bg-sage-50 disabled:opacity-50 text-sm"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                          className="ml-auto p-1.5 text-sage-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-sage-100 px-6 py-5 space-y-4 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-sm text-sage-600">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">
                  {cart ? formatPrice(cart.cost.subtotalAmount) : "—"}
                </span>
              </div>
              <p className="text-xs text-sage-400">
                Shipping and taxes calculated at checkout.
              </p>
              <a
                href={cart?.checkoutUrl}
                className="btn-primary flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl text-white font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                Secure Checkout
              </a>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm font-medium text-sage-500 hover:text-rigani-600 transition-colors py-1"
              >
                ← Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
