import { motion, AnimatePresence } from "framer-motion";
import { Activity, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function SmartCalculatorsFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPulse, setHasPulse] = useState(true);

  return (
    <div className="hidden md:flex fixed bottom-6 left-6 z-[100] flex-col justify-end items-start gap-4 pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom left" }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="max-w-[280px]"
            >
              <div className="relative group block p-4 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden bg-gradient-to-br from-[#e0f4ec] via-[#f2faf7] to-white">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent pointer-events-none" />
                
                <button 
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                  className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-red-500 bg-white/80 backdrop-blur-md rounded-full shadow-sm transition-colors z-20"
                >
                  <X className="size-3.5" />
                </button>

                <Link to="/smart-calculators" onClick={() => setIsOpen(false)} className="relative z-10 flex flex-col gap-2.5 cursor-pointer pt-2">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#d5f3e5] text-[#0f8c61] flex items-center justify-center shrink-0">
                      <Activity className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0f8c61]">100% Free Tool</span>
                      <span className="text-[17px] font-bold text-[#04443e] leading-tight">Smart Health Calculators</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-snug pr-2">
                    Check your BMI, Water Needs & Stress Score instantly. No signup required.
                  </p>
                  <div className="flex items-center text-[13px] font-bold text-[#0f8c61] mt-0.5">
                    Try it now <ChevronRight className="size-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasPulse(false);
        }}
        aria-label="Toggle Smart Health Calculators"
        className="group pointer-events-auto relative size-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white grid place-items-center shadow-lg hover:scale-110 transition-transform focus:outline-none"
      >
        {!isOpen && (
          <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-emerald-700 text-xs font-bold whitespace-nowrap rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center border border-emerald-100">
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-emerald-100"></div>
            Free to use
          </div>
        )}

        {hasPulse && !isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40" />
        )}
        {isOpen ? <X className="size-6 relative" /> : <Activity className="size-6 relative" />}
      </button>
    </div>
  );
}
