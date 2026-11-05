import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getCatalogue } from "@/lib/catalogue";
import { CatalogueProvider } from "@/context/CatalogueContext";

// Fonts are bundled with the site (src/app/fonts) so the build never needs to download them.
const cormorant = localFont({
  variable: "--font-cormorant",
  src: [
    { path: "./fonts/cormorant-garamond-latin-wght-normal.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/cormorant-garamond-latin-wght-italic.woff2", style: "italic", weight: "300 700" },
  ],
});

const sora = localFont({
  variable: "--font-sora",
  src: [{ path: "./fonts/sora-latin-wght-normal.woff2", style: "normal", weight: "100 800" }],
});

const alexBrush = localFont({
  variable: "--font-script",
  src: [{ path: "./fonts/alex-brush-latin-400-normal.woff2", style: "normal", weight: "400" }],
});

const inter = localFont({
  variable: "--font-inter",
  src: [{ path: "./fonts/inter-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sewmaistic.in"),
  title: "Sewmaistic | country inspired accessories",
  description:
    "Sewmaistic — handmade bags, cosplay costumes, thrift finds and little somethings. Small batch designs made in Delhi, India.",
  icons: {
    icon: "/sites/sewdarlin/root-default/logo.png",
    apple: "/sites/sewdarlin/root-default/logo.png",
  },
  openGraph: {
    title: "Sewmaistic | country inspired accessories",
    description:
      "Sewmaistic — handmade bags, cosplay costumes, thrift finds and little somethings. Small batch designs made in Delhi, India.",
    url: "https://sewmaistic.in",
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
