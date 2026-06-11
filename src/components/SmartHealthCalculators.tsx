import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Activity, RotateCcw, Languages, HeartPulse, Droplet, Moon, Utensils, Brain, Clock, ShieldCheck, Weight, X } from "lucide-react";
import { Link } from "react-router-dom";

// --- Translations ---
const t = {
  en: {
    title: "Smart Health Calculators",
    description: "Personalized insights for your holistic wellness journey.",
    calculate: "Calculate",
    recalculate: "Reset",
    bmi: { title: "BMI Calculator", desc: "Understand your body composition in harmony with your nature.", weight: "Weight (kg)", height: "Height (cm)", result: "Your BMI" },
    water: { title: "Daily Water Intake", desc: "Calculate your hydration needs for vital flow and cellular clarity.", weight: "Weight (kg)", activity: "Exercise (mins/day)", result: "Daily Target" },
    sleep: { title: "Sleep Calculator", desc: "Find the perfect rhythm for restorative rest and deep healing.", age: "Age (years)", result: "Recommended Sleep" },
    calorie: { title: "Calorie Need Estimator", desc: "Balance your energy intake for holistic vitality and daily strength.", gender: "Gender", male: "Male", female: "Female", result: "Maintenance Calories" },
    stress: { title: "Stress Score Checker", desc: "Assess your inner peace and emotional equilibrium today.", q1: "How often do you feel overwhelmed?", q2: "How poor is your sleep quality?", q3: "Physical tension or headaches?", sliderLow: "Never", sliderHigh: "Always", result: "Stress Level" },
    bedtime: { title: "Ideal Bedtime Calculator", desc: "Align your sleep cycle with the natural world's circadian flow.", wake: "Wake-up Time", hours: "Target Hours", result: "Go to bed at" }
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

  useEffect(() => {
    if (activeCalc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeCalc]);

  const calculators = [
    { id: "bmi", icon: Weight, title: l.bmi.title, desc: l.bmi.desc, bgClass: "bg-[#e2f5ec]", iconClass: "text-[#4a654d]", action: "Measure Equilibrium" },
    { id: "water", icon: Droplet, title: l.water.title, desc: l.water.desc, bgClass: "bg-[#e2eff5]", iconClass: "text-[#4a5a65] fill-current", action: "Calibrate Flow" },
    { id: "sleep", icon: Moon, title: l.sleep.title, desc: l.sleep.desc, bgClass: "bg-[#edeef2]", iconClass: "text-[#4b4e63] fill-current", action: "Find Rhythm" },
    { id: "calorie", icon: Utensils, title: l.calorie.title, desc: l.calorie.desc, bgClass: "bg-[#f5f1e2]", iconClass: "text-[#655e4a] fill-current", action: "Balance Energy" },
    { id: "stress", icon: Brain, title: l.stress.title, desc: l.stress.desc, bgClass: "bg-[#f5e2e4]", iconClass: "text-[#654a4f]", action: "Check Peace" },
    { id: "bedtime", icon: Clock, title: l.bedtime.title, desc: l.bedtime.desc, bgClass: "bg-[#e2f5ec]", iconClass: "text-[#4a654d]", action: "Align Cycle" },
  ];

  const activeCalcData = calculators.find(c => c.id === activeCalc);

  return (
    <div className="min-h-screen bg-[#f8faf9] relative font-sans selection:bg-[#68eed6] selection:text-[#05443e] overflow-x-hidden">
      
      {/* Background Gradients (Ethereal feel) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] bg-[#b1ceb1]/20 rounded-full blur-[80px]" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-[#dde5d9]/30 rounded-full blur-[100px]" />
      </div>

      {/* Header Utilities */}
      <header className="px-5 pt-6 pb-2 flex items-center justify-between max-w-6xl mx-auto relative z-10">
        <Link to="/" className="size-10 rounded-full bg-white/80 backdrop-blur border border-white/50 shadow-sm text-[#05443e] flex items-center justify-center hover:scale-105 transition-transform">
          <ChevronLeft className="size-5" />
        </Link>
        <button 
          onClick={() => setLang(lang === "en" ? "bn" : "en")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-white/50 shadow-sm text-[#05443e] text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform"
        >
          <Languages className="size-3.5" />
          {lang === "en" ? "বাংলা" : "EN"}
        </button>
      </header>

      <div className="px-5 max-w-6xl mx-auto relative z-10 pb-24">
        
        {/* Title Section */}
        <div className="relative text-center mt-8 md:mt-12 mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e2f5ec] text-[#334d36] text-[12px] font-semibold mb-6 shadow-sm border border-[#b1ceb1]/30">
            <HeartPulse className="size-4" />
            Holistic Clinical Tools
          </div>
          
          <h1 className="text-[36px] md:text-[56px] leading-[1.1] font-serif text-[#47614a]">
            Nurture Your Well-being with <br className="hidden md:block"/>
            <span className="italic">Smart Health Tools</span>
          </h1>
          <p className="text-slate-500 text-[15px] md:text-[18px] leading-relaxed mt-6 max-w-2xl mx-auto">
            {l.description}
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-8">
            <div className="h-1 w-8 bg-[#47614a] rounded-full"></div>
            <div className="size-1 bg-[#47614a]/30 rounded-full"></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {calculators.map((calc) => (
            <motion.div
              key={calc.id}
              whileHover={{ y: -5 }}
              onClick={() => setActiveCalc(calc.id)}
              className="group cursor-pointer bg-white/70 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[32px] shadow-[0_8px_30px_rgba(95,122,97,0.06)] hover:shadow-[0_20px_50px_rgba(95,122,97,0.12)] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Card Background Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${calc.bgClass} opacity-50 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-80`} />

              <div className={`w-16 h-16 rounded-full ${calc.bgClass} border border-white/50 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                <calc.icon className={`size-7 ${calc.iconClass}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-[#191c1b] text-[20px] md:text-[22px] font-serif font-medium mb-3 leading-tight">{calc.title}</h3>
              <p className="text-[14px] md:text-[15px] text-[#596057] mb-8 leading-relaxed max-w-xs">{calc.desc}</p>
              
              <div className="mt-auto flex items-center justify-center gap-2 text-[#47614a] text-[14px] font-semibold tracking-wide uppercase group-hover:gap-3 transition-all duration-300">
                {calc.action} <ChevronRight className="size-4" strokeWidth={2.5} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Pill */}
        <div className="mt-16 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/80 backdrop-blur rounded-full shadow-sm border border-[#e1e3e1] text-[12px] font-semibold text-[#596057] tracking-wider uppercase">
            <ShieldCheck className="size-4 text-[#47614a]" />
            Your health. Your insights. Your better tomorrow.
          </div>
        </div>

      </div>

      {/* Modal Overlay for Active Calculator */}
      <AnimatePresence>
        {activeCalc && activeCalcData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-[#f8faf9]/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveCalc(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-[32px] shadow-[0_30px_80px_rgba(71,97,74,0.15)] border border-[#e1e3e1] relative overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className={`px-6 py-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-white to-${activeCalcData.bgClass.replace('bg-', '')}/30`}>
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-full ${activeCalcData.bgClass} flex items-center justify-center`}>
                    <activeCalcData.icon className={`size-5 ${activeCalcData.iconClass}`} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-serif font-medium text-[#191c1b] text-lg leading-tight">{activeCalcData.title}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveCalc(null)}
                  className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {activeCalc === "bmi" && <BmiCalculator l={l} />}
                {activeCalc === "water" && <WaterCalculator l={l} />}
                {activeCalc === "sleep" && <SleepCalculator l={l} />}
                {activeCalc === "calorie" && <CalorieCalculator l={l} />}
                {activeCalc === "stress" && <StressCalculator l={l} />}
                {activeCalc === "bedtime" && <BedtimeCalculator l={l} />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ==========================================
// CALCULATOR COMPONENTS (Optimized for Modal)
// ==========================================

function InputGroup({ label, value, onChange, type = "number", placeholder = "" }: any) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="text-[11px] font-bold uppercase tracking-wider text-[#596057] ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#f8faf9] border border-[#dae2d6] rounded-xl px-4 py-3.5 text-[#191c1b] font-medium focus:outline-none focus:ring-2 focus:ring-[#b1ceb1] focus:bg-white focus:border-transparent transition-all shadow-sm"
      />
    </div>
  );
}

function ActionButton({ onClick, text, isReset = false }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-4 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] mt-6 ${
        isReset 
          ? "bg-[#f2f4f2] text-[#596057] hover:bg-[#eceeec] border border-[#e1e3e1]" 
          : "bg-[#47614a] text-white hover:bg-[#334d36] hover:shadow-md"
      }`}
    >
      {isReset ? <RotateCcw className="size-4" /> : <Activity className="size-4" />}
      {text}
    </button>
  );
}

function ResultCard({ title, value, subtext, color = "text-[#47614a]" }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-[#efffec]/50 to-white border border-[#cceacc]/40 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#cceacc]/20 rounded-full blur-2xl -mr-10 -mt-10" />
      <div className="relative z-10 text-center">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#596057] mb-2">{title}</h4>
        <div className={`text-[40px] font-serif font-medium tracking-tight mb-1 ${color} leading-none`}>{value}</div>
        <p className="text-[14px] font-medium text-[#47614a]/80 mt-2">{subtext}</p>
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
  let color = "text-[#47614a]";
  if (result) {
    if (result < 18.5) { category = "Underweight"; color = "text-blue-500"; }
    else if (result < 25) { category = "Normal Weight"; color = "text-emerald-600"; }
    else if (result < 30) { category = "Overweight"; color = "text-orange-500"; }
    else { category = "Obese"; color = "text-red-500"; }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
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
    <div className="space-y-4">
      <div className="flex gap-4">
        <InputGroup label={l.water.weight} value={weight} onChange={(e: any) => setWeight(e.target.value)} />
        <InputGroup label={l.water.activity} value={activity} onChange={(e: any) => setActivity(e.target.value)} />
      </div>
      {!result ? (
        <ActionButton text={l.calculate} onClick={calculate} />
      ) : (
        <>
          <ResultCard title={l.water.result} value={`${result} L`} subtext={`Glasses: ~${Math.round(result * 4)}`} />
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
    <div className="space-y-4">
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
    <div className="space-y-4">
      <div className="flex gap-2 p-1.5 bg-[#f2f4f2] rounded-[14px] border border-[#e1e3e1] mb-2">
        <button onClick={() => setGender("M")} className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${gender === "M" ? "bg-white shadow-sm text-[#191c1b]" : "text-[#596057] hover:bg-black/5"}`}>{l.calorie.male}</button>
        <button onClick={() => setGender("F")} className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${gender === "F" ? "bg-white shadow-sm text-[#191c1b]" : "text-[#596057] hover:bg-black/5"}`}>{l.calorie.female}</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputGroup label="Weight (kg)" value={weight} onChange={(e: any) => setWeight(e.target.value)} />
        <InputGroup label="Height (cm)" value={height} onChange={(e: any) => setHeight(e.target.value)} />
      </div>
      <InputGroup label="Age" value={age} onChange={(e: any) => setAge(e.target.value)} />
      
      {!result ? (
        <ActionButton text={l.calculate} onClick={calculate} />
      ) : (
        <>
          <ResultCard title={l.calorie.result} value={`${result} kcal`} subtext="Daily energy expenditure" color="text-amber-600" />
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
  let color = "text-emerald-600";
  if (result !== null) {
    if (result < 33) { category = "Low Stress - Great Job!"; color = "text-emerald-600"; }
    else if (result < 66) { category = "Moderate Stress - Take breaks"; color = "text-amber-500"; }
    else { category = "High Stress - Consider Consultation"; color = "text-red-500"; }
  }

  const Slider = ({ label, val, setVal }: any) => (
    <div className="space-y-2">
      <label className="text-[13px] font-medium text-[#191c1b]">{label}</label>
      <input type="range" min="0" max="100" value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full accent-[#47614a]" />
      <div className="flex justify-between text-[10px] font-bold text-[#737971] uppercase tracking-wider">
        <span>{l.stress.sliderLow}</span><span>{l.stress.sliderHigh}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
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
    <div className="space-y-4">
      <div className="flex gap-4">
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
