import React from "react";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/sites/sewdarlin/root-default/AnnouncementBar";
import { Header } from "@/components/sites/sewdarlin/root-default/Header";
import { HeroSection } from "@/components/sites/sewdarlin/root-default/HeroSection";
import { NewArrivals } from "@/components/sites/sewdarlin/root-default/NewArrivals";
import { FanFavourites } from "@/components/sites/sewdarlin/root-default/FanFavourites";
import { CollectionsGrid } from "@/components/sites/sewdarlin/root-default/CollectionsGrid";
import { Testimonials } from "@/components/sites/sewdarlin/root-default/Testimonials";
import { NewsletterSection } from "@/components/sites/sewdarlin/root-default/NewsletterSection";
import { Footer } from "@/components/sites/sewdarlin/root-default/Footer";
import { CartDrawer } from "@/components/sites/sewdarlin/root-default/CartDrawer";
import { QuickViewModal } from "@/components/sites/sewdarlin/root-default/QuickViewModal";
import { SearchModal } from "@/components/sites/sewdarlin/root-default/SearchModal";
import { FloatingChatButton } from "@/components/sites/sewdarlin/root-default/FloatingChatButton";
import { DiscountPopup } from "@/components/sites/sewdarlin/root-default/DiscountPopup";

export default function HomePage() {
  return (
    <CartProvider>
      <main className="min-h-screen bg-[#FBF9F4] text-[#4F5A5E] flex flex-col font-sans selection:bg-[#D8A7A7]/30 selection:text-[#2E3A42]">
        {/* Top Notification Announcement Bar */}
        <AnnouncementBar />

        {/* Brand Header with Navigation and Search/Cart Triggers */}
        <Header />

        {/* Hero Section with Polaroid Gallery & Shop The Collection CTA */}
        <HeroSection />

        {/* New Arrivals Product Carousel */}
        <NewArrivals />

        {/* Fan Favourites Product Carousel */}
        <FanFavourites />

        {/* Shop By Collection Grid */}
        <CollectionsGrid />

        {/* Testimonials and Customer Praise */}
        <Testimonials />

        {/* Newsletter & Social Community ("Find Us Online") */}
        <NewsletterSection />

        {/* Slate Grey Footer */}
        <Footer />

        {/* Interactive Modals and Flyouts */}
        <CartDrawer />
        <QuickViewModal />
        <SearchModal />
        <FloatingChatButton />
        <DiscountPopup />
      </main>
    </CartProvider>
  );
}
