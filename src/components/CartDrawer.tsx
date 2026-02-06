"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";
import Image from "next/image";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } =
    useCart();

  const cartItems = cart?.lines.edges.map((edge) => edge.node) ?? [];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
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
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Cart ({cart?.totalQuantity ?? 0})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mt-1">Add items to get started</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4 py-3 border-b border-gray-100">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      {item.merchandise.product.featuredImage && (
                        <Image
                          src={item.merchandise.product.featuredImage.url}
                          alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.merchandise.product.title}
                      </h3>
                      {item.merchandise.title !== "Default Title" && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.merchandise.title}</p>
                      )}
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {formatPrice(item.cost.totalAmount)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(item.id);
                            } else {
                              updateItem(item.id, item.quantity - 1);
                            }
                          }}
                          disabled={isLoading}
                          className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                          className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
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
            <div className="border-t px-6 py-4 space-y-3">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <span>Subtotal</span>
                <span>{cart ? formatPrice(cart.cost.subtotalAmount) : "—"}</span>
              </div>
              <p className="text-xs text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <a
                href={cart?.checkoutUrl}
                className="block w-full bg-black text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Checkout
              </a>
              <button
                onClick={closeCart}
                className="block w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
