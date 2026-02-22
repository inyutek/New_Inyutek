import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TransitionProvider } from "./transition-provider";
import SmoothScroll from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { GlobalLoader } from "@/components/ui/global-loader";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lead Generation & Digital Marketing Agency | Inyutek",
  description: "Inyutek is a lead generation agency for local businesses & e-commerce in India. We use funnels, Google Ads, SEO and automation to turn traffic into qualified leads and bookings. Book a free call.",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  metadataBase: new URL('https://inyutek.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://inyutek.com',
    title: 'Lead Generation & Digital Marketing Agency | Inyutek',
    description: 'Inyutek is a lead generation agency for local businesses & e-commerce in India. Funnels, Google Ads, SEO and automation that turn traffic into qualified leads. Book a free call.',
    siteName: 'Inyutek',
    images: [{
      url: 'https://inyutek.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Inyutek — Lead Generation & Digital Marketing Agency',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Generation & Digital Marketing Agency | Inyutek',
    description: 'Inyutek is a lead generation agency for local businesses & e-commerce in India. Funnels, Google Ads, SEO and automation that turn traffic into qualified leads.',
    images: ['https://inyutek.com/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Hide the JS-only loader for non-JS crawlers (Google OAuth verifier, Googlebot).
            Without JS, the loader stays visible forever and blocks the homepage content. */}
        <noscript><style>{`#inyutek-loader { display: none !important; }`}</style></noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WCMR3RWX');
          `}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NDQ194HJKV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NDQ194HJKV');
          `}
        </Script>
        {/* JSON-LD: Organization + LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://inyutek.com/#organization",
                  "name": "Inyutek",
                  "url": "https://inyutek.com",
                  "logo": "https://inyutek.com/icon.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9112235551",
                    "contactType": "customer service"
                  },
                  "sameAs": [
                    "https://www.instagram.com/inyutek",
                    "https://www.linkedin.com/company/inyutek"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://inyutek.com/#localbusiness",
                  "name": "Inyutek",
                  "description": "Lead generation agency for local businesses & e-commerce. Funnels, ads, SEO and automation that turn traffic into qualified leads.",
                  "url": "https://inyutek.com",
                  "telephone": "+91-9112235551",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Amravati",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                  },
                  "priceRange": "$$",
                  "openingHours": "Mo-Fr 09:00-18:00"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-white text-[#010B13] font-sans antialiased px-4 sm:px-6 lg:px-8`}>
        {/* ── INYUTEK Branded Loader (Layer 0 — first paint) ── */}
        <GlobalLoader />
        {/* ── Main content (Layer 1+2 — renders behind loader) ── */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCMR3RWX"
            height="0"
            width="0"
            className="hidden invisible"
          />
        </noscript>
        <SmoothScroll>
          <Navbar />
          <TransitionProvider>{children}</TransitionProvider>
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
