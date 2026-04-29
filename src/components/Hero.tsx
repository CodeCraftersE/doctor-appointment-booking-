import { motion } from "framer-motion";
import { MessageCircle, Calendar } from "lucide-react";
import heroBottle from "@/assets/hero-bottle.png";
import globules from "@/assets/globules.png";
import leaf from "@/assets/leaf.png";

export function Hero() {
  return (
    <section className="relative pt-32 md:pt-36 pb-20 px-4 md:px-8 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-20 -left-32 size-96 rounded-full bg-mint/60 blur-3xl animate-blob" />
      <div className="absolute top-40 -right-32 size-[28rem] rounded-full bg-aqua/40 blur-3xl animate-blob" />

      <div className="relative max-w-7xl mx-auto">
        <div className="glass-strong rounded-[2.5rem] md:rounded-[3rem] overflow-hidden p-6 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-10 items-center min-h-[560px]">
          {/* Liquid SVG decoration */}
          <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full pointer-events-none opacity-50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="liquid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.85 0.1 195)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="oklch(0.92 0.06 165)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M0,400 Q200,300 400,380 T800,360 L800,600 L0,600 Z"
              fill="url(#liquid)"
            />
          </svg>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
              <span className="size-1.5 rounded-full bg-sage animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sage">
                Classical Homeopathy · Howrah
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] text-balance">
              Restore Your Health <span className="italic text-gradient">Naturally</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl text-pretty">
              Personalized homeopathic care with zero side effects. Treating the root cause through the gentle precision of classical Hahnemannian principles.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="group inline-flex items-center gap-2 gradient-deep text-primary-foreground px-7 py-4 rounded-full text-sm font-semibold shadow-elegant hover:scale-105 transition-transform"
              >
                <Calendar className="size-4" />
                Book Appointment
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 glass px-7 py-4 rounded-full text-sm font-semibold hover:bg-white/60 transition-colors"
              >
                <MessageCircle className="size-4 text-whatsapp" />
                WhatsApp Consult
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: "18+", l: "Years" },
                { v: "12k+", l: "Patients" },
                { v: "0", l: "Side Effects" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-4 text-center">
                  <div className="font-serif text-2xl text-sage">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative h-[420px] md:h-[520px]"
          >
            <motion.img
              src={heroBottle}
              alt="Glass dropper bottle of homeopathic medicine"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              width={1024}
              height={1024}
            />
            <motion.img
              src={globules}
              alt=""
              className="absolute -top-4 -right-2 size-32 md:size-40 object-contain"
              animate={{ y: [0, 14, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              width={1024}
              height={1024}
              loading="lazy"
            />
            <motion.img
              src={leaf}
              alt=""
              className="absolute bottom-4 -left-2 size-24 md:size-32 object-contain"
              animate={{ rotate: [0, -10, 0], y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              width={768}
              height={768}
              loading="lazy"
            />
            {/* Floating glass info chip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-2 right-2 glass-strong rounded-2xl p-4 max-w-[200px]"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active</div>
              <div className="font-serif text-lg leading-tight mt-0.5">Constitutional Remedy</div>
              <div className="mt-2 h-1 w-full bg-mint rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-aqua"
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
