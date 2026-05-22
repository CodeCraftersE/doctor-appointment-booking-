import { motion } from "framer-motion";
import { Search, Zap, ShieldCheck } from "lucide-react";

const stages = [
  {
    icon: Search,
    title: "The Discovery",
    subtitle: "First Consultation",
    desc: "A deep, 45-60 minute dive into your unique physical, mental, and emotional story to find your constitutional core.",
    color: "from-sage/40 to-sage/10",
    shadow: "shadow-sage/20"
  },
  {
    icon: Zap,
    title: "The Response",
    subtitle: "Constitutional Balancing",
    desc: "Your tailored remedy begins to align your vital energy. You'll notice subtle yet profound shifts in your overall well-being.",
    color: "from-mint/40 to-mint/10",
    shadow: "shadow-mint/20"
  },
  {
    icon: ShieldCheck,
    title: "Lasting Wellness",
    subtitle: "Long-term Immunity",
    desc: "Beyond symptom relief, we achieve a state of permanent constitutional strength and deep-rooted immunity.",
    color: "from-sage-deep/40 to-sage-deep/10",
    shadow: "shadow-sage-deep/20"
  }
];

export function HealingJourney() {
  return (
    <section id="journey" className="relative py-24 px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 size-96 rounded-full bg-sage/10 blur-[120px] -z-10" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 size-96 rounded-full bg-mint/10 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Expectations</div>
          <h2 className="text-4xl md:text-5xl font-serif text-sage-deep">
            The <span className="italic text-gradient">Healing Journey</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Homeopathy is not a quick fix, but a path to permanent cure. Understand the three stages of your recovery.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group"
              >
                <div className="glass-strong rounded-[2.5rem] p-8 h-full border border-sage/10 hover:border-sage/30 transition-all hover:shadow-elegant-lg relative overflow-hidden">
                  {/* Decorative Gradient */}
                  <div className={`absolute -top-24 -right-24 size-48 rounded-full bg-gradient-to-br ${stage.color} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="size-[60px] rounded-full bg-[#68eed6] grid place-items-center shadow-sm">
                        <stage.icon className="size-7 text-[#05443e]" strokeWidth={2.5} />
                      </div>
                      <div className="text-[40px] font-serif text-[#05443e]/20 font-bold italic leading-none">0{i + 1}</div>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#05443e] mb-3">{stage.subtitle}</div>
                    <h3 className="text-[22px] font-serif text-[#05443e] mb-4">{stage.title}</h3>
                    <p className="text-[15px] text-[#05443e]/80 leading-relaxed font-medium">
                      {stage.desc}
                    </p>
                  </div>
                  
                  {/* Progress Indicator (Mobile/Tablet) */}
                  {i < stages.length - 1 && (
                    <div className="md:hidden mt-8 flex justify-center">
                      <div className="w-px h-12 bg-gradient-to-b from-sage/30 to-transparent" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-soft border border-sage/10 text-xs font-medium text-sage-deep italic">
            <span className="inline-block size-2 rounded-full bg-mint animate-pulse" />
            "Homeopathy treats the patient, not just the disease." — Dr. Sandip Das
          </div>
        </div>
      </div>
    </section>
  );
}
