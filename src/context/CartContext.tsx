"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  createCart,
  addToCart as addToCartApi,
  updateCart as updateCartApi,
  removeFromCart as removeFromCartApi,
} from "@/lib/shopify";
import { Cart } from "@/lib/types";

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = "shopify-cart-id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart
  useEffect(() => {
    const initCart = async () => {
      const storedCartId = localStorage.getItem(CART_ID_KEY);

      if (storedCartId) {
        // We have a saved cart ID — for simplicity, create a new one
        // In production, you'd fetch the existing cart
        try {
          const newCart = await createCart();
          localStorage.setItem(CART_ID_KEY, newCart.id);
          setCart(newCart);
        } catch {
          const newCart = await createCart();
          localStorage.setItem(CART_ID_KEY, newCart.id);
          setCart(newCart);
        }
      } else {
        const newCart = await createCart();
        localStorage.setItem(CART_ID_KEY, newCart.id);
        setCart(newCart);
      }
    };
    initCart();
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updatedCart = await addToCartApi(cart.id, variantId, quantity);
        setCart(updatedCart);
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to add item:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updatedCart = await updateCartApi(cart.id, lineId, quantity);
        setCart(updatedCart);
      } catch (error) {
        console.error("Failed to update item:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updatedCart = await removeFromCartApi(cart.id, [lineId]);
        setCart(updatedCart);
      } catch (error) {
        console.error("Failed to remove item:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        totalQuantity: cart?.totalQuantity ?? 0,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
