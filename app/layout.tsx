import "./globals.css";
import { Inter } from "next/font/google";
import TransitionProvider from "./transition-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-page text-ink font-sans antialiased">
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
