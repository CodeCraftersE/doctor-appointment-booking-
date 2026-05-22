import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Moon, 
  Droplets, 
  Zap, 
  Activity, 
  Monitor, 
  Smile, 
  ArrowRight, 
  RefreshCcw,
  Sparkles,
  Info,
  Loader2
} from "lucide-react";

export const Route = createFileRoute("/wellness-score")({
  component: WellnessScorePage,
});

function WellnessScorePage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    sleep: 7,
    water: 8,
    stress: 5,
    exercise: 3,
    screenTime: 6,
    mood: "Good"
  });
  const [result, setResult] = useState<{ score: number; suggestions: string[] } | null>(null);

  const [isCalculating, setIsCalculating] = useState(false);

  const calculateScore = () => {
    setIsCalculating(true);
    
    // Simulate deep analysis
    setTimeout(() => {
      let score = 0;
      const suggestions: string[] = [];

      // Sleep
      if (data.sleep >= 7 && data.sleep <= 9) score += 20;
      else if (data.sleep >= 6) score += 10;
      else suggestions.push("Your sleep duration is below the recommended 7-9 hours for optimal recovery.");

      // Water
      if (data.water >= 8) score += 15;
      else if (data.water >= 5) score += 7;
      else suggestions.push("Hydration is key to metabolic health. Try increasing your daily water intake.");

      // Stress
      if (data.stress <= 3) score += 20;
      else if (data.stress <= 6) score += 10;
      else suggestions.push("High stress levels can impact your immune system. Consider mindful breathing or meditation.");

      // Exercise
      if (data.exercise >= 4) score += 15;
      else if (data.exercise >= 2) score += 8;
      else suggestions.push("Regular movement boosts vital energy. Aim for at least 30 mins of activity 3 times a week.");

      // Screen Time
      if (data.screenTime <= 4) score += 15;
      else if (data.screenTime <= 7) score += 7;
      else suggestions.push("Reducing screen time, especially before bed, helps regulate your circadian rhythm.");

      // Mood
      if (["Excellent", "Good"].includes(data.mood)) score += 15;
      else if (data.mood === "Neutral") score += 7;
      else suggestions.push("Emotional well-being is a core pillar of health. Classical Homeopathy can help balance your mood.");

      setResult({ score, suggestions });
      setIsCalculating(false);
      setStep(1);
    }, 1500);
  };

  const reset = () => {
    setStep(0);
    setResult(null);
  };

  return (
    <main className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-8 max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-soft mb-4"
          >
            <Sparkles className="size-4 text-sage" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage">Interactive Assessment</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif text-sage-deep">
            Your <span className="italic text-gradient">Wellness Score</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-sm md:text-base">
            Analyze your daily habits through the lens of classical wellness.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-strong rounded-[2.5rem] p-6 md:p-12 space-y-10"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Sleep */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Moon className="size-4 text-sage" /> Sleep Hours
                    </label>
                    <span className="font-serif text-xl text-sage-deep">{data.sleep}h</span>
                  </div>
                  <input 
                    type="range" min="0" max="12" step="1" 
                    value={data.sleep} 
                    onChange={(e) => setData({...data, sleep: parseInt(e.target.value)})}
                    className="w-full accent-sage h-1.5 bg-sage/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Restless</span>
                    <span>Optimal (7-9h)</span>
                    <span>Oversleep</span>
                  </div>
                </div>

                {/* Water */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Droplets className="size-4 text-sage" /> Water Intake
                    </label>
                    <span className="font-serif text-xl text-sage-deep">{data.water} glasses</span>
                  </div>
                  <input 
                    type="range" min="0" max="15" step="1" 
                    value={data.water} 
                    onChange={(e) => setData({...data, water: parseInt(e.target.value)})}
                    className="w-full accent-sage h-1.5 bg-sage/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Dehydrated</span>
                    <span>Healthy (8+)</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Stress */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Zap className="size-4 text-sage" /> Stress Level
                    </label>
                    <span className="font-serif text-xl text-sage-deep">{data.stress}/10</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1" 
                    value={data.stress} 
                    onChange={(e) => setData({...data, stress: parseInt(e.target.value)})}
                    className="w-full accent-sage h-1.5 bg-sage/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Zen</span>
                    <span>Manageable</span>
                    <span>Overwhelmed</span>
                  </div>
                </div>

                {/* Exercise */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Activity className="size-4 text-sage" /> Weekly Exercise
                    </label>
                    <span className="font-serif text-xl text-sage-deep">{data.exercise} hours</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.5" 
                    value={data.exercise} 
                    onChange={(e) => setData({...data, exercise: parseFloat(e.target.value)})}
                    className="w-full accent-sage h-1.5 bg-sage/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Sedentary</span>
                    <span>Active (3+)</span>
                    <span>Athletic</span>
                  </div>
                </div>

                {/* Screen Time */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Monitor className="size-4 text-sage" /> Screen Time
                    </label>
                    <span className="font-serif text-xl text-sage-deep">{data.screenTime}h</span>
                  </div>
                  <input 
                    type="range" min="0" max="12" step="1" 
                    value={data.screenTime} 
                    onChange={(e) => setData({...data, screenTime: parseInt(e.target.value)})}
                    className="w-full accent-sage h-1.5 bg-sage/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Digital Detox</span>
                    <span>Standard</span>
                    <span>Heavy Usage</span>
                  </div>
                </div>

                {/* Mood */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Smile className="size-4 text-sage" /> Overall Mood
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Excellent", "Good", "Neutral", "Low"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setData({...data, mood: m})}
                        className={`py-3 rounded-2xl text-xs font-semibold transition-all border ${
                          data.mood === m ? "gradient-aqua text-white border-transparent shadow-lg scale-[1.02]" : "glass border-border hover:bg-white/60"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-sage/10 flex justify-center">
                <button
                  onClick={calculateScore}
                  disabled={isCalculating}
                  className="group relative inline-flex items-center gap-3 gradient-deep text-primary-foreground px-10 py-5 rounded-full text-base font-bold shadow-elegant hover:scale-105 active:scale-95 transition-all overflow-hidden disabled:opacity-70 disabled:scale-100"
                >
                  {isCalculating ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <Loader2 className="size-5 animate-spin" />
                      <span>Analyzing Vitals...</span>
                    </motion.div>
                  ) : (
                    <>
                      <span className="relative z-10">Calculate My Score</span>
                      <ArrowRight className="size-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              {/* Score Display */}
              <div className="glass-strong rounded-[2.5rem] p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-aqua/10 to-transparent opacity-50" />
                
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-2">Calculated Wellness Index</div>
                  <div className="relative inline-block">
                    <svg className="size-48 md:size-56 transform -rotate-90">
                      <circle
                        cx="50%" cy="50%" r="46%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-sage/10"
                      />
                      <motion.circle
                        cx="50%" cy="50%" r="46%"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        strokeDasharray="100 100"
                        strokeDashoffset={100 - (result?.score || 0)}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: 100 - (result?.score || 0) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--aqua)" />
                          <stop offset="100%" stopColor="var(--sage)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-6xl md:text-7xl font-serif text-sage-deep"
                      >
                        {result?.score}
                      </motion.span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">out of 100</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-2xl font-serif text-sage-deep">
                      {result?.score && result.score > 80 ? "Radiant Health" : result?.score && result.score > 60 ? "Moving Toward Balance" : "In Need of Care"}
                    </h3>
                    <p className="mt-2 text-muted-foreground max-w-sm mx-auto text-sm">
                      Your current habits show {result?.score && result.score > 60 ? "great potential for further optimization." : "significant areas where Classical Homeopathy can restore balance."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2 flex items-center gap-2">
                    <Info className="size-4" /> Personalized Insights
                  </h4>
                  {result?.suggestions.length ? (
                    result.suggestions.map((s, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="glass p-5 rounded-[1.5rem] border-l-4 border-sage/40"
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed italic">{s}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="glass p-5 rounded-[1.5rem] border-l-4 border-mint">
                      <p className="text-sm text-sage-deep font-medium">Your current habits are excellent. Focus on maintaining this constitutional balance.</p>
                    </div>
                  )}
                </div>

                <div className="glass-strong rounded-[2rem] p-8 bg-sage/5 border-sage/10 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-sage mb-2">Doctor's Recommendation</div>
                    <p className="text-sm text-sage-deep leading-relaxed font-medium">
                      A high score reflects current habits, but long-term wellness depends on your internal **Vital Force**. Dr. Sandip Das can help you anchor these results through constitutional treatment.
                    </p>
                  </div>
                  <div className="mt-8 space-y-3">
                    <Link
                      to="/"
                      hash="booking"
                      className="w-full inline-flex items-center justify-center gap-2 gradient-aqua text-white px-6 py-4 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-all"
                    >
                      Book Constitutional Consultation
                    </Link>
                    <button
                      onClick={reset}
                      className="w-full inline-flex items-center justify-center gap-2 glass px-6 py-4 rounded-full text-sm font-bold text-muted-foreground hover:text-sage transition-all"
                    >
                      <RefreshCcw className="size-4" /> Re-take Assessment
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
