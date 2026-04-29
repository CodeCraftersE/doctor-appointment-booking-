import { motion } from "framer-motion";
import { MessageCircle, Calendar, Sparkles } from "lucide-react";
import heroBottle from "@/assets/hero-bottle.png";
import leaf from "@/assets/leaf.png";
import { Globules } from "./Globules";
import { LiquidBackdrop } from "./LiquidBackdrop";

export function Hero() {
  return (
    <section className="relative pt-32 md:pt-36 pb-20 px-4 md:px-8 overflow-hidden">
      {/* Ambient depth blobs */}
      <div aria-hidden className="absolute top-20 -left-32 size-[28rem] rounded-full bg-mint/70 blur-3xl animate-blob gpu" />
      <div aria-hidden className="absolute top-40 -right-32 size-[32rem] rounded-full bg-aqua/40 blur-3xl animate-blob gpu" style={{ animationDelay: "-5s" }} />

      <div className="relative max-w-7xl mx-auto">
        <div className="glass-strong grain rounded-[2rem] md:rounded-[3rem] overflow-hidden p-6 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-10 items-center min-h-[560px] relative">
          {/* Liquid SVG layer */}
          <LiquidBackdrop className="absolute inset-0 w-full h-full opacity-60" />
          {/* Floating globules layer */}
          <Globules count={6} />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-soft mb-6">
              <Sparkles className="size-3 text-sage" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sage">
                Classical Homeopathy · Howrah
              </span>
            </div>

            <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.02] text-balance text-sage-deep">
              Restore Your Health
              <br />
              <span className="italic text-gradient">Naturally</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed text-pretty">
              Personalized homeopathic care with zero side effects. Treating the root cause through the gentle precision of classical Hahnemannian principles.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="group relative inline-flex items-center gap-2 gradient-deep text-primary-foreground px-7 py-4 rounded-full text-sm font-semibold shadow-elegant hover:-translate-y-0.5 transition-transform overflow-hidden"
              >
                <Calendar className="size-4" />
                Book Appointment
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 glass-soft px-7 py-4 rounded-full text-sm font-semibold hover:bg-white/70 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="size-4 text-whatsapp" />
                WhatsApp Consult
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
              {[
                { v: "18+", l: "Years" },
                { v: "12k+", l: "Patients" },
                { v: "0", l: "Side Effects" },
              ].map((s) => (
                <div key={s.l} className="glass-soft rounded-2xl p-4 text-center">
                  <div className="font-serif text-2xl text-gradient">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] md:h-[520px] lg:h-[560px] z-10"
          >
            {/* Soft halo behind bottle */}
            <div aria-hidden className="absolute inset-0 m-auto size-72 rounded-full bg-aqua/30 blur-3xl animate-pulse-soft" />

            {/* Bottle (LCP candidate — eager, fetchpriority) */}
            <img
              src={heroBottle}
              alt="Glass dropper bottle of homeopathic medicine"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl gpu animate-float-slow"
              width={1024}
              height={1024}
              fetchPriority="high"
              decoding="async"
            />

            {/* Liquid spheres (CSS-only animation, no React frame work) */}
            <span aria-hidden className="absolute top-6 right-8 size-20 md:size-24 rounded-full liquid-sphere gpu animate-float-med" />
            <span aria-hidden className="absolute bottom-20 left-4 size-12 md:size-16 rounded-full liquid-sphere gpu animate-float-med" style={{ animationDelay: "-2s" }} />
            <span aria-hidden className="absolute top-1/2 right-2 size-8 rounded-full liquid-sphere gpu animate-float-slow" style={{ animationDelay: "-3s" }} />

            <img
              src={leaf}
              alt=""
              className="absolute bottom-6 -left-2 size-24 md:size-32 object-contain gpu animate-float-med"
              width={768}
              height={768}
              loading="lazy"
              decoding="async"
              style={{ animationDelay: "-1.5s" }}
            />

            {/* Floating glass info chip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="absolute bottom-2 right-2 glass-strong rounded-2xl p-4 max-w-[210px]"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-sage">Active</div>
              <div className="font-serif text-lg leading-tight mt-0.5">Constitutional Remedy</div>
              <div className="mt-2 h-1.5 w-full bg-mint rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-aqua rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1.6, delay: 0.9, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
