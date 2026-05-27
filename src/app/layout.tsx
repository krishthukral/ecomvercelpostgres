import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Shop | Modern E-commerce",
  description: "A modern e-commerce site built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t py-8 bg-white">
          <div className="container mx-auto px-4 text-center text-gray-500">
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}