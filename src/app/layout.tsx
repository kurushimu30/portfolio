import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// src/app/layout.tsx

export const metadata: Metadata = {
  title: 'Mel Carl Chacon | Architect',
  description: 'Founder & CEO of ARK.',
  // Removing icons here forces Next.js to use the file-based resolution in public/
  // But to be 100% sure, let's explicitly point to your file:
  icons: {
    icon: '/ark_logo.png',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Explicit meta tags to force browser refresh of icon if cached */}
        <link rel="icon" href="/ark_logo.png" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0b0f] text-white">
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}