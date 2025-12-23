import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/Hero"
import { ProblemSection } from "@/components/sections/ProblemSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { ProcessSection } from "@/components/sections/ProcessSection"
import { ResultsSection } from "@/components/sections/ResultsSection"
import { WhySection } from "@/components/sections/WhySection"
import { CTASection } from "@/components/sections/CTASection"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfbfb]">
      <Navbar />

      {/* Scroll Scene (Hero) */}
      <Hero />

      {/* Problem Section (Reveals after Hero) */}
      <ProblemSection />

      {/* Services Section (Scroll Animation) */}
      <ServicesSection />

      {/* Process Section (Envelope Stacking) */}
      <ProcessSection />

      {/* Results Section (Window Stack) */}
      <ResultsSection />

      {/* Why Section (Basic Reveal) */}
      <WhySection />

      {/* CTA Section (Rotational Text) */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
