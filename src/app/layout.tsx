import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EVR Vet Options Corporation | Trusted Veterinary Solutions",
    template: "%s | EVR Vet Options Corporation",
  },
  description:
    "EVR Vet Options Corporation is a leading Philippine distributor of veterinary products and solutions for livestock, companion animals, and veterinary machines & equipment.",
  keywords: [
    "veterinary products Philippines",
    "livestock supplies",
    "pet consumables",
    "veterinary equipment",
    "animal health",
    "EVR Vet Options",
  ],
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "EVR Vet Options Corporation",
    title: "EVR Vet Options Corporation | Trusted Veterinary Solutions",
    description:
      "Excellence. Value. Reliability. Veterinary solutions for livestock, pets, and clinics across the Philippines.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EVR Vet Options Corporation",
    description:
      "Trusted veterinary solutions for livestock, pets, and clinics across the Philippines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8faf8" },
    { media: "(prefers-color-scheme: dark)", color: "#12152b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
