import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Activity, RotateCcw, Languages, HeartPulse, Droplet, Moon, Utensils, Brain, Clock, ShieldCheck, Weight } from "lucide-react";
import { Link } from "react-router-dom";

// --- Translations ---
const t = {
  en: {
    title: "Smart Health Calculators",
    description: "Personalized insights for your holistic wellness journey.",
    calculate: "Calculate",
    recalculate: "Reset",
    bmi: { title: "BMI Calculator", desc: "Check your Body Mass Index and health range.", weight: "Weight (kg)", height: "Height (cm)", result: "Your BMI" },
    water: { title: "Daily Water Intake", desc: "Calculate how much water your body needs daily.", weight: "Weight (kg)", activity: "Exercise (mins/day)", result: "Daily Target" },
    sleep: { title: "Sleep Calculator", desc: "Analyze your sleep cycle and improve sleep quality.", age: "Age (years)", result: "Recommended Sleep" },
    calorie: { title: "Calorie Need Estimator", desc: "Estimate your daily calorie needs based on your lifestyle.", gender: "Gender", male: "Male", female: "Female", result: "Maintenance Calories" },
    stress: { title: "Stress Score Checker", desc: "Evaluate your stress level and improve your mental wellness.", q1: "How often do you feel overwhelmed?", q2: "How poor is your sleep quality?", q3: "Physical tension or headaches?", sliderLow: "Never", sliderHigh: "Always", result: "Stress Level" },
    bedtime: { title: "Ideal Bedtime Calculator", desc: "Find your ideal bedtime for better sleep and energy.", wake: "Wake-up Time", hours: "Target Hours", result: "Go to bed at" }
  },
  bn: {
    title: "স্মার্ট হেলথ ক্যালকুলেটর",
    description: "আপনার সামগ্রিক সুস্থতার জন্য ব্যক্তিগতকৃত অন্তর্দৃষ্টি।",
    calculate: "হিসাব করুন",
    recalculate: "রিসেট করুন",
    bmi: { title: "বিএমআই ক্যালকুলেটর", desc: "আপনার বডি মাস ইনডেক্স এবং স্বাস্থ্য পরিসীমা পরীক্ষা করুন।", weight: "ওজন (কেজি)", height: "উচ্চতা (সেমি)", result: "আপনার বিএমআই" },
    water: { title: "দৈনিক পানির পরিমাণ", desc: "আপনার শরীরের দৈনিক কতটা পানি প্রয়োজন তা হিসাব করুন।", weight: "ওজন (কেজি)", activity: "ব্যায়াম (মিনিট/দিন)", result: "দৈনিক লক্ষ্য" },
    sleep: { title: "ঘুমের ক্যালকুলেটর", desc: "আপনার ঘুমের চক্র বিশ্লেষণ করুন এবং মান উন্নত করুন।", age: "বয়স (বছর)", result: "প্রস্তাবিত ঘুম" },
    calorie: { title: "ক্যালোরি অনুমানকারী", desc: "জীবনযাত্রার উপর ভিত্তি করে দৈনিক ক্যালোরির চাহিদা অনুমান করুন।", gender: "লিঙ্গ", male: "পুরুষ", female: "মহিলা", result: "প্রয়োজনীয় ক্যালোরি" },
    stress: { title: "স্ট্রেস চেকার", desc: "আপনার স্ট্রেস লেভেল মূল্যায়ন করুন এবং মানসিক সুস্থতা উন্নত করুন।", q1: "আপনি কতবার অভিভূত বোধ করেন?", q2: "আপনার ঘুমের মান কতটা খারাপ?", q3: "শারীরিক উত্তেজনা বা মাথাব্যথা?", sliderLow: "কখনও না", sliderHigh: "সবসময়", result: "স্ট্রেস লেভেল" },
    bedtime: { title: "আদর্শ ঘুমের সময়", desc: "উন্নত ঘুম এবং শক্তির জন্য আপনার আদর্শ ঘুমের সময় খুঁজুন।", wake: "ওঠার সময়", hours: "লক্ষ্য (ঘণ্টা)", result: "ঘুমাতে যান" }
  }
};

type Lang = "en" | "bn";

