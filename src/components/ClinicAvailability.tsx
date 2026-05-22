import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  MapPin, 
  MessageCircle, 
  Navigation, 
  Calendar, 
  ChevronRight, 
  Circle,
  Bell,
  Stethoscope,
  Map as MapIcon
} from "lucide-react";

interface Clinic {
  id: string;
  name: string;
  address: string;
  days: number[]; // 0 for Sunday, 1 for Monday, etc.
  startTime: string; // "17:00"
  endTime: string; // "19:00"
  mapLink: string;
}

const CLINICS: Clinic[] = [
  {
    id: "new-homoeo",
    get name() { return import.meta.env.VITE_CHAMBER_2_NAME; },
    get address() { return import.meta.env.VITE_CHAMBER_2_ADDRESS; },
    days: [1, 3, 5], // Mon, Wed, Fri
    startTime: "17:00",
    endTime: "19:00",
    get mapLink() { return import.meta.env.VITE_CHAMBER_2_MAP_URL; }
  },
  {
    id: "dishari",
    get name() { return import.meta.env.VITE_CHAMBER_1_NAME; },
    get address() { return import.meta.env.VITE_CHAMBER_1_ADDRESS; },
    days: [2, 4, 6], // Tue, Thu, Sat
    startTime: "18:00",
    endTime: "20:00",
    get mapLink() { return import.meta.env.VITE_CHAMBER_1_MAP_URL; }
  },
  {
    id: "sunday-special",
    get name() { return import.meta.env.VITE_CHAMBER_2_NAME; },
    get address() { return import.meta.env.VITE_CHAMBER_2_ADDRESS; },
    days: [0], // Sunday
    startTime: "09:00",
    endTime: "11:00",
    get mapLink() { return import.meta.env.VITE_CHAMBER_2_MAP_URL; }
  }
];

export function ClinicAvailability() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayData = useMemo(() => {
    const day = currentTime.getDay();
    const currentHour = currentTime.getHours();
    const currentMin = currentTime.getMinutes();
    const currentTotalMin = currentHour * 60 + currentMin;

    const clinic = CLINICS.find(c => c.days.includes(day));
    if (!clinic) return null;

    const [startH, startM] = clinic.startTime.split(":").map(Number);
    const [endH, endM] = clinic.endTime.split(":").map(Number);
    const startTotalMin = startH * 60 + startM;
    const endTotalMin = endH * 60 + endM;

    let status: "open" | "soon" | "closed" = "closed";
    let countdown = "";

    if (currentTotalMin >= startTotalMin && currentTotalMin < endTotalMin) {
      status = "open";
    } else if (currentTotalMin < startTotalMin) {
      status = "soon";
      const diff = startTotalMin - currentTotalMin;
      const h = Math.floor(diff / 60);
      const m = diff % 60;
      countdown = `${h}h ${m}m`;
    } else {
      status = "closed";
    }

    return { clinic, status, countdown };
  }, [currentTime]);

  if (!todayData) return null;

  const { clinic, status, countdown } = todayData;

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-sage/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-10 right-10 p-20 opacity-5 -z-10 rotate-12">
        <Stethoscope className="size-64" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-white/50 backdrop-blur-md shadow-sm mb-4"
          >
            <Clock className="size-3 text-sage" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage">
              Live Chamber Status • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-serif text-sage-deep">
            Where is Dr. Das <span className="italic text-gradient">today?</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Ambient Glow */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${
            status === 'open' ? 'from-emerald-400/20 to-teal-400/20' : 
            status === 'soon' ? 'from-amber-400/20 to-orange-400/20' : 
            'from-slate-400/10 to-gray-400/10'
          } rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000`} />

          <div className="relative glass-strong rounded-[2.5rem] p-8 md:p-12 border border-white/40 overflow-hidden shadow-elegant">
            {/* Stethoscope Background */}
            <div className="absolute -top-10 -right-10 opacity-[0.04] rotate-12 pointer-events-none text-sage-deep">
              <Stethoscope className="size-64 md:size-80" />
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
              
              {/* Left Side: Status & Time */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    {status === "open" ? (
                      <motion.div
                        key="open"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest shadow-sm border border-emerald-200"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Available Now
                      </motion.div>
                    ) : status === "soon" ? (
                      <motion.div
                        key="soon"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffaf0] text-[#b45309] border border-[#fef3c7] text-[10px] font-bold uppercase tracking-widest shadow-sm"
                      >
                        <Bell className="size-3 animate-bounce" />
                        Opening in {countdown}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="closed"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold uppercase tracking-widest"
                      >
                        <Circle className="size-2 fill-slate-400" />
                        Closed for Today
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-serif text-[#05443e] leading-tight pr-10">{clinic.name}</h3>
                  <div className="flex items-start gap-3 text-muted-foreground group/loc transition-colors">
                    <MapPin className="size-5 text-[#05443e] shrink-0 mt-0.5 group-hover/loc:scale-110 transition-transform" />
                    <p className="text-sm leading-relaxed max-w-sm">{clinic.address}</p>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 pt-2">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Calendar className="size-3.5" /> Timing
                    </div>
                    <div className="text-xl font-bold text-[#05443e] tracking-tight">
                      {clinic.startTime.replace(":", ".")} PM – {clinic.endTime.replace(":", ".")} PM
                    </div>
                  </div>
                  
                  <div className="hidden lg:block w-px h-12 bg-sage/20" />
                  
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Navigation className="size-3.5" /> Distance
                    </div>
                    <div className="text-lg font-bold text-[#05443e] italic">Visit to find out</div>
                  </div>
                </div>
              </div>

              {/* Right Side: CTAs */}
              <div className="flex flex-col gap-4 mt-4 lg:mt-0">
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I would like to consult with ${import.meta.env.VITE_DOCTOR_NAME}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-full inline-flex items-center justify-between p-1.5 pr-6 rounded-full bg-[#22c55e] text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <div className="size-12 rounded-full bg-white/20 grid place-items-center backdrop-blur-md">
                    <MessageCircle className="size-5" />
                  </div>
                  <span className="font-bold tracking-wide text-sm">Consult on WhatsApp</span>
                  <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={clinic.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-full inline-flex items-center justify-between p-1.5 pr-6 rounded-full bg-white border border-white/50 text-[#05443e] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <div className="size-12 rounded-full bg-[#68eed6] text-[#05443e] grid place-items-center">
                    <MapIcon className="size-5" />
                  </div>
                  <span className="font-bold tracking-wide text-sm">Get Directions</span>
                  <ChevronRight className="size-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="mt-4 text-center">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em]">
                    Next Chamber: <span className="text-sage-deep font-bold">
                      {clinic.id === 'new-homoeo' ? 'Dishari (Tomorrow)' : 'New Homoeo Clinic (Tomorrow)'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
