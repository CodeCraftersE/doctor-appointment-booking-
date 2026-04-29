import { motion } from "framer-motion";
import { Sparkles, Leaf, Brain, Shield, Activity, Droplet } from "lucide-react";
import heroBottle from "@/assets/hero-bottle.png";

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
      <div className="max-w-6xl mx-auto text-center mb-14">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Core Treatments</div>
        <h2 className="text-4xl md:text-5xl font-serif">
          Care for every <span className="italic text-gradient">part of you</span>
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Center bottle visual */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute inset-0 size-72 rounded-full bg-aqua/30 blur-3xl -z-10" />
            <img src={heroBottle} alt="" className="size-72 object-contain drop-shadow-2xl" loading="lazy" width={1024} height={1024} />
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 relative">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`glass-strong rounded-3xl p-6 ${i === 1 || i === 4 ? "lg:translate-y-12" : ""}`}
            >
              <div className="size-12 rounded-2xl gradient-aqua grid place-items-center text-primary-foreground shadow-md">
                <s.icon className="size-5" />
              </div>
              <h3 className="font-serif text-2xl mt-4">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
              <a href="#booking" className="mt-4 inline-block text-xs font-semibold text-sage hover:underline">
                Consult now →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
