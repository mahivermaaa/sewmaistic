import React from "react";
import { Header } from "@/components/sites/thf/root-default/Header";
import { HeroSection } from "@/components/sites/thf/root-default/HeroSection";
import { CategoryGrid } from "@/components/sites/thf/root-default/CategoryGrid";
import { BuildBoxBanner } from "@/components/sites/thf/root-default/BuildBoxBanner";
import { LabonSpotlight } from "@/components/sites/thf/root-default/LabonSpotlight";
import { PressCoverage } from "@/components/sites/thf/root-default/PressCoverage";
import { CorporateClients } from "@/components/sites/thf/root-default/CorporateClients";
import { InstagramFeed } from "@/components/sites/thf/root-default/InstagramFeed";
import { Footer } from "@/components/sites/thf/root-default/Footer";
import { FloatingCallButton } from "@/components/sites/thf/root-default/FloatingCallButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#DAD7CD] text-[#344E41] flex flex-col pt-[54px] md:pt-[68px]">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <BuildBoxBanner />
      <LabonSpotlight />
      <PressCoverage />
      <CorporateClients />
      <InstagramFeed />
      <Footer />
      <FloatingCallButton />
    </main>
  );
}
