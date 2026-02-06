# Shopify Headless Storefront

A custom-designed storefront built with **Next.js 14** and powered by **Shopify Storefront API**. You get full design control while Shopify handles products, inventory, cart, checkout, and payments.

## Features

- **Custom UI**  Full design freedom with Tailwind CSS
- **Product Pages**  Listings, detail pages with image gallery, variant selector
- **Collections**  Browse products by collection
- **Cart**  Slide-out cart drawer with quantity controls
- **Checkout**  Redirects to Shopify hosted checkout (handles payments, shipping, taxes)
- **Search**  Product search via Storefront API
- **Responsive**  Mobile-first design with hamburger nav
- **ISR**  Incremental Static Regeneration for fast page loads

## Getting Started

### 1. Connect Your Shopify Store

1. Go to **Shopify Admin** > Settings > Apps and sales channels > Develop apps
2. Click **Create an app** and name it (e.g. "Custom Storefront")
3. In **Configuration**, enable **Storefront API** with these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
4. Click **Install app** and copy the **Storefront access token**

### 2. Configure Environment Variables

Edit `.env.local` in the project root:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    page.tsx                     # Home page (hero + featured products + collections)
    products/
      page.tsx                   # All products listing
      [handle]/page.tsx          # Individual product page
    collections/
      page.tsx                   # All collections listing
      [handle]/page.tsx          # Collection detail page
    search/
      page.tsx                   # Search results page
    layout.tsx                   # Root layout with Navbar, Footer, CartProvider
  components/
    Navbar.tsx                   # Navigation bar with search and cart icon
    Footer.tsx                   # Site footer
    ProductCard.tsx              # Product card for grid displays
    CartDrawer.tsx               # Slide-out cart drawer
    AddToCartButton.tsx          # Product page with image gallery + add to cart
    SearchBar.tsx                # Search input component
  context/
    CartContext.tsx               # Cart state management (React Context)
  lib/
    shopify.ts                   # Shopify Storefront API client + GraphQL queries
    types.ts                     # TypeScript types for Shopify data
```

## How Checkout Works

When a user clicks **Checkout** in the cart drawer, they are redirected to Shopify's hosted checkout page. Shopify handles:

- Payment processing
- Shipping calculations
- Tax calculations
- Order confirmation emails
- Order management

You do NOT need to handle any payment logic in this codebase.

## Deployment

This project can be deployed on:

- **Vercel** (recommended for Next.js): `npx vercel`
- **Netlify**
- Any platform supporting Node.js

Remember to set the environment variables on your hosting platform.
