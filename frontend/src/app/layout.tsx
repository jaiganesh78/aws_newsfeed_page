import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { QueryProvider } from "@/lib/query/query-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWS SBG REC",
  description: "AWS Student Builder Groups REC platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
