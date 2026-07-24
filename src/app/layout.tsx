import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Pirata_One } from "next/font/google";
import "./globals.css";

import { siteMetadata } from "@/lib/metadata";
import { SITE_NAME, SITE_URL, SOCIAL_LINKS, WHATSAPP_NUMBER } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import Sparkles from "@/components/Sparkles";
import CustomCursor from "@/components/CustomCursor";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import QuoteModalProvider from "@/components/QuoteModalProvider";
import QuoteModal from "@/components/QuoteModal";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Used only for the NARTATTOO wordmark/logo lockup, to echo the brand's
// ornate gothic-blackletter identity — section headings keep Bebas Neue.
const pirataOne = Pirata_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gothic-src",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  telephone: `+${WHATSAPP_NUMBER}`,
  priceRange: "$$",
  sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook, SOCIAL_LINKS.tiktok],
  description:
    "Estudio de tatuajes premium especializado en diseños personalizados, realismo, blackwork y fine line.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable} ${pirataOne.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen bg-ink font-sans text-white antialiased">
        <QuoteModalProvider>
          <Sparkles />
          <ScrollProgressBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <QuoteModal />
          <PwaInstallPrompt />
          <CustomCursor />
          <ServiceWorkerRegister />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
