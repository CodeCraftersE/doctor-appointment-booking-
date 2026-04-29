import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Treatments } from "@/components/Treatments";
import { Booking } from "@/components/Booking";
import { WhyHomeopathy } from "@/components/WhyHomeopathy";
import { Testimonials } from "@/components/Testimonials";
import { Chambers } from "@/components/Chambers";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Treatments />
      <WhyHomeopathy />
      <Booking />
      <Testimonials />
      <Chambers />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