export default function SmartHealthCalculators() {
  const [lang, setLang] = useState<Lang>("en");
  const l = t[lang];

  const [activeCalc, setActiveCalc] = useState<string | null>(null);

  const calculators = [
    { id: "bmi", icon: Weight, title: l.bmi.title, desc: l.bmi.desc, bgClass: "bg-[#d1fae5]/50", iconClass: "text-[#059669]" },
    { id: "water", icon: Droplet, title: l.water.title, desc: l.water.desc, bgClass: "bg-[#dbeafe]/50", iconClass: "text-[#3b82f6] fill-current" },
    { id: "sleep", icon: Moon, title: l.sleep.title, desc: l.sleep.desc, bgClass: "bg-[#ede9fe]/50", iconClass: "text-[#8b5cf6] fill-current" },
    { id: "calorie", icon: Utensils, title: l.calorie.title, desc: l.calorie.desc, bgClass: "bg-[#fef3c7]/50", iconClass: "text-[#f59e0b] fill-current" },
    { id: "stress", icon: Brain, title: l.stress.title, desc: l.stress.desc, bgClass: "bg-[#ffe4e6]/50", iconClass: "text-[#f43f5e]" },
    { id: "bedtime", icon: Clock, title: l.bedtime.title, desc: l.bedtime.desc, bgClass: "bg-[#d1fae5]/50", iconClass: "text-[#10b981]" },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf9] relative font-sans selection:bg-[#68eed6] selection:text-[#05443e]">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#e0f5f0] to-[#f8faf9] -z-10" />

      {/* Header Utilities */}
      <header className="px-5 pt-6 pb-2 flex items-center justify-between max-w-md mx-auto relative z-10">
        <Link to="/" className="size-10 rounded-full bg-white shadow-sm text-[#05443e] flex items-center justify-center hover:scale-105 transition-transform">
          <ChevronLeft className="size-5" />
        </Link>
        <button 
          onClick={() => setLang(lang === "en" ? "bn" : "en")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm text-[#05443e] text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform"
        >
          <Languages className="size-3.5" />
          {lang === "en" ? "বাংলা" : "EN"}
        </button>
      </header>

      <div className="px-5 max-w-md mx-auto relative z-10 pb-20">
        
        {/* Title Section (Exact Screenshot Match) */}
        <div className="relative text-center mt-4 mb-10">
          <div className="absolute -top-6 left-0 size-16 bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex items-center justify-center">
            <HeartPulse className="size-8 text-[#059669]" />
          </div>
          
          <h1 className="text-[34px] leading-[1.1] font-serif mt-12">
            <span className="text-[#059669] font-medium block">Smart</span>
            <span className="text-[#0f172a] font-bold">Health Calculators</span>
          </h1>
          <p className="text-slate-500 text-[14px] leading-relaxed mt-4 max-w-[260px] mx-auto">
            {l.description}
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-5">
            <div className="h-1 w-8 bg-[#059669] rounded-full"></div>
            <div className="size-1 bg-[#059669]/30 rounded-full"></div>
          </div>
        </div>

        {/* Cards List */}
        <div className="grid gap-3.5">
          <AnimatePresence mode="popLayout">
            {calculators.map((calc) => (
              <motion.div
                layout
                key={calc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-50/50 ${activeCalc && activeCalc !== calc.id ? 'hidden' : 'block'}`}
              >
                {/* Collapsed State */}
                <div 
                  onClick={() => setActiveCalc(activeCalc === calc.id ? null : calc.id)}
                  className="p-4 flex items-center gap-4 cursor-pointer"
                >
                  <div className={`size-14 rounded-2xl ${calc.bgClass} flex items-center justify-center shrink-0`}>
                    <calc.icon className={`size-6 ${calc.iconClass}`} strokeWidth={calc.id === "stress" || calc.id === "bedtime" ? 2 : 1.5} />
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-[#0f172a] text-[15px] font-bold truncate tracking-tight">{calc.title}</h3>
                    <p className="text-[12px] text-slate-500 mt-0.5 leading-[1.3]">{calc.desc}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: activeCalc === calc.id ? 90 : 0 }}
                    className="size-[28px] rounded-full bg-[#f0fdf4] flex items-center justify-center shrink-0 text-[#059669]"
                  >
                    <ChevronRight className="size-4" strokeWidth={3} />
                  </motion.div>
                </div>

                {/* Expanded Calculator State */}
                <AnimatePresence>
                  {activeCalc === calc.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 pt-2 border-t border-slate-50"
                    >
                      {activeCalc === "bmi" && <BmiCalculator l={l} />}
                      {activeCalc === "water" && <WaterCalculator l={l} />}
                      {activeCalc === "sleep" && <SleepCalculator l={l} />}
                      {activeCalc === "calorie" && <CalorieCalculator l={l} />}
                      {activeCalc === "stress" && <StressCalculator l={l} />}
                      {activeCalc === "bedtime" && <BedtimeCalculator l={l} />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Pill */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 text-[11px] font-medium text-slate-500 tracking-wide">
            <ShieldCheck className="size-4 text-[#059669]" />
            Your health. Your insights. Your better tomorrow.
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// CALCULATOR COMPONENTS
// ==========================================

function InputGroup({ label, value, onChange, type = "number", placeholder = "" }: any) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/50 border border-sage/20 rounded-xl px-4 py-3 text-[#05443e] font-semibold focus:outline-none focus:ring-2 focus:ring-[#68eed6] focus:bg-white transition-all shadow-inner"
      />
    </div>
  );
}

function ActionButton({ onClick, text, isReset = false }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] ${
        isReset 
          ? "bg-white text-muted-foreground border border-sage/10 hover:bg-gray-50" 
          : "bg-[#05443e] text-white hover:bg-[#03302b]"
      }`}
    >
      {isReset ? <RotateCcw className="size-4" /> : <Activity className="size-4" />}
      {text}
    </button>
  );
}

function ResultCard({ title, value, subtext, color = "text-[#05443e]" }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-[#f0f9f6] to-white border border-[#68eed6]/20 shadow-lg relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#68eed6]/10 rounded-full blur-2xl -mr-10 -mt-10" />
      <div className="relative z-10 text-center">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{title}</h4>
        <div className={`text-4xl font-black tracking-tight mb-1 ${color}`}>{value}</div>
        <p className="text-sm font-medium text-[#05443e]/80">{subtext}</p>
      </div>
    </motion.div>
  );
}

// 1. BMI Calculator
function BmiCalculator({ l }: { l: any }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      setResult(parseFloat((w / (h * h)).toFixed(1)));
    }
  };

  const reset = () => { setResult(null); setWeight(""); setHeight(""); };

  let category = "";
  let color = "text-[#05443e]";
  if (result) {
    if (result < 18.5) { category = "Underweight"; color = "text-blue-500"; }
    else if (result < 25) { category = "Normal Weight"; color = "text-emerald-500"; }
    else if (result < 30) { category = "Overweight"; color = "text-orange-500"; }
    else { category = "Obese"; color = "text-red-500"; }
  }

  return (
    <div className="space-y-4 mt-2">
      <div className="flex gap-3">
        <InputGroup label={l.bmi.weight} value={weight} onChange={(e: any) => setWeight(e.target.value)} />
        <InputGroup label={l.bmi.height} value={height} onChange={(e: any) => setHeight(e.target.value)} />
      </div>
      {!result ? (
        <ActionButton text={l.calculate} onClick={calculate} />
      ) : (
        <>
          <ResultCard title={l.bmi.result} value={result} subtext={category} color={color} />
          <ActionButton text={l.recalculate} onClick={reset} isReset />
        </>
      )}
    </div>
  );
}

// 2. Water Calculator
function WaterCalculator({ l }: { l: any }) {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const a = parseFloat(activity) || 0;
    if (w > 0) {
      const liters = (w * 0.033) + (a / 30) * 0.35; // Basic formula
      setResult(parseFloat(liters.toFixed(1)));
    }
  };

  const reset = () => { setResult(null); setWeight(""); setActivity(""); };

  return (
    <div className="space-y-4 mt-2">
      <div className="flex gap-3">
        <InputGroup label={l.water.weight} value={weight} onChange={(e: any) => setWeight(e.target.value)} />
        <InputGroup label={l.water.activity} value={activity} onChange={(e: any) => setActivity(e.target.value)} />
      </div>
      {!result ? (
        <ActionButton text={l.calculate} onClick={calculate} />
      ) : (
        <>
          <ResultCard title={l.water.result} value={`${result} L`} subtext="Glasses: ~Math.round(result * 4)" />
          <ActionButton text={l.recalculate} onClick={reset} isReset />
        </>
      )}
    </div>
  );
}

// 3. Sleep Calculator
function SleepCalculator({ l }: { l: any }) {
  const [age, setAge] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const a = parseInt(age);
    if (a > 0) {
      if (a < 1) setResult("12-16 hrs");
      else if (a < 3) setResult("11-14 hrs");
      else if (a < 6) setResult("10-13 hrs");
      else if (a < 13) setResult("9-12 hrs");
      else if (a < 18) setResult("8-10 hrs");
      else if (a < 65) setResult("7-9 hrs");
      else setResult("7-8 hrs");
    }
  };

  const reset = () => { setResult(null); setAge(""); };

  return (
    <div className="space-y-4 mt-2">
      <InputGroup label={l.sleep.age} value={age} onChange={(e: any) => setAge(e.target.value)} />
      {!result ? (
        <ActionButton text={l.calculate} onClick={calculate} />
      ) : (
        <>
          <ResultCard title={l.sleep.result} value={result} subtext="Consistency is key for recovery." color="text-indigo-500" />
          <ActionButton text={l.recalculate} onClick={reset} isReset />
        </>
      )}
    </div>
  );
}

// 4. Calorie Calculator
function CalorieCalculator({ l }: { l: any }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"M"|"F">("M");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    if (w && h && a) {
      // Mifflin-St Jeor Equation
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      bmr += gender === "M" ? 5 : -161;
      setResult(Math.round(bmr * 1.2)); // Assuming sedentary multiplier
    }
  };

  const reset = () => { setResult(null); setWeight(""); setHeight(""); setAge(""); };

  return (
    <div className="space-y-4 mt-2">
      <div className="flex gap-2 p-1 bg-sage/5 rounded-xl border border-sage/10 mb-2">
        <button onClick={() => setGender("M")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${gender === "M" ? "bg-white shadow-sm text-[#05443e]" : "text-muted-foreground"}`}>{l.calorie.male}</button>
        <button onClick={() => setGender("F")} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${gender === "F" ? "bg-white shadow-sm text-[#05443e]" : "text-muted-foreground"}`}>{l.calorie.female}</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <InputGroup label="Weight (kg)" value={weight} onChange={(e: any) => setWeight(e.target.value)} />
        <InputGroup label="Height (cm)" value={height} onChange={(e: any) => setHeight(e.target.value)} />
      </div>
      <InputGroup label="Age" value={age} onChange={(e: any) => setAge(e.target.value)} />
      
      {!result ? (
        <ActionButton text={l.calculate} onClick={calculate} />
      ) : (
        <>
          <ResultCard title={l.calorie.result} value={`${result} kcal`} subtext="Daily energy expenditure" color="text-orange-500" />
          <ActionButton text={l.recalculate} onClick={reset} isReset />
        </>
      )}
    </div>
  );
}

