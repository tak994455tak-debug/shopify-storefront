import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify";
import AddToCartButton from "@/components/AddToCartButton";
import type { Metadata } from "next";

export const revalidate = 60;
export const dynamicParams = true;

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} — STORE`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  try {
    const products = await getProducts(50);
    return products.map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AddToCartButton product={product} />
    </div>
  );
}
