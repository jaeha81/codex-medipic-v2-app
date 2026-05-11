import { notFound } from "next/navigation";
import { careProducts, getCareProduct } from "@/data/careProducts";
import { getLineConnectUrl } from "@/lib/lineLink";
import { ProductDetailClient } from "./ProductDetailClient";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return careProducts.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getCareProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} lineUrl={getLineConnectUrl()} />;
}
