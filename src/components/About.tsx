import { motion } from "framer-motion";
import doctor from "@/assets/sandip-das-portrait.jpg";
import { Award, Heart, Sparkles, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative py-24 px-4 md:px-8">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 size-96 rounded-full bg-aqua/20 blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="glass-strong rounded-[2.5rem] overflow-hidden aspect-[4/5] max-w-md mx-auto relative">
            <img
              src={doctor}
              alt={`${import.meta.env.VITE_DOCTOR_NAME}, Classical Homeopath`}
              className="w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
            <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-2xl p-4">
              <div className="font-serif text-xl">{import.meta.env.VITE_DOCTOR_NAME}</div>
              <div className="text-xs text-muted-foreground">BHMS · Classical Homeopath</div>
            </div>
          </div>
          <div className="absolute -top-6 -right-2 glass-strong rounded-2xl p-4 hidden md:block gpu animate-float-slow">
            <Award className="size-6 text-sage" />
            <div className="text-xs mt-1 font-semibold">18+ Years</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">About the Doctor</div>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-sage-deep">
            A holistic path to <span className="italic text-gradient">lasting wellness</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-pretty">
            With nearly two decades of practice in classical homeopathy, {import.meta.env.VITE_DOCTOR_NAME} treats the individual — not just the symptom. Each remedy is selected through deep case study, addressing the mind and body as one continuous system.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { icon: Heart, title: "Patient First", desc: "In-depth listening" },
              { icon: Sparkles, title: "Root Cause", desc: "Constitutional cure" },
              { icon: Award, title: "Trusted", desc: "12,000+ patients" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-4 hover:-translate-y-1 transition-transform"
              >
                <f.icon className="size-5 text-sage" />
                <div className="font-semibold mt-2 text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
