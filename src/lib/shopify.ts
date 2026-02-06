// ============================================
// Shopify Storefront API Client
// ============================================

import {
  Cart,
  Collection,
  Product,
  ShopifyResponse,
} from "./types";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const endpoint = `https://${domain}/api/2026-01/graphql.json`;

function isConfigured(): boolean {
  return !!(domain && domain !== "your-store.myshopify.com");
}

// ---- Core Fetch ----

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!isConfigured()) {
    throw new Error(
      "Shopify Storefront API is not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN in .env.local"
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (storefrontAccessToken && storefrontAccessToken !== "your-storefront-access-token") {
    headers["X-Shopify-Storefront-Access-Token"] = storefrontAccessToken;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Shopify API error:", response.status, text);
    throw new Error(`Shopify API returned ${response.status}: ${text}`);
  }

  const body: ShopifyResponse<T> = await response.json();

  if (body.errors) {
    console.error("Shopify GraphQL errors:", JSON.stringify(body.errors, null, 2));
    throw new Error(body.errors.map((e) => e.message).join("\n"));
  }

  return body.data;
}

// ============================================
// GraphQL Fragments
// ============================================

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions { name value }
              product {
                handle
                title
                featuredImage {
                  url
                  altText
                  width
                  height
                }
                priceRange {
                  minVariantPrice { amount currencyCode }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  }
`;

// ============================================
// Product Queries
// ============================================

export async function getProducts(first: number = 20): Promise<Product[]> {
  if (!isConfigured()) return [];

  try {
    const query = `
      ${PRODUCT_FRAGMENT}
      query GetProducts($first: Int!) {
        products(first: $first, sortKey: BEST_SELLING) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    `;
    const data = await shopifyFetch<{ products: { edges: { node: Product }[] } }>(
      query,
      { first }
    );
    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isConfigured()) return null;

  try {
    const query = `
      ${PRODUCT_FRAGMENT}
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          ...ProductFields
        }
      }
    `;
    const data = await shopifyFetch<{ product: Product | null }>(query, {
      handle,
    });
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function searchProducts(searchQuery: string, first: number = 20): Promise<Product[]> {
  if (!isConfigured()) return [];

  try {
    const query = `
      ${PRODUCT_FRAGMENT}
      query SearchProducts($query: String!, $first: Int!) {
        search(query: $query, first: $first, types: PRODUCT) {
          edges {
            node {
              ... on Product {
                ...ProductFields
              }
            }
          }
        }
      }
    `;
    const data = await shopifyFetch<{
      search: { edges: { node: Product }[] };
    }>(query, { query: searchQuery, first });
    return data.search.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Failed to search products:", error);
    return [];
  }
}

// ============================================
// Collection Queries
// ============================================

export async function getCollections(first: number = 20): Promise<Collection[]> {
  if (!isConfigured()) return [];

  try {
    const query = `
      query GetCollections($first: Int!) {
        collections(first: $first) {
          edges {
            node {
              id
              handle
              title
              description
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    `;
    const data = await shopifyFetch<{
      collections: { edges: { node: Collection }[] };
    }>(query, { first });
    return data.collections.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Failed to fetch collections:", error);
    return [];
  }
}

export async function getCollection(handle: string): Promise<Collection | null> {
  if (!isConfigured()) return null;

  try {
    const query = `
      ${PRODUCT_FRAGMENT}
      query GetCollection($handle: String!) {
        collection(handle: $handle) {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
          products(first: 50) {
            edges {
              node {
                ...ProductFields
              }
            }
          }
        }
      }
    `;
    const data = await shopifyFetch<{ collection: Collection | null }>(query, {
      handle,
    });
    return data.collection;
  } catch (error) {
    console.error("Failed to fetch collection:", error);
    return null;
  }
}

// ============================================
// Cart Mutations
// ============================================

export async function createCart(): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFields
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(query);
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return data.cartLinesAdd.cart;
}

export async function updateCart(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }
  `;
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(query, {
    cartId,
    lineIds,
  });
  return data.cartLinesRemove.cart;
}

// ============================================
// Utility Functions
// ============================================

export function formatPrice(price: { amount: string; currencyCode: string }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));
}
