import { Hero } from "@/components/sections/Hero"
import dynamic from "next/dynamic"
import ScrollToTop from "@/components/ScrollToTop"

// Lazy-load all below-fold sections so they don't block the hero's initial render.
// They will load in the background while the hero is visible.
const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection").then(m => ({ default: m.ProblemSection })))
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })))
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(m => ({ default: m.ProcessSection })))
const ResultsSection = dynamic(() => import("@/components/sections/ResultsSection").then(m => ({ default: m.ResultsSection })))
const LogoMarquee = dynamic(() => import("@/components/sections/LogoMarquee").then(m => ({ default: m.LogoMarquee })))
const WhySection = dynamic(() => import("@/components/sections/WhySection").then(m => ({ default: m.WhySection })))
const CTASection = dynamic(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })))
const Footer = dynamic(() => import("@/components/sections/Footer"))

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfb]">
      {/* Scroll Scene (Hero) — loaded eagerly */}
      <Hero />

      {/* Problem Section (Reveals after Hero) */}
      <ProblemSection />

      {/* Services Section (Scroll Animation) */}
      <ServicesSection />

      {/* Process Section (Envelope Stacking) */}
      <ProcessSection />

      {/* Results Section (Window Stack) */}
      <ResultsSection />

      {/* Trusted By (Marquee) */}
      <LogoMarquee />

      {/* Why Section (Basic Reveal) */}
      <WhySection />

      {/* CTA Section (Rotational Text) */}
      <CTASection />

      {/* Footer */}
      <Footer />

    </main>
  )
}
