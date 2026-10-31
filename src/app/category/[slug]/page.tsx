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

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  return { title: cat ? `${cat.title} | Sewmaistic` : "Sewmaistic" };
}

export default async function CategoryRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const browse = BROWSE_SLUGS.map((s) => getCategory(s)!).map((c) => ({ slug: c.slug, title: c.title }));

  return (
    <CartProvider>
      <main className="min-h-screen bg-[#FBF9F4] text-[#4F5A5E] flex flex-col font-sans selection:bg-black selection:text-white">
        <Header />
        <CategoryPage key={cat.slug} slug={cat.slug} title={cat.title} products={getCategoryProducts(slug)} browse={browse} />
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <SearchModal />
        <FloatingChatButton />
      </main>
    </CartProvider>
  );
}
