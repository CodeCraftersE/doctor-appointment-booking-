import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  MessageCircle, 
  Copy, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw,
  User as UserIcon,
  Activity,
  Calendar,
  Sparkles
} from "lucide-react";
import { bodyAreas, type SymptomArea } from "@/lib/bodyData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function BodyAssessment() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [view, setView] = useState<"front" | "back">("front");
  const [selectedPart, setSelectedPart] = useState<SymptomArea | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState("A few days");

  const progress = (step / 3) * 100;

  const handlePartClick = (part: SymptomArea) => {
    if (selectedPart?.id === part.id) {
      setSelectedPart(null);
    } else {
      setSelectedPart(part);
      setSelectedSymptoms([]);
    }
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const generatedMessage = useMemo(() => {
    if (!selectedPart) return "";
    const symptomsStr = selectedSymptoms.length > 0 
      ? selectedSymptoms.join(", ").toLowerCase() 
      : "some symptoms";
    return `Hello ${import.meta.env.VITE_DOCTOR_NAME}, I'm experiencing ${symptomsStr} in my ${selectedPart.label.toLowerCase()} for ${duration.toLowerCase()}. The severity is ${severity}/10. I would like to consult with you.`;
  }, [selectedPart, selectedSymptoms, duration, severity]);

  const reset = () => {
    setStep(1);
    setSelectedPart(null);
    setSelectedSymptoms([]);
    setSeverity(5);
    setDuration("A few days");
  };

  const renderVisualizer = (isMobile: boolean) => (
    <div className={`relative flex flex-col items-center w-full ${isMobile ? "lg:hidden mt-8 mb-10" : "hidden lg:flex"}`}>
      {/* Controls */}
      <div className={`${isMobile ? "flex justify-center gap-4 mb-6" : "absolute top-8 right-8 flex flex-col gap-3 z-20"}`}>
        <div className="flex bg-sage/10 p-1 rounded-full border border-sage/20">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                gender === g ? "bg-white text-sage-deep shadow-sm" : "text-muted-foreground hover:text-sage-deep"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="flex bg-sage/10 p-1 rounded-full border border-sage/20">
          {(["front", "back"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                view === v ? "bg-white text-sage-deep shadow-sm" : "text-muted-foreground hover:text-sage-deep"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Body SVG */}
      <div className={`relative w-full ${isMobile ? "max-w-[320px] aspect-square bg-[#A5C3BE] rounded-[2rem] p-4 mx-auto" : "max-w-[450px] aspect-[1.1/1]"} flex-grow flex items-center justify-center overflow-hidden`}>
        <motion.div
          key={`${gender}-${view}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full h-full flex justify-center"
        >
          <svg viewBox="-150 -100 300 700" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD9C7"/>
                <stop offset="100%" stopColor="#F6BFA8"/>
              </linearGradient>
              <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7A3E20"/>
                <stop offset="100%" stopColor="#4A2412"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <g transform="translate(0,0)">
              {/* Head */}
              <ellipse cx="0" cy="0" rx="55" ry="65" className="fill-[url(#skin)]" />
              
              {/* Hair */}
              {view === "front" ? (
                <path d="M-50 -20 C-40 -70 40 -70 55 -10 C35 -30 10 -40 -15 -25 C-25 -15 -40 -10 -50 -20Z" fill="url(#hair)" />
              ) : (
                <path d="M-55 -15 C-40 -75 40 -75 55 -15 L55 10 Q0 -15 -55 10 Z" fill="url(#hair)" />
              )}

              {view === "front" && (
                <>
                  <ellipse cx="-18" cy="-5" rx="8" ry="10" fill="white" />
                  <ellipse cx="18" cy="-5" rx="8" ry="10" fill="white" />
                  <circle cx="-18" cy="-5" r="4" fill="#3B82F6" />
                  <circle cx="18" cy="-5" r="4" fill="#3B82F6" />
                  <path d="M-12 22 Q0 32 12 22" stroke="#D9776A" strokeWidth="3" strokeLinecap="round" fill="none" />
                </>
              )}

              {/* Neck */}
              <rect x="-12" y="55" width="24" height="28" rx="8" className="fill-[url(#skin)]" />
              
              {/* Torso */}
              <path d="M-65 90 Q0 65 65 90 L78 260 Q0 300 -78 260 Z" className="fill-[url(#skin)]" />
              
              {view === "front" && (
                <>
                  <circle cx="-28" cy="135" r="3" fill="#E78F8F" />
                  <circle cx="28" cy="135" r="3" fill="#E78F8F" />
                </>
              )}

              {/* Spine (Back View) */}
              {view === "back" && (
                <line x1="0" y1="110" x2="0" y2="255" stroke="#E19A8D" strokeWidth="4" strokeDasharray="6 6" />
              )}

              {/* Arms */}
              <rect x="-105" y="95" width="28" height="155" rx="18" className="fill-[url(#skin)]" transform="rotate(8 -105 95)" />
              <rect x="77" y="95" width="28" height="155" rx="18" className="fill-[url(#skin)]" transform="rotate(-8 77 95)" />
              
              {/* Hands */}
              <ellipse cx="-110" cy="265" rx="18" ry="22" className="fill-[url(#skin)]" />
              <ellipse cx="110" cy="265" rx="18" ry="22" className="fill-[url(#skin)]" />

              {/* Underwear */}
              <path d="M-45 250 Q0 285 45 250 L38 315 Q0 330 -38 315 Z" fill="#3BA9F4" />

              {/* Legs */}
              <rect x="-48" y="315" width="36" height="190" rx="20" className="fill-[url(#skin)]" />
              <rect x="12" y="315" width="36" height="190" rx="20" className="fill-[url(#skin)]" />

              {/* Knees (Front Only) */}
              {view === "front" && (
                <>
                  <circle cx="-30" cy="430" r="8" fill="#F0B19D" />
                  <circle cx="30" cy="430" r="8" fill="#F0B19D" />
                </>
              )}

              {/* Feet */}
              <ellipse cx="-30" cy="525" rx="28" ry="14" className="fill-[url(#skin)]" />
              <ellipse cx="30" cy="525" rx="28" ry="14" className="fill-[url(#skin)]" />

              {/* Active Hotspots */}
              {bodyAreas.map((area) => {
                const pos = view === "front" ? area.front : area.back;
                if (!pos) return null;
                const isActive = selectedPart?.id === area.id;

                return (
                  <g 
                    key={area.id} 
                    className="cursor-pointer group"
                    onClick={() => handlePartClick(area)}
                  >
                    <circle cx={pos.cx} cy={pos.cy} r="25" className="fill-transparent" />
                    
                    <motion.circle
                      cx={pos.cx} cy={pos.cy} r="8"
                      initial={false}
                      animate={{
                        scale: isActive ? 1.3 : 1,
                        fill: isActive ? "var(--color-sage)" : "var(--color-aqua)",
                        opacity: isActive ? 1 : 0.6
                      }}
                      className="transition-colors"
                      style={{ filter: isActive ? "url(#glow)" : "none" }}
                    />
                    <circle
                      cx={pos.cx} cy={pos.cy} r="16"
                      className={`fill-none ${isActive ? "stroke-sage animate-ripple" : "stroke-transparent group-hover:stroke-aqua/40"} stroke-2 transition-all`}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </motion.div>
      </div>

      <div className={`mt-8 flex items-center justify-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest ${isMobile ? "w-full bg-white rounded-full py-2 shadow-sm" : ""}`}>
        <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-sage-deep" /> Active Selection</div>
        <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#68eed6]" /> Available Hotspots</div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-soft mb-4"
          >
            <Activity className="size-4 text-sage" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage">Diagnostic Tool</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-sage-deep">
            Interactive <span className="italic text-gradient">Body Assessment</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto">
            Identify your pain areas and symptoms to help Dr. Das understand your constitution better.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            <span>Select Area</span>
            <span>Symptoms</span>
            <span>Summary</span>
          </div>
          <div className="h-1.5 w-full bg-sage/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full gradient-aqua"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Body Visualizer (Desktop Only) */}
          <div className="hidden lg:flex glass-strong rounded-[3rem] p-8 relative min-h-[600px] flex-col items-center">
            {renderVisualizer(false)}
          </div>

          {/* Right: Step Panel */}
          <div className="relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-strong rounded-[2.5rem] p-8 md:p-10 h-full flex flex-col justify-center text-center"
                >
                  <div className="size-[60px] rounded-2xl bg-[#68eed6] mx-auto mb-6 grid place-items-center shadow-sm">
                    <Activity className="size-8 text-[#05443e]" />
                  </div>
                  <h3 className="text-3xl font-serif text-[#05443e] mb-4">Identify the Area</h3>
                  <p className="text-muted-foreground text-[13px] mb-2 leading-relaxed max-w-[280px] mx-auto">
                    Please select the region on the body diagram where you are experiencing discomfort. This helps Dr. Das map your symptoms precisely.
                  </p>

                  {/* Inject Mobile Visualizer Here */}
                  {renderVisualizer(true)}

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
                    {bodyAreas.slice(0, 6).map((area) => {
                      const isActive = selectedPart?.id === area.id;
                      return (
                        <button
                          key={area.id}
                          onClick={() => handlePartClick(area)}
                          className={`p-3 md:p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border ${
                            isActive 
                              ? "bg-[#05443e] text-white border-transparent shadow-lg" 
                              : "glass bg-white text-[#05443e] hover:bg-white/80 border-sage/5"
                          }`}
                        >
                          <area.icon className={`size-5 md:size-6 ${isActive ? "text-[#68eed6]" : "text-[#05443e]"}`} strokeWidth={isActive ? 2.5 : 2} />
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{area.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedPart}
                    className="w-full flex items-center justify-center gap-3 bg-[#05443e] text-white py-4 rounded-xl text-[14px] font-bold shadow-md hover:bg-[#03302b] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next: Describe Symptoms <ArrowRight className="size-4" strokeWidth={2.5} />
                  </button>
                </motion.div>
              )}

              {step === 2 && selectedPart && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-strong rounded-[2.5rem] p-8 md:p-10 h-full"
                >
                  <button 
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-sage transition-colors mb-6"
                  >
                    <ArrowLeft className="size-3" /> Change Area
                  </button>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="size-14 rounded-2xl gradient-aqua grid place-items-center text-white">
                      <selectedPart.icon className="size-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-sage-deep">{selectedPart.label}</h3>
                      <p className="text-xs text-muted-foreground">Select all that apply</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {selectedPart.symptoms.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSymptom(s)}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border ${
                          selectedSymptoms.includes(s) 
                            ? "gradient-deep text-white border-transparent shadow-lg" 
                            : "glass border-sage/10 hover:bg-white/60 text-muted-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-8">
                    {/* Severity */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Pain Severity</label>
                        <span className="text-sm font-bold text-sage-deep">{severity}/10</span>
                      </div>
                      <input 
                        type="range" min="1" max="10" 
                        value={severity} 
                        onChange={(e) => setSeverity(parseInt(e.target.value))}
                        className="w-full accent-sage h-1.5 bg-sage/10 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Duration */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Problem Duration</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["A few days", "1-2 weeks", "Months", "Chronic"].map((d) => (
                          <button
                            key={d}
                            onClick={() => setDuration(d)}
                            className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                              duration === d ? "bg-sage-deep text-white border-transparent" : "glass border-sage/10 hover:bg-white/60 text-muted-foreground"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <button
                      onClick={() => setStep(3)}
                      disabled={selectedSymptoms.length === 0}
                      className="group inline-flex items-center gap-3 gradient-deep text-white px-8 py-4 rounded-full text-sm font-bold shadow-elegant hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                    >
                      Continue
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && selectedPart && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="glass-strong rounded-[2.5rem] p-8 md:p-10 h-full flex flex-col"
                >
                  <div className="flex-grow">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/20 text-mint-700 text-[10px] font-bold uppercase tracking-widest mb-6">
                      <CheckCircle2 className="size-3" /> Assessment Complete
                    </div>
                    
                    <h3 className="text-3xl font-serif text-sage-deep mb-6">Consultation <span className="italic text-gradient">Summary</span></h3>
                    
                    <div className="glass rounded-[2rem] p-6 border border-sage/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="size-12" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Message Preview</div>
                      <p className="text-sm text-sage-deep leading-relaxed italic pr-8">
                        "{generatedMessage}"
                      </p>
                      
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(generatedMessage);
                          alert("Message copied to clipboard!");
                        }}
                        className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sage hover:text-sage-deep transition-colors"
                      >
                        <Copy className="size-3" /> Copy Text
                      </button>
                    </div>

                    <div className="mt-8 p-5 rounded-2xl bg-amber-50/50 border border-amber-200/50 flex gap-4">
                      <div className="size-10 rounded-xl bg-amber-100 grid place-items-center text-amber-600 shrink-0">
                        <AlertCircle className="size-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-amber-800">Recommendation</div>
                        <p className="text-[11px] text-amber-700 leading-relaxed">
                          Based on your symptoms and severity ({severity}/10), a professional constitutional analysis is highly recommended to address the root cause.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 space-y-3">
                    <a
                      href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(generatedMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 gradient-deep text-white px-8 py-5 rounded-full text-base font-bold shadow-elegant hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <MessageCircle className="size-5" />
                      Consult {import.meta.env.VITE_DOCTOR_NAME}
                    </a>
                    <button
                      onClick={reset}
                      className="w-full inline-flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-sage transition-all py-2"
                    >
                      <RotateCcw className="size-3" /> Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
