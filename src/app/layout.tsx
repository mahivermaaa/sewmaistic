import type { Metadata } from "next";
import { Cormorant_Garamond, Sora, Alex_Brush, Inter } from "next/font/google";
import "./globals.css";
import { getCatalogue } from "@/lib/catalogue";
import { CatalogueProvider } from "@/context/CatalogueContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sewmaistic | country inspired accessories",
  description:
    "Sewmaistic offers handmade scrunchies, hair bows, and Kindle cases designed with cottagecore charm and a touch of country style. Small batch designs created in Delhi, India.",
  icons: {
    icon: "/sites/sewdarlin/root-default/logo.png",
    apple: "/sites/sewdarlin/root-default/logo.png",
  },
  openGraph: {
    title: "Sewmaistic | country inspired accessories",
    description:
      "Sewmaistic offers handmade scrunchies, hair bows, and Kindle cases designed with cottagecore charm and a touch of country style.",
    url: "https://www.sewdarlin.com.au",
    siteName: "Sewmaistic",
    images: [
      {
        url: "/sites/sewdarlin/root-default/hero-banner.png",
        width: 1440,
        height: 589,
        alt: "Sewmaistic Handmade Accessories",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getCatalogue();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sora.variable} ${alexBrush.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#4F5A5E]">
        <CatalogueProvider products={products}>{children}</CatalogueProvider>
      </body>
    </html>
  );
}
