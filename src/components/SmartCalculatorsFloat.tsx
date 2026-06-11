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
              <div className="relative group block glass-strong p-4 rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden bg-white/95">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 pointer-events-none" />
                
                <button 
                  onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
                  className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-red-500 bg-white/50 rounded-full transition-colors z-20"
                >
                  <X className="size-3" />
                </button>

                <Link to="/smart-calculators" onClick={() => setIsOpen(false)} className="relative z-10 flex flex-col gap-2 cursor-pointer pt-2">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Activity className="size-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">100% Free Tool</span>
                      <span className="text-sm font-bold text-[#05443e] leading-tight">Smart Health Calculators</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight pr-4">
                    Check your BMI, Water Needs & Stress Score instantly. No signup required.
                  </p>
                  <div className="flex items-center text-xs font-bold text-emerald-600 mt-1">
                    Try it now <ChevronRight className="size-3 ml-1 group-hover:translate-x-1 transition-transform" />
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
