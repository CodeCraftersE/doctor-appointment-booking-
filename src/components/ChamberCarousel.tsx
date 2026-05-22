import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import chamber1 from "@/assets/chamber/chamber-1.jpeg";
import chamber2 from "@/assets/chamber/chamber-2.jpeg";
import chamber3 from "@/assets/chamber/chamber-3.jpeg";
import chamber4 from "@/assets/chamber/chamber-4.jpeg";
import chamber5 from "@/assets/chamber/chamber-5.jpeg";
import chamber6 from "@/assets/chamber/chamber-6.jpeg";
import doctor from "@/assets/chamber/doctor-portrait.jpg";

const images = [
  { src: chamber1, title: "Modern Consultation", desc: "A professional space dedicated to your holistic well-being." },
  { src: chamber2, title: "Comfortable Waiting Area", desc: "A peaceful space designed for your comfort before consultation." },
  { src: chamber3, title: "Chamber Interior", desc: "State-of-the-art facilities for classical homeopathic care." },
  { src: doctor, title: "Expert Consultation", desc: "Dr. Sandip Das providing personalized homeopathic care." },
  { src: chamber4, title: "Professional Environment", desc: "Ensuring privacy and comfort during your healing journey." },
  { src: chamber5, title: "Treatment Room", desc: "Where science meets gentle, effective natural healing." },
  { src: chamber6, title: "Patient Care Desk", desc: "Dedicated to providing personalized attention to every case." },
];

// Duplicate for infinite scroll (desktop)
const duplicatedItems = [...images, ...images, ...images];

export function ChamberCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      // 300px width + 16px gap = 316px per card
      const scrollPosition = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / 316);
      setActiveIndex(newIndex);
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      if (activeIndex <= 0) {
        // Loop to the end
        scrollRef.current.scrollTo({ left: 316 * (images.length - 1), behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -316, behavior: "smooth" });
      }
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      if (activeIndex >= images.length - 1) {
        // Loop to the start
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 316, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="chamber-carousel" className="py-24 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-mint/30 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-0 -translate-y-1/2 w-96 h-96 bg-aqua/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12 md:mb-16 text-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-sage mb-4">Patient Trust</div>
        <h2 className="text-4xl md:text-5xl font-serif text-sage-deep">
          Professional <span className="italic text-gradient">chamber environment</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Experience the calm and professional setting where we focus on your holistic recovery.
        </p>
      </div>

      <div className="relative">
        {/* Gradients to fade edges (desktop only) */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10 hidden md:block pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10 hidden md:block pointer-events-none" />

        {/* Desktop Carousel (Continuous loop) */}
        <div className="hidden md:flex overflow-hidden">
          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: [0, -3164] }} // (420px + 32px gap) * 7
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedItems.map((item, i) => (
              <div 
                key={`desktop-${i}`} 
                className="w-[420px] group flex-shrink-0"
              >
                <div className="relative h-[350px] rounded-[2.5rem] overflow-hidden glass-strong shadow-elegant border border-white/20">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <h3 className="text-white font-serif text-xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                    <p className="text-white/70 text-xs translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Carousel (Physical Snap Scroll) */}
        <div className="md:hidden flex flex-col items-center w-full">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 [&::-webkit-scrollbar]:hidden"
          >
            {images.map((item, i) => (
              <div 
                key={`mobile-${i}`} 
                className="w-[300px] shrink-0 snap-center"
              >
                <div className="relative h-[380px] rounded-[2.5rem] overflow-hidden shadow-elegant border border-sage/10">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-serif text-2xl mb-1.5">{item.title}</h3>
                    <p className="text-white/90 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Dots & Arrows */}
          <div className="flex items-center gap-5 mt-2">
            <button 
              onClick={scrollPrev}
              className="size-8 rounded-full flex items-center justify-center bg-sage/10 text-[#05443e] hover:bg-sage/20 transition-colors"
            >
              <ChevronLeft className="size-5" />
            </button>
            
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <div 
                  key={`dot-${i}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-6 bg-[#05443e]" : "w-1.5 bg-sage/30"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={scrollNext}
              className="size-8 rounded-full flex items-center justify-center bg-sage/10 text-[#05443e] hover:bg-sage/20 transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
