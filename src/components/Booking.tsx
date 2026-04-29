import { motion } from "framer-motion";
import { Video, Phone, MapPin, MessageCircle, Calendar, User } from "lucide-react";
import { useState } from "react";

const pricing = [
  { icon: Video, title: "Video Consultation", price: 500, desc: "Face-to-face online visit" },
  { icon: Phone, title: "Call Consultation", price: 300, desc: "Voice consultation by phone" },
  { icon: MapPin, title: "Chamber Visit", price: 400, desc: "In-person at Howrah chambers" },
];

const problems = [
  "Skin Problem", "Digestive Issue", "Stress & Anxiety", "Immunity",
  "Chronic Disease", "Hair Problem", "Hormonal", "Other",
];

export function Booking() {
  const [selected, setSelected] = useState(0);
  const [problem, setProblem] = useState(problems[0]);
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");

  const waMessage = encodeURIComponent(
    `Hi Dr. Sandip Das, I'd like to book a ${pricing[selected].title} (₹${pricing[selected].price}).\nProblem: ${problem}\nPreferred Date: ${date || "ASAP"}\nPhone: ${phone}`
  );

  return (
    <section id="booking" className="relative py-24 px-4 md:px-8">
      <div className="absolute top-20 right-10 size-80 rounded-full bg-mint/60 blur-3xl -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Book Your Visit</div>
          <h2 className="text-4xl md:text-5xl font-serif text-sage-deep">
            Quick, easy <span className="italic text-gradient">consultation booking</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Pick a mode, share your details, and we'll confirm within hours.</p>
        </div>

        <div className="glass-strong rounded-[2.5rem] p-6 md:p-10 grid lg:grid-cols-5 gap-8">
          {/* Pricing options */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Choose mode</div>
            {pricing.map((p, i) => (
              <motion.button
                key={p.title}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelected(i)}
                className={`w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all border ${
                  selected === i ? "gradient-deep text-primary-foreground border-transparent shadow-elegant" : "glass border-border hover:bg-white/60"
                }`}
              >
                <div className={`size-11 rounded-xl grid place-items-center ${selected === i ? "bg-white/20" : "gradient-aqua text-primary-foreground"}`}>
                  <p.icon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{p.title}</div>
                  <div className={`text-xs ${selected === i ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.desc}</div>
                </div>
                <div className="font-serif text-xl">₹{p.price}</div>
              </motion.button>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Select Problem</label>
              <div className="relative mt-2">
                <select
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full glass rounded-2xl px-4 py-3.5 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-sage"
                >
                  {problems.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Date</label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phone</label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                    className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Selected</div>
                <div className="font-serif text-lg">{pricing[selected].title}</div>
              </div>
              <div className="font-serif text-3xl text-gradient">₹{pricing[selected].price}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/919999999999?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-whatsapp text-white font-semibold shadow-elegant hover:scale-[1.02] transition-transform"
              >
                <MessageCircle className="size-4" />
                Book on WhatsApp
              </a>
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full gradient-deep text-primary-foreground font-semibold hover:scale-[1.02] transition-transform">
                <Calendar className="size-4" />
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
