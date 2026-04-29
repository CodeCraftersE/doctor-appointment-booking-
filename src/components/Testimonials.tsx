import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const items = [
  { name: "Priya S.", role: "Skin patient", text: "After years of eczema, Dr. Das's remedies brought my skin back to peace. Truly transformative care." },
  { name: "Anirban M.", role: "Chronic asthma", text: "I had given up hope. Six months of treatment and I'm breathing easy without inhalers." },
  { name: "Riya G.", role: "Anxiety", text: "Calm, patient, deeply knowledgeable. The consultation itself was healing." },
];

export function Testimonials() {
  return (
    <section className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Patient Stories</div>
          <h2 className="text-4xl md:text-5xl font-serif text-sage-deep">
            Healing journeys, <span className="italic text-gradient">real voices</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-3xl p-7 relative glow-aqua"
            >
              <Quote className="size-8 text-sage/30 absolute top-5 right-5" />
              <p className="font-serif text-lg leading-relaxed italic">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="size-10 rounded-full gradient-aqua grid place-items-center text-primary-foreground font-serif">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