// 5. Stress Calculator
function StressCalculator({ l }: { l: any }) {
  const [q1, setQ1] = useState(50);
  const [q2, setQ2] = useState(50);
  const [q3, setQ3] = useState(50);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const score = Math.round((q1 + q2 + q3) / 3);
    setResult(score);
  };

  const reset = () => { setResult(null); setQ1(50); setQ2(50); setQ3(50); };

  let category = "";
  let color = "text-emerald-500";
  if (result !== null) {
    if (result < 33) { category = "Low Stress - Great Job!"; color = "text-emerald-500"; }
    else if (result < 66) { category = "Moderate Stress - Take breaks"; color = "text-amber-500"; }
    else { category = "High Stress - Consider Consultation"; color = "text-red-500"; }
  }

  const Slider = ({ label, val, setVal }: any) => (
    <div className="space-y-2">
      <label className="text-xs font-medium text-[#05443e]">{label}</label>
      <input type="range" min="0" max="100" value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full accent-[#68eed6]" />
      <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase">
        <span>{l.stress.sliderLow}</span><span>{l.stress.sliderHigh}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 mt-2">
      <Slider label={l.stress.q1} val={q1} setVal={setQ1} />
      <Slider label={l.stress.q2} val={q2} setVal={setQ2} />
      <Slider label={l.stress.q3} val={q3} setVal={setQ3} />
      
      {!result ? (
        <ActionButton text={l.calculate} onClick={calculate} />
      ) : (
        <>
          <ResultCard title={l.stress.result} value={`${result}/100`} subtext={category} color={color} />
          <ActionButton text={l.recalculate} onClick={reset} isReset />
        </>
      )}
    </div>
  );
}

