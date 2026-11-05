import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/sites/sewdarlin/root-default/Header";
import { Footer } from "@/components/sites/sewdarlin/root-default/Footer";
import { CartDrawer } from "@/components/sites/sewdarlin/root-default/CartDrawer";
import { QuickViewModal } from "@/components/sites/sewdarlin/root-default/QuickViewModal";
import { SearchModal } from "@/components/sites/sewdarlin/root-default/SearchModal";
import { FloatingChatButton } from "@/components/sites/sewdarlin/root-default/FloatingChatButton";
import { CategoryPage } from "@/components/sites/sewdarlin/root-default/CategoryPage";
import { CATEGORIES, BROWSE_SLUGS, getCategory, getCategoryProducts } from "@/data/categories";
import { getCatalogue, getCategories } from "@/lib/catalogue";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = (await getCategories()).find((c) => c.slug === slug)?.title ?? getCategory(slug)?.title;
  return { title: title ? `${title} | Sewmaistic` : "Sewmaistic" };
}

export default async function CategoryRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [products, dynamic] = await Promise.all([getCatalogue(), getCategories()]);
  // Categories created in the admin panel win over the built-in pages with the same address.
  const dyn = dynamic.find((c) => c.slug === slug);
  const cat = getCategory(slug);
  if (!dyn && !cat) notFound();
  const title = (dyn ?? cat)!.title;
  const list = dyn ? products.filter((p) => p.category === dyn.title) : getCategoryProducts(slug, products);
  const browse = [
    ...BROWSE_SLUGS.map((s) => getCategory(s)!).map((c) => ({
      slug: c.slug,
      title: dynamic.find((d) => d.slug === c.slug)?.title ?? c.title,
    })),
    ...dynamic.filter((c) => !BROWSE_SLUGS.includes(c.slug)).map((c) => ({ slug: c.slug, title: c.title })),
  ];

  return (
    <CartProvider>
      <main className="min-h-screen bg-[#FBF9F4] text-[#4F5A5E] flex flex-col font-sans selection:bg-black selection:text-white">
        <Header />
        <CategoryPage key={slug} slug={slug} title={title} products={list} browse={browse} />
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <SearchModal />
        <FloatingChatButton />
      </main>
    </CartProvider>
  );
}
