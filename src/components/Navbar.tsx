import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Booking", href: "#booking" },
  { label: "Chambers", href: "#chambers" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 inset-x-4 md:inset-x-8 z-50"
    >
      <div className="glass-strong rounded-full px-5 md:px-8 py-3 flex items-center justify-between max-w-6xl mx-auto">
        <a href="#" className="flex items-center gap-2.5">
          <div className="size-9 rounded-full gradient-deep flex items-center justify-center text-primary-foreground font-serif text-lg font-semibold shadow-md">
            S
          </div>
          <div className="leading-tight">
            <div className="font-serif text-base md:text-lg font-semibold">Dr. Sandip Das</div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Classical Homeopathy</div>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-sage transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#booking"
          className="hidden md:inline-flex gradient-deep text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform"
        >
          Book Now
        </a>
        <button
          className="md:hidden size-9 grid place-items-center rounded-full bg-white/40"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong mt-2 rounded-3xl p-4 md:hidden flex flex-col gap-3"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl hover:bg-white/40">
              {l.label}
            </a>
          ))}
          <a href="#booking" onClick={() => setOpen(false)} className="text-center gradient-deep text-primary-foreground px-5 py-3 rounded-full text-sm font-medium">
            Book Appointment
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
