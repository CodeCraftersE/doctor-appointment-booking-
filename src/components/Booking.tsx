import { motion, AnimatePresence } from "framer-motion";
import { Video, Phone, MapPin, MessageCircle, Calendar, User, Loader2, Check, Thermometer, UserCircle, Home, Info } from "lucide-react";
import { useState, useEffect } from "react";

const pricing = [
  { icon: Video, title: "Video Consultation", price: 500, desc: "Face-to-face online visit" },
  { icon: MapPin, title: "Chamber Visit", price: 300, desc: "Inc. 7–10 days medicine" },
  { icon: Home, title: "Home Visit", price: 800, desc: "Doctor visits your residence" },
];

const problems = [
  "Skin Problems", "Digestive Issues", "Stress & Anxiety", "Immunity Boost",
  "Chronic Disease", "Hormonal Balance", "Hair Problem", "Other",
];

export function Booking() {
  const [selected, setSelected] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [problemDesc, setProblemDesc] = useState("");
  const [problemCategory, setProblemCategory] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleCategorySelect = (e: CustomEvent) => {
      setProblemCategory(e.detail);
    };
    window.addEventListener('select-category', handleCategorySelect as EventListener);
    return () => window.removeEventListener('select-category', handleCategorySelect as EventListener);
  }, []);

  const waMessage = encodeURIComponent(
    `I want to consult about a problem with the following details:\n\n` +
    `*Patient Information:*\n` +
    `- Name: ${name || "Not provided"}\n` +
    `- Age: ${age || "Not provided"}\n` +
    `- Sex: ${gender}\n` +
    `- Mode: ${pricing[selected].title}\n` +
    `- Contact: ${phone || "Not provided"}\n\n` +
    `*Problem Category:* ${problemCategory || "General Consultation"}\n` +
    `*Description:* ${problemDesc || "Will discuss with doctor"}\n` +
    `*Preferred Date:* ${date || "ASAP"}`
  );

  const handleWhatsAppBooking = () => {
    if (!name || !phone) {
      alert("Please enter at least your Name and Phone number.");
      return;
    }
    
    setIsBooking(true);
    // Premium loading experience
    setTimeout(() => {
      setIsBooking(false);
      setShowSuccess(true);
      // Brief success pause for feedback
      setTimeout(() => {
        window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
        setShowSuccess(false);
      }, 1500);
    }, 1200);
  };

  return (
    <section id="booking" className="relative py-24 px-4 md:px-8">
      <div className="absolute top-20 right-10 size-80 rounded-full bg-mint/60 blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Book Your Visit</div>
          <h2 className="text-4xl md:text-5xl font-serif text-sage-deep">
            Quick, easy <span className="italic text-gradient">consultation booking</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Fill in your details, and we'll connect via WhatsApp to finalize your visit.</p>
        </div>

        <div className="glass-strong rounded-[2.5rem] p-6 md:p-10 grid lg:grid-cols-5 gap-8">
          {/* Pricing options & Left Info */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex-grow space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Choose mode</div>
              {pricing.map((p, i) => (
                <motion.button
                  key={p.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left rounded-[1.75rem] p-4 sm:p-5 grid grid-cols-[auto_1fr_auto] items-center gap-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                    selected === i 
                      ? "bg-[#05443e] text-white shadow-xl" 
                      : "bg-white text-[#05443e] border border-sage/10 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className={`w-12 h-14 sm:w-14 sm:h-16 rounded-[1.25rem] grid place-items-center shrink-0 ${
                    selected === i ? "bg-white/20 text-white" : "bg-[#a8eed5] text-[#05443e]"
                  }`}>
                    <p.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col pr-2">
                    <div className="font-bold text-base sm:text-lg leading-tight">{p.title}</div>
                    <div className={`text-[11px] sm:text-xs mt-1 leading-snug ${
                      selected === i ? "text-white/80" : "text-[#05443e]/70"
                    }`}>{p.desc}</div>
                  </div>
                  <div className="font-serif text-2xl sm:text-3xl font-medium shrink-0 tracking-tight">₹{p.price}</div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="glass rounded-2xl p-5 border border-sage/10">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Payment Info</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Consultation fees are paid at the time of session via UPI or cash. Your booking confirmation will be sent on WhatsApp.
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-sage/20 to-mint/20 rounded-[2rem] blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative glass-strong rounded-2xl p-6 border border-sage/10 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage mb-2">Prefer to book by phone?</div>
                  <p className="text-[11px] text-muted-foreground mb-4">If you prefer a direct call for booking, please contact our assistant.</p>
                  <a 
                    href={`tel:${import.meta.env.VITE_ASSISTANT_PHONE_RAW}`}
                    className="inline-flex items-center gap-2 gradient-aqua text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <Phone className="size-3.5" />
                    Book via Call: {import.meta.env.VITE_ASSISTANT_NAME}
                  </a>
                  <div className="mt-2 text-[10px] font-medium text-sage-deep">{import.meta.env.VITE_ASSISTANT_PHONE}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Right Info */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex-grow space-y-5">
              {/* Name & Age */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <div className="relative mt-2 group">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-sage transition-colors" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter patient name"
                      className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Age</label>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Years"
                      className="w-full glass rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Gender & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Gender</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`py-3 rounded-xl text-xs font-semibold transition-all border ${
                          gender === g ? "gradient-aqua text-white border-transparent" : "glass border-border hover:bg-white/60"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <div className="relative mt-2 group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-sage transition-colors" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 ..."
                      className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Optional Category */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preferred Date</label>
                  <div className="relative mt-2 group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-sage transition-colors" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Category (Optional)</label>
                  <div className="relative mt-2 group">
                    <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-sage transition-colors pointer-events-none" />
                    <select
                      value={problemCategory}
                      onChange={(e) => setProblemCategory(e.target.value)}
                      className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-sage transition-all"
                    >
                      <option value="">Select Category (Optional)</option>
                      {problems.map((p) => <option key={p} value={p}>{p}</option>)}
                      {problemCategory && !problems.includes(problemCategory) && (
                        <option value={problemCategory}>{problemCategory}</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>

            {/* Emotional Vibe Map */}
            <div className="space-y-4">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                How are you feeling today? 
                <span className="text-[10px] lowercase font-normal italic opacity-70">(Tap to share your state)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Anxious", color: "from-amber-200/40 to-orange-200/10" },
                  { label: "Fatigued", color: "from-blue-200/40 to-indigo-200/10" },
                  { label: "Irritable", color: "from-red-200/40 to-rose-200/10" },
                  { label: "Restless", color: "from-purple-200/40 to-violet-200/10" },
                  { label: "Low Mood", color: "from-slate-300/40 to-gray-200/10" },
                  { label: "Stressed", color: "from-cyan-200/40 to-teal-200/10" }
                ].map((vibe) => (
                  <motion.button
                    key={vibe.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProblemCategory(vibe.label)}
                    className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                      problemCategory === vibe.label 
                        ? `bg-gradient-to-br ${vibe.color} border-sage text-sage-deep shadow-[0_0_15px_rgba(0,0,0,0.05)]` 
                        : "glass border-border hover:border-sage/30 text-muted-foreground"
                    }`}
                  >
                    {problemCategory === vibe.label && (
                      <motion.div 
                        layoutId="vibe-glow"
                        className={`absolute -inset-1 rounded-full bg-gradient-to-br ${vibe.color} blur-md opacity-50 -z-10`}
                      />
                    )}
                    {vibe.label}
                  </motion.button>
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                {problemCategory && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3.5 rounded-2xl bg-sage/5 border border-sage/10 text-[11px] leading-relaxed text-sage-deep italic"
                  >
                    <span className="font-bold not-italic mr-1">The Magic of Homeopathy:</span>
                    In Classical Homeopathy, your emotional state is a vital clue to your healing. 
                    Dr. Das will prioritize your <strong>{problemCategory}</strong> state in your consultation.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Problem Description */}
            <div className="flex flex-col flex-grow">
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Additional Details</label>
              <textarea
                value={problemDesc}
                onChange={(e) => setProblemDesc(e.target.value)}
                placeholder="Briefly describe any physical symptoms or history here..."
                className="w-full glass rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage transition-all mt-2 resize-none flex-grow min-h-[100px] md:min-h-[120px]"
              />
            </div>
          </div>

            <div className="mt-6 md:mt-8">
              <button
                onClick={handleWhatsAppBooking}
                disabled={isBooking || showSuccess}
                className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-4 md:py-5 rounded-full bg-whatsapp text-white font-bold shadow-elegant hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-90 disabled:scale-100"
              >
                <AnimatePresence mode="wait">
                  {isBooking ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="size-4 animate-spin" />
                      <span>Preparing WhatsApp...</span>
                    </motion.div>
                  ) : showSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="size-4" />
                      <span>Details Saved! Redirecting...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="size-4" />
                      <span>Consult on WhatsApp</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                {(isBooking || showSuccess) && (
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
