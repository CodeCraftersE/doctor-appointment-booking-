import { motion } from "framer-motion";
import { Sparkles, Leaf, Brain, Shield, Activity, Droplet } from "lucide-react";
import heroBottle from "@/assets/hero-bottle.png";
import { Globules } from "./Globules";

const services = [
  { icon: Sparkles, title: "Skin Problems", desc: "Eczema, psoriasis, acne and chronic dermatitis." },
  { icon: Leaf, title: "Digestive Issues", desc: "Acidity, IBS, ulcers and gut imbalances." },
  { icon: Brain, title: "Stress & Anxiety", desc: "Mood, sleep and emotional equilibrium." },
  { icon: Shield, title: "Immunity Boost", desc: "Recurrent infections, allergies, low immunity." },
  { icon: Activity, title: "Chronic Disease", desc: "Asthma, arthritis, thyroid, diabetes support." },
  { icon: Droplet, title: "Hormonal Balance", desc: "PCOS, menstrual & endocrine wellness." },
];

export function Treatments() {
  return (
    <section id="treatments" className="relative py-24 px-4 md:px-8 overflow-hidden">
      <Globules count={4} className="opacity-60" />
      <div className="max-w-6xl mx-auto text-center mb-14 relative">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Core Treatments</div>
        <h2 className="text-4xl md:text-5xl font-serif text-sage-deep">
          Care for every <span className="italic text-gradient">part of you</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          A complete spectrum of classical homeopathic treatment, tailored to your constitution.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Center bottle visual — desktop only, GPU-accelerated, no JS */}
        <div aria-hidden className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 size-80 -m-4 rounded-full bg-aqua/40 blur-3xl animate-pulse-soft" />
            <img
              src={heroBottle}
              alt=""
              className="size-72 object-contain drop-shadow-2xl gpu animate-float-slow"
              loading="lazy"
              decoding="async"
              width={1024}
              height={1024}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 relative">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={`glass-strong rounded-3xl p-6 group ${i === 1 || i === 4 ? "lg:translate-y-12" : ""}`}
            >
              <div className="size-12 rounded-2xl gradient-aqua grid place-items-center text-primary-foreground shadow-md group-hover:scale-110 transition-transform">
                <s.icon className="size-5" />
              </div>
              <h3 className="font-serif text-2xl mt-4 text-sage-deep">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
              <a href="#booking" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sage hover:gap-2 transition-all">
                Consult now <span aria-hidden>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
