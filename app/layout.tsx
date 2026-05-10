import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "NÉO | Premium Footwear Collection",
  description: "Discover the next evolution of luxury footwear. Meticulous craftsmanship meets timeless silhouette.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-luxury-dark">
      <body className={`${inter.variable} ${playfair.variable} bg-[#0A0A0A] antialiased font-sans min-w-[1200px] overflow-x-auto`}>
        {children}
      </body>
    </html>
  );
}
