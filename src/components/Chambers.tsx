import { motion } from "framer-motion";
import { MapPin, Clock, Phone, User, Calendar, MessageCircle } from "lucide-react";

import bannerClinic from "@/assets/chamber/the-new-homeo-clinic.png";
import bannerDishari from "@/assets/chamber/dishari-banner.png";
import { DirectBookingDialog } from "./DirectBookingDialog";
import { WhatsAppCounsellingDialog } from "./WhatsAppCounsellingDialog";

const chambers = [
  { 
    get name() { return import.meta.env.VITE_CHAMBER_1_NAME; }, 
    get area() { return import.meta.env.VITE_CHAMBER_1_ADDRESS; }, 
    get time() { return import.meta.env.VITE_CHAMBER_1_TIME; }, 
    days: [2, 4, 6], // Tue, Thu, Sat
    image: bannerDishari,
    get mapUrl() { return import.meta.env.VITE_CHAMBER_1_MAP_URL; },
    get bookingUrl() {
      return `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hello, I would like to book an appointment at ${import.meta.env.VITE_CHAMBER_1_NAME} with ${import.meta.env.VITE_DOCTOR_NAME}.\n\n` +
        `Clinic Address:\n${import.meta.env.VITE_CHAMBER_1_ADDRESS}\n\n` +
        `Available Timings:\n${import.meta.env.VITE_CHAMBER_1_TIME}\n\n` +
        `Please let me know the available appointment slots. Thank you.`
      )}`;
    }
  },
  { 
    get name() { return import.meta.env.VITE_CHAMBER_2_NAME; }, 
    get area() { return import.meta.env.VITE_CHAMBER_2_ADDRESS; }, 
    get time() { return import.meta.env.VITE_CHAMBER_2_TIME; }, 
    days: [0, 1, 3, 5], // Sun, Mon, Wed, Fri
    image: bannerClinic,
    get mapUrl() { return import.meta.env.VITE_CHAMBER_2_MAP_URL; },
    get bookingUrl() {
      return `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hello, I would like to book an appointment at ${import.meta.env.VITE_CHAMBER_2_NAME} with ${import.meta.env.VITE_DOCTOR_NAME}.\n\n` +
        `Clinic Address:\n${import.meta.env.VITE_CHAMBER_2_ADDRESS}\n\n` +
        `Available Timings:\n${import.meta.env.VITE_CHAMBER_2_TIME}\n\n` +
        `Please let me know the available slots and appointment procedure. Thank you.`
      )}`;
    }
  },
];

export function Chambers() {
  return (
    <section id="chambers" className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Visit Us</div>
          <h2 className="text-4xl md:text-5xl font-serif text-sage-deep">
            Chamber <span className="italic text-gradient">locations</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {chambers.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-3xl overflow-hidden"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                {c.image ? (
                  <img 
                    src={c.image} 
                    alt={c.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 gradient-aqua opacity-90">
                    <div className="absolute inset-0 opacity-30" style={{
                      backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }} />
                  </div>
                )}
                <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
                  <div className="glass-strong rounded-full p-4 shadow-lg">
                    <MapPin className="size-6 text-sage" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl">{c.name}</h3>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><MapPin className="size-4 text-sage" /> {c.area}</div>
                  <div className="flex items-center gap-2"><Clock className="size-4 text-sage" /> {c.time}</div>
                  <div className="flex items-center gap-2 font-medium text-sage-deep"><User className="size-4 text-sage" /> Asst: {import.meta.env.VITE_ASSISTANT_NAME}</div>
                  <div className="flex items-center gap-2"><Phone className="size-4 text-sage" /> {import.meta.env.VITE_ASSISTANT_PHONE}</div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <a 
                    href={c.bookingUrl} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex sm:inline-flex w-full sm:w-auto justify-center gradient-deep text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                  >
                    WhatsApp Booking
                  </a>
                  <DirectBookingDialog 
                    clinicName={c.name}
                    clinicDays={c.days}
                    trigger={
                      <button className="flex sm:inline-flex w-full sm:w-auto justify-center bg-[#05443e] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform gap-2 items-center">
                        <Calendar className="size-3.5" /> 1-Tap Booking
                      </button>
                    }
                  />
                  {c.mapUrl && (
                    <a 
                      href={c.mapUrl} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex sm:inline-flex w-full sm:w-auto justify-center glass-strong border border-sage/20 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/60 transition-colors gap-2 items-center"
                    >
                      <MapPin className="size-3.5" /> Get Direction
                    </a>
                  )}
                  <a 
                    href={`tel:${import.meta.env.VITE_ASSISTANT_PHONE_RAW}`} 
                    className="flex sm:inline-flex w-full sm:w-auto justify-center glass-strong border border-sage/20 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/60 transition-colors gap-2 items-center"
                  >
                    <Phone className="size-3.5" /> Call Assistant
                  </a>
                </div>
                
                {c.name === import.meta.env.VITE_CHAMBER_1_NAME && (
                  <div className="mt-5 pt-4 border-t border-sage/20 text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-sage-deep">Psychological Counselling</span> is also available here by 
                    <span className="font-medium text-sage-deep"> Dr. Moumita Munian</span>. 
                    <div className="flex items-center gap-2 mt-1">
                      Call: <a href="tel:9874415974" className="font-semibold text-sage-deep hover:underline transition-colors">9874415974</a>
                      <span className="text-sage/40">|</span>
                      <WhatsAppCounsellingDialog 
                        trigger={
                          <button className="inline-flex items-center gap-1.5 font-semibold text-[#22c55e] hover:text-[#1ea952] transition-colors">
                            <MessageCircle className="size-4" /> WhatsApp
                          </button>
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
