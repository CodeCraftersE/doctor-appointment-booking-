import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Treatments } from "@/components/Treatments";
import { Booking } from "@/components/Booking";
import { WhyHomeopathy } from "@/components/WhyHomeopathy";
import { HealingJourney } from "@/components/HealingJourney";
import { Testimonials } from "@/components/Testimonials";
import { ChamberCarousel } from "@/components/ChamberCarousel";
import { Chambers } from "@/components/Chambers";
import { ClinicAvailability } from "@/components/ClinicAvailability";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BottomNav } from "@/components/BottomNav";

import { Link } from "@tanstack/react-router";
import { Activity, Brain, Droplets } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Smart Calculators CTA Widget */}
      <section className="px-4 -mt-8 relative z-20 max-w-5xl mx-auto pb-4">
        <Link 
          to="/smart-calculators"
          className="group relative block glass-strong p-6 rounded-[2rem] border border-sage/20 shadow-lg overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#68eed6]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-[#f0f9f6] text-[#05443e] text-[9px] font-bold uppercase tracking-widest">New Feature</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-[#05443e] font-bold">Smart Health Calculators</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                Instantly check your BMI, Daily Water Needs, Stress Score, and more.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#f0f9f6] text-[#05443e] grid place-items-center"><Activity className="size-5" /></div>
              <div className="size-10 rounded-full bg-blue-50 text-blue-600 grid place-items-center"><Droplets className="size-5" /></div>
              <div className="size-10 rounded-full bg-rose-50 text-rose-600 grid place-items-center"><Brain className="size-5" /></div>
            </div>
          </div>
        </Link>
      </section>

      <ClinicAvailability />
      <About />
      <Treatments />
      <WhyHomeopathy />
      <HealingJourney />
      <Booking />
      <Testimonials />
      <ChamberCarousel />
      <Chambers />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
