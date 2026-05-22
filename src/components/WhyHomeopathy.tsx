import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Baby, Sparkles } from "lucide-react";

const reasons = [
  { icon: Leaf, title: "Treats Root Cause", desc: "Goes beyond symptoms to address the underlying imbalance." },
  { icon: ShieldCheck, title: "Gentle & Natural", desc: "Minimal risk of side effects through natural precision." },
  { icon: Baby, title: "Safe for All Ages", desc: "From infants to seniors — including pregnancy." },
  { icon: Sparkles, title: "Long-lasting Cure", desc: "Constitutional remedies for sustained wellness." },
];

export function WhyHomeopathy() {
  return (
    <section id="why-homeopathy" className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Why Homeopathy</div>
          <h2 className="text-4xl md:text-5xl font-serif text-sage-deep">
            Gentle medicine, <span className="italic text-gradient">profound results</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-3xl p-6 text-center hover:-translate-y-1 transition-transform"
            >
              <div className="mx-auto size-14 rounded-2xl gradient-aqua grid place-items-center text-primary-foreground shadow-md">
                <r.icon className="size-6" />
              </div>
              <h3 className="font-serif text-xl mt-4">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
