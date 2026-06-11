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

import { Link } from "react-router-dom";
import { Activity, Brain, Droplets, ChevronRight } from "lucide-react";

export function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Smart Calculators CTA Widget */}
      <section className="px-4 -mt-8 relative z-20 max-w-5xl mx-auto pb-4">
        <Link 
          to="/smart-calculators"
          className="group relative block p-[2px] rounded-[2rem] overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20"
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-[#68eed6] to-teal-500 rounded-[2rem] animate-pulse opacity-70 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative h-full w-full bg-white/95 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#68eed6]/20 to-transparent rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="flex-1 relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                  </span>
                  New Feature
                </span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-400 to-red-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  100% Free Tool
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-[#05443e] font-bold leading-tight">
                Smart Health Calculators
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-lg">
                Stop guessing. Instantly check your BMI, Daily Water Needs, and Stress Score absolutely free! No sign-up required.
              </p>
            </div>

            <div className="flex items-center gap-4 relative z-10 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center -space-x-3">
                <div className="size-12 rounded-full bg-[#f0f9f6] border-2 border-white text-emerald-600 grid place-items-center shadow-sm z-30"><Activity className="size-5" /></div>
                <div className="size-12 rounded-full bg-blue-50 border-2 border-white text-blue-600 grid place-items-center shadow-sm z-20"><Droplets className="size-5" /></div>
                <div className="size-12 rounded-full bg-rose-50 border-2 border-white text-rose-600 grid place-items-center shadow-sm z-10"><Brain className="size-5" /></div>
              </div>
              <div className="md:hidden flex items-center justify-center size-10 rounded-full bg-sage text-white">
                <ChevronRight className="size-5" />
              </div>
              <div className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#05443e] text-white rounded-full font-semibold group-hover:bg-[#032e2a] transition-colors shadow-md">
                Try For Free Now
                <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </div>
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
