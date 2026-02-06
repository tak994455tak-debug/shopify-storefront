# Shopify Headless Storefront

## Project Overview
A custom Next.js headless storefront powered by Shopify's Storefront API. Full design control with all commerce (products, cart, checkout, payments) handled by Shopify.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Commerce Backend**: Shopify Storefront API (GraphQL)
- **Checkout**: Shopify Hosted Checkout

## Architecture
- `src/lib/shopify.ts` — Storefront API client and GraphQL queries
- `src/lib/types.ts` — TypeScript types for Shopify data
- `src/context/CartContext.tsx` — React context for cart state management
- `src/components/` — Reusable UI components
- `src/app/` — Next.js App Router pages

## Environment Variables
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` — Your Shopify store domain
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` — Storefront API access token

## Key Patterns
- All Shopify data fetching goes through `src/lib/shopify.ts`
- Cart state is managed via React Context + Shopify Cart API
- Checkout redirects to Shopify's hosted checkout page
- Product images use next/image with Shopify CDN domain
- Pages use ISR with 60-second revalidation
