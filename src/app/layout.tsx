import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Figtree, Fraunces, Great_Vibes } from "next/font/google";
import { Providers } from "@/app/providers";
import { brandCopy } from "@/lib/brand/copy";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: brandCopy.appName,
  description: "Employee training for The Praguery — iPad-first, role sign-in, offline-ready.",
  applicationName: brandCopy.appName,
  appleWebApp: {
    capable: true,
    title: "Academy",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#161411",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${figtree.variable} ${fraunces.variable} ${script.variable}`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
