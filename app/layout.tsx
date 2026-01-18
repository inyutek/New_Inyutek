import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TransitionProvider } from "./transition-provider";
import SmoothScroll from "@/components/smooth-scroll";

import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inyutek",
  description: "Inyutek – Your company tagline here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        <SmoothScroll>
          <Navbar />
          <TransitionProvider>{children}</TransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