// 6. Ideal Bedtime
function BedtimeCalculator({ l }: { l: any }) {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [hours, setHours] = useState("8");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!wakeTime || !hours) return;
    const [h, m] = wakeTime.split(":").map(Number);
    let target = parseFloat(hours);
    
    // Add 15 mins to fall asleep
    target += 0.25; 
    
    let bedH = h - Math.floor(target);
    let bedM = m - Math.round((target % 1) * 60);
    
    if (bedM < 0) {
      bedM += 60;
      bedH -= 1;
    }
    if (bedH < 0) {
      bedH += 24;
    }
    
    const ampm = bedH >= 12 ? 'PM' : 'AM';
    const displayH = bedH % 12 || 12;
    const displayM = bedM.toString().padStart(2, '0');
    
    setResult(`${displayH}:${displayM} ${ampm}`);
  };

  const reset = () => { setResult(null); setWakeTime("07:00"); setHours("8"); };

  return (
    <div className="space-y-4 mt-2">
      <div className="flex gap-3">
        <InputGroup label={l.bedtime.wake} type="time" value={wakeTime} onChange={(e: any) => setWakeTime(e.target.value)} />
        <InputGroup label={l.bedtime.hours} type="number" value={hours} onChange={(e: any) => setHours(e.target.value)} />
      </div>
      
      {!result ? (
        <ActionButton text={l.calculate} onClick={calculate} />
      ) : (
        <>
          <ResultCard title={l.bedtime.result} value={result} subtext="Includes 15 min buffer to fall asleep" color="text-indigo-600" />
          <ActionButton text={l.recalculate} onClick={reset} isReset />
        </>
      )}
    </div>
  );
}
