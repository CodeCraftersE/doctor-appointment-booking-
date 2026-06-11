import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Faster, smoother springs for less lag
  const springConfig = { damping: 20, stiffness: 450, mass: 0.5 };
  const mainCursorX = useSpring(cursorX, springConfig);
  const mainCursorY = useSpring(cursorY, springConfig);

  // Trailing globule (make it follow closer and faster)
  const trailCursorX = useSpring(cursorX, { damping: 25, stiffness: 250, mass: 0.8 });
  const trailCursorY = useSpring(cursorY, { damping: 25, stiffness: 250, mass: 0.8 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      }
    };

    const handleOut = () => setIsHovered(false);

    // Section detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  const sectionColors: Record<string, string> = {
    hero: "var(--aqua)",
    about: "var(--mint)",
    treatments: "var(--sage)",
    "why-homeopathy": "var(--aqua)",
    booking: "var(--sage)",
    testimonials: "var(--mint)",
    "chamber-carousel": "var(--aqua)",
    chambers: "var(--aqua)",
  };

  const activeColor = sectionColors[currentSection] || "var(--aqua)";

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trailing Globule */}
      <motion.div
        style={{
          x: trailCursorX,
          y: trailCursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: activeColor,
        }}
        className="absolute size-8 rounded-full opacity-10 blur-md"
      />

      {/* Main Healing Orb */}
      <motion.div
        style={{
          x: mainCursorX,
          y: mainCursorY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: activeColor,
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? activeColor : "rgba(255, 255, 255, 0.8)",
        }}
        className="absolute size-5 rounded-full border-2 glass-soft shadow-glow flex items-center justify-center"
      >
        {/* Core globule center */}
        <div 
          className="size-1.5 rounded-full bg-white opacity-60" 
          style={{ boxShadow: `0 0 10px 2px ${activeColor}` }}
        />
        
        {/* Hover Aura */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.2 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: activeColor }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Click Burst Effect */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ x: cursorX.get(), y: cursorY.get(), scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{ 
              translateX: "-50%", 
              translateY: "-50%",
              borderColor: activeColor 
            }}
            className="absolute size-10 border-2 rounded-full"
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
