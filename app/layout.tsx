import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TransitionProvider } from "./transition-provider";
import SmoothScroll from "@/components/smooth-scroll";

import { Navbar } from "@/components/navbar";
import { GlobalLoader } from "@/components/ui/global-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lead Generation & Digital Marketing Agency | Inyutek",
  description: "Lead generation agency for local businesses & e-commerce. Funnels, ads, SEO and automation that turn traffic into qualified leads. Book a call.",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
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
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SmoothScroll>
          <Navbar />
          <TransitionProvider>{children}</TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
