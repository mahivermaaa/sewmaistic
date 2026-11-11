import React from "react";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/sites/sewdarlin/root-default/Header";
import { HeroSection } from "@/components/sites/sewdarlin/root-default/HeroSection";
import { NewArrivals } from "@/components/sites/sewdarlin/root-default/NewArrivals";
import { ThriftStore } from "@/components/sites/sewdarlin/root-default/ThriftStore";
import { CollectionsGrid } from "@/components/sites/sewdarlin/root-default/CollectionsGrid";
import { FAQSection } from "@/components/sites/sewdarlin/root-default/FAQSection";
import { Testimonials } from "@/components/sites/sewdarlin/root-default/Testimonials";
import { NewsletterSection } from "@/components/sites/sewdarlin/root-default/NewsletterSection";
import { Footer } from "@/components/sites/sewdarlin/root-default/Footer";
import { CartDrawer } from "@/components/sites/sewdarlin/root-default/CartDrawer";
import { QuickViewModal } from "@/components/sites/sewdarlin/root-default/QuickViewModal";
import { SearchModal } from "@/components/sites/sewdarlin/root-default/SearchModal";
import { DiscountPopup } from "@/components/sites/sewdarlin/root-default/DiscountPopup";
import { getCategories, getReviews } from "@/lib/catalogue";

export default async function HomePage() {
  const [categories, reviews] = await Promise.all([getCategories(), getReviews()]);
  return (
    <CartProvider>
      <main className="min-h-screen bg-[#FBF9F4] text-[#4F5A5E] flex flex-col font-sans selection:bg-black selection:text-white">
        {/* Brand Header with Navigation and Search/Cart Triggers */}
        <Header />

        {/* Hero Section with Polaroid Gallery & Shop The Collection CTA */}
        <HeroSection />

        {/* New Arrivals Product Carousel */}
        <NewArrivals />

        {/* Thrift Store Section */}
        <ThriftStore />

        {/* Shop By Collection Grid */}
        <CollectionsGrid categories={categories} />

        {/* FAQ / Common Questions */}
        <FAQSection />

        {/* Testimonials and Customer Praise */}
        <Testimonials reviews={reviews} />

        {/* Newsletter & Social Community ("Find Us Online") */}
        <NewsletterSection />

        {/* Slate Grey Footer */}
        <Footer />

        {/* Interactive Modals and Flyouts */}
        <CartDrawer />
        <QuickViewModal />
        <SearchModal />
        <DiscountPopup />
      </main>
    </CartProvider>
  );
}
