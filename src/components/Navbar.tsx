import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "About", href: "/#about" },
  { label: "Treatments", href: "/#treatments" },
  { label: "Body Assessment", href: "/body-assessment" },
  { label: "Wellness Score", href: "/wellness-score" },
  { label: "Chambers", href: "/#chambers" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-3 md:top-4 inset-x-3 md:inset-x-8 z-50"
    >
      {/* =========================================
          DESKTOP NAVBAR (UNCHANGED) 
          ========================================= */}
      <div className="hidden md:flex bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] px-5 py-3 items-center justify-between max-w-6xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#05443e] flex items-center justify-center text-white font-serif text-[22px] font-bold shadow-md shrink-0">
              {import.meta.env.VITE_DOCTOR_NAME ? import.meta.env.VITE_DOCTOR_NAME.replace("Dr. ", "").charAt(0) : "S"}
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="font-serif text-2xl font-bold text-[#05443e] tracking-tight leading-none whitespace-nowrap">{import.meta.env.VITE_DOCTOR_NAME}</div>
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#05443e]/70 font-semibold mt-1 whitespace-nowrap">Classical Homeopathy</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-8 ml-auto">
          <div className="flex items-center gap-8 text-sm font-medium">
            {links.map((l) => (
              <Link key={l.href} to={l.href} className="text-[#05443e] hover:text-[#05443e]/70 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/#booking"
            className="bg-[#05443e] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-md"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* =========================================
          MOBILE NAVBAR (EXACT SCREENSHOT MATCH)
          ========================================= */}
      <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-white via-[#f8fcfb] to-[#e8f6f4] rounded-full pl-6 pr-2 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white">
        <Link to="/" className="font-serif text-[#05443e] font-black text-[22px] tracking-tighter leading-none">
          {import.meta.env.VITE_DOCTOR_NAME?.toUpperCase()}
        </Link>
        
        <Link
          to="/smart-calculators"
          className="w-[46px] h-[46px] rounded-full bg-[#05443e] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform shrink-0"
          aria-label="Smart Health Calculators"
        >
          {/* Custom Medical Heart Pulse + Alert Icon exactly matching the screenshot */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 2.5-2.5" />
            <path d="M2 12h4l2-3 3 6 2-3h3" />
            <path d="M20 13v4" />
            <path d="M20 21v.01" />
          </svg>
        </Link>
      </div>

    </motion.nav>
  );
}
