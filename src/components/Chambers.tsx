import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

const chambers = [
  { name: "Jagacha Chamber", area: "Jagacha, Howrah", time: "Mon – Fri · 5:00 PM – 6:00 PM" },
  { name: "Notun Rasta Chamber", area: "Notun Rasta, Howrah", time: "Mon – Fri · 5:00 PM – 6:00 PM" },
];

export function Chambers() {
  return (
    <section id="chambers" className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Visit Us</div>
          <h2 className="text-4xl md:text-5xl font-serif">
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
              <div className="aspect-[16/9] relative gradient-aqua overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="glass-strong rounded-full p-5">
                    <MapPin className="size-8 text-sage" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl">{c.name}</h3>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><MapPin className="size-4 text-sage" /> {c.area}</div>
                  <div className="flex items-center gap-2"><Clock className="size-4 text-sage" /> {c.time}</div>
                  <div className="flex items-center gap-2"><Phone className="size-4 text-sage" /> +91 99999 99999</div>
                </div>
                <a href="#booking" className="mt-5 inline-flex gradient-deep text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                  Book a visit
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
