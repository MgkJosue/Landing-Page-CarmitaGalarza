import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carmita Galarza | Real Estate Agent | South Florida, FL",
  description:
    "Looking to buy or sell a home in South Florida? Carmita Galarza is a bilingual licensed real estate agent dedicated to making your real estate journey seamless and successful.",
  keywords: [
    "South Florida realtor",
    "bilingual real estate agent Florida",
    "buy home South Florida",
    "sell home South Florida",
    "Carmita Galarza",
  ],
  openGraph: {
    title: "Carmita Galarza | Real Estate Agent | South Florida, FL",
    description:
      "Looking to buy or sell a home in South Florida? Carmita Galarza is a bilingual licensed real estate agent dedicated to making your real estate journey seamless and successful.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-[#f0ece4] antialiased">{children}</body>
    </html>
  );
}
