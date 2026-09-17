import type { Metadata } from "next";
import { Bodoni_Moda, Source_Sans_3, Inter } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Sugar House | Handcrafted Sweets, Baklava & Gifting",
  description: "Handcrafted sweets, baklava, and gifting collections made with the finest ingredients.",
  icons: {
    icon: "/sites/thf/root-default/icon.png",
  },
  openGraph: {
    title: "The Sugar House",
    description: "Handcrafted sweets, baklava, and gifting collections made with the finest ingredients.",
    url: "https://www.thesugarhouse.com",
    siteName: "The Sugar House",
    images: [
      {
        url: "/sites/thf/root-default/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Sugar House",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${sourceSans3.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#DAD7CD] text-[#344E41]">
        {children}
      </body>
    </html>
  );
}
