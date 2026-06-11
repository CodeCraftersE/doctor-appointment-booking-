import { motion, AnimatePresence } from "framer-motion";
import { Video, Phone, MapPin, MessageCircle, Calendar, Loader2, Check, Thermometer, UserCircle, Home, Mail, Send, ShieldCheck, ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { sendBookingEmail } from "@/services/brevo";

const pricing = [
  { icon: Video, title: "Video Consultation", price: 500, desc: "Face-to-face online visit" },
  { icon: MapPin, title: "Chamber Visit", price: 300, desc: "Inc. 7–10 days medicine" },
  { icon: Home, title: "Home Visit", price: 800, desc: "Doctor visits your residence" },
];

const problems = [
  "Skin Problems", "Digestive Issues", "Stress & Anxiety", "Immunity Boost",
  "Chronic Disease", "Hormonal Balance", "Hair Problem", "Other",
];

type BookingStatus = "idle" | "loading" | "success" | "error";

export function Booking() {
  const [selected, setSelected] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [problemDesc, setProblemDesc] = useState("");
  const [problemCategory, setProblemCategory] = useState("");
  const [date, setDate] = useState<Date>();
  const [chamber, setChamber] = useState<string>("");
  const [phone, setPhone] = useState("");

  // WhatsApp states
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Email booking states
  const [emailStatus, setEmailStatus] = useState<BookingStatus>("idle");
  const [emailError, setEmailError] = useState("");
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const chambers = [
    { id: "dishari", name: import.meta.env.VITE_CHAMBER_1_NAME || "Dishari", days: [2, 4, 6] },
    { id: "new-homoeo", name: import.meta.env.VITE_CHAMBER_2_NAME || "The New Homoeo Clinic", days: [1, 3, 5, 0] }
  ];

  const disabledDays = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d < today) return true;
    
    if (pricing[selected].title === "Chamber Visit" && chamber) {
      const selectedChamber = chambers.find(c => c.id === chamber);
      if (selectedChamber && !selectedChamber.days.includes(d.getDay())) {
        return true;
      }
    }
    return false;
  };

  // Hahnemann Quotes State
  const [quoteIndex, setQuoteIndex] = useState(0);

  const hahnemannQuotes = [
    "The highest ideal of cure is rapid, gentle and permanent restoration of the health.",
    "There are no diseases, but sick people.",
    "The physician's high and only mission is to restore the sick to health, to cure.",
    "In the healthy condition of man, the spiritual vital force rules with unbounded sway."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % hahnemannQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
    `- Mode: ${pricing[selected].title === "Chamber Visit" ? `Chamber Visit (${chambers.find(c=>c.id===chamber)?.name || "Not selected"})` : pricing[selected].title}\n` +
    `- Contact: ${phone || "Not provided"}\n` +
    `- Email: ${email || "Not provided"}\n\n` +
    `*Problem Category:* ${problemCategory || "General Consultation"}\n` +
    `*Description:* ${problemDesc || "Will discuss with doctor"}\n` +
    `*Preferred Date:* ${date ? format(date, "PPP") : "ASAP"}`
  );

  const handleWhatsAppBooking = () => {
    if (!name || !phone) {
      alert("Please enter at least your Name and Phone number.");
      return;
    }
    if (pricing[selected].title === "Chamber Visit" && !chamber) {
      alert("Please select a chamber for your visit.");
      return;
    }
    
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setShowSuccess(true);
      setTimeout(() => {
        window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
        setShowSuccess(false);
      }, 1500);
    }, 1200);
  };

  const handleEmailBooking = async () => {
    // Validate mandatory fields
    if (!name.trim()) {
      setEmailError("Please enter your name.");
      setEmailStatus("error");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      setEmailStatus("error");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setEmailError("Please enter a valid phone number.");
      setEmailStatus("error");
      return;
    }
    if (pricing[selected].title === "Chamber Visit" && !chamber) {
      setEmailError("Please select a chamber for your visit.");
      setEmailStatus("error");
      return;
    }

    setEmailStatus("loading");
    setEmailError("");

    const result = await sendBookingEmail({
      name: name.trim(),
      age,
      gender,
      email: email.trim(),
      phone: phone.trim(),
      mode: pricing[selected].title === "Chamber Visit" ? `Chamber Visit (${chambers.find(c=>c.id===chamber)?.name || ""})` : pricing[selected].title,
      price: pricing[selected].price,
      category: problemCategory,
      description: problemDesc,
      preferredDate: date ? format(date, "yyyy-MM-dd") : "",
    });

    if (result.success) {
      setEmailStatus("success");
      setShowEmailConfirmation(true);
      // Reset after showing confirmation
      setTimeout(() => {
        setEmailStatus("idle");
      }, 4000);
    } else {
      setEmailStatus("error");
      setEmailError(result.error || "Something went wrong. Please try again.");
    }
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
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Book directly on our website with email confirmation, or connect instantly via WhatsApp — your choice.</p>
        </div>

        <div className="glass-strong rounded-[2.5rem] p-6 md:p-10 grid lg:grid-cols-5 gap-8">
          {/* Pricing options & Left Info */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <div className="space-y-3">
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

            {/* Chamber Selection if Chamber Visit is selected */}
            <AnimatePresence>
              {pricing[selected].title === "Chamber Visit" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-1 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Select Chamber</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {chambers.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setChamber(c.id)}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            chamber === c.id 
                              ? "bg-[#05443e] text-white border-transparent shadow-md" 
                              : "glass border-sage/20 text-[#05443e] hover:bg-white hover:border-sage/40"
                          }`}
                        >
                          <div className="font-bold text-sm leading-tight">{c.name}</div>
                          <div className="text-[10px] mt-1 opacity-80">
                            {c.days.map(d => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]).join(", ")}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hahnemann Quotes - Centered in remaining space */}
            <div className="flex-grow flex items-center justify-center py-8 hidden lg:flex">
              <div className="relative text-center px-6 max-w-xs">
                <span className="absolute -top-4 -left-2 text-6xl text-sage/20 font-serif leading-none">"</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 text-[15px] font-serif text-sage-deep/80 italic leading-relaxed"
                  >
                    {hahnemannQuotes[quoteIndex]}
                  </motion.p>
                </AnimatePresence>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-px w-6 bg-sage/30"></div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-sage">Dr. Samuel Hahnemann</p>
                  <div className="h-px w-6 bg-sage/30"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 space-y-4">
              <div className="glass rounded-2xl p-5 border border-sage/10">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Payment Info</div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Consultation fees are paid at the time of session via UPI or cash. Your booking confirmation will be sent via email or WhatsApp.
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

              {/* Email & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    Email Address
                    <span className="text-[9px] font-bold text-sage bg-sage/10 px-1.5 py-0.5 rounded-full normal-case tracking-normal">For direct booking only</span>
                  </label>
                  <div className="relative mt-2 group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-sage transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (emailStatus === "error") setEmailStatus("idle"); }}
                      placeholder="your@email.com"
                      className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <div className="relative mt-2 group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-sage transition-colors" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); if (emailStatus === "error") setEmailStatus("idle"); }}
                      placeholder="+91 ..."
                      className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Gender & Date */}
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
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preferred Date</label>
                  <div className="relative mt-2 group">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-full glass rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage transition-all text-left flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-sage transition-colors" />
                            <span className={!date ? "text-muted-foreground" : "text-[#05443e]"}>
                              {date ? format(date, "PPP") : "Select date"}
                            </span>
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-[100]" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={disabledDays}
                          initialFocus
                          className="bg-white rounded-xl border border-sage/20 shadow-lg"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Category */}
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

            {/* === DUAL BOOKING CTA === */}
            <div className="mt-6 md:mt-8 space-y-4">
              {/* Error message */}
              <AnimatePresence>
                {emailStatus === "error" && emailError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700"
                  >
                    <X className="size-4 shrink-0" />
                    <span className="text-sm font-medium">{emailError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Primary: Direct Website Booking (Email + Phone mandatory) */}
              <div className="space-y-2">
                <button
                  onClick={handleEmailBooking}
                  disabled={emailStatus === "loading" || emailStatus === "success"}
                  className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-4 md:py-5 rounded-full gradient-deep text-primary-foreground font-bold shadow-elegant hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-90 disabled:scale-100"
                >
                  <AnimatePresence mode="wait">
                    {emailStatus === "loading" ? (
                      <motion.div
                        key="email-loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="size-4 animate-spin" />
                        <span>Confirming Your Booking...</span>
                      </motion.div>
                    ) : emailStatus === "success" ? (
                      <motion.div
                        key="email-success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="size-4" />
                        <span>Booking Confirmed! Check your email</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="email-default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Send className="size-4" />
                        <span>Book Consultation</span>
                        <ArrowRight className="size-4 ml-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {emailStatus === "loading" && (
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  )}
                </button>
                <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1.5">
                  <Mail className="size-3" />
                  Direct booking · Email & phone required · Instant email confirmation
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-sage/10" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-sage/10" />
              </div>

              {/* Secondary: WhatsApp Booking (Name + Phone only, no email needed) */}
              <div className="space-y-2">
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
                        <span>Book via WhatsApp</span>
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
                <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1.5">
                  <MessageCircle className="size-3" />
                  Chat booking · Only name & phone needed · No email required
                </p>
              </div>

              {/* Trust badge */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <ShieldCheck className="size-3.5 text-sage/60" />
                <span className="text-[10px] text-muted-foreground">Your information is secure and never shared with third parties.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Email Booking Success Overlay === */}
      <AnimatePresence>
        {showEmailConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={() => setShowEmailConfirmation(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-[2.5rem] p-8 md:p-12 max-w-md w-full text-center relative overflow-hidden"
            >
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-aqua/10 via-transparent to-mint/10 opacity-60" />

              <div className="relative z-10">
                {/* Animated check */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full gradient-deep mx-auto mb-6 flex items-center justify-center shadow-glow"
                >
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Check className="size-10 text-white" strokeWidth={3} />
                  </motion.div>
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-serif text-sage-deep mb-3">
                  Booking <span className="italic text-gradient">Confirmed!</span>
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  A confirmation email has been sent to <strong className="text-sage-deep">{email}</strong>. 
                  Our clinic assistant will contact you within 2-4 hours to finalize the appointment.
                </p>

                <div className="glass rounded-2xl p-4 mb-6 text-left">
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <span className="text-muted-foreground font-semibold uppercase tracking-wider">Mode</span>
                    <span className="text-sage-deep font-bold text-right">{pricing[selected].title}</span>
                    <span className="text-muted-foreground font-semibold uppercase tracking-wider">Date</span>
                    <span className="text-sage-deep font-bold text-right">{date ? new Date(date).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }) : "ASAP"}</span>
                    <span className="text-muted-foreground font-semibold uppercase tracking-wider">Fee</span>
                    <span className="text-sage-deep font-bold text-right">₹{pricing[selected].price}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowEmailConfirmation(false)}
                  className="w-full inline-flex items-center justify-center gap-2 gradient-aqua text-white px-6 py-4 rounded-full text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
