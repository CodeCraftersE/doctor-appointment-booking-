import { Home, MapPin, Calendar, Heart, Activity } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, hash } = location;

  // Determine active tab based on route
  let activeTab = "Home";
  if (pathname === "/wellness-score") activeTab = "Wellness";
  else if (pathname === "/body-assessment") activeTab = "Assessment";
  else if (pathname === "/" && hash === "#chambers") activeTab = "Chambers";
  else if (pathname === "/" && hash === "#booking") activeTab = "Book";
  else if (pathname === "/") activeTab = "Home";

  // Handle cross-page scrolling and navigation
  const handleHomeNav = (targetHash: string, fallbackId: string) => {
    if (pathname !== "/") {
      // If we aren't on home, navigate to home with the hash
      navigate(targetHash ? `/#${targetHash}` : "/");
    } else {
      // If we are already on home, just smooth scroll
      if (fallbackId === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(fallbackId);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
      // Since router might not update hash immediately on manual scroll, we can force a hash replace or let it be.
      navigate(targetHash ? `/#${targetHash}` : "/", { replace: true });
    }
  };

  return (
    <>
      {/* Spacer to prevent content from hiding behind the bottom nav */}
      <div className="h-20 md:hidden" />

      {/* The Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
        <div className="bg-white/90 backdrop-blur-xl border-t border-sage/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] px-2 py-3 rounded-t-[2rem]">
          <div className="grid grid-cols-5 items-center w-full max-w-md mx-auto">
            {/* Home */}
            <button 
              onClick={() => handleHomeNav("", "#")}
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <div className={`flex items-center justify-center transition-all duration-300 ${activeTab === "Home" ? "bg-[#f0f9f6] text-[#05443e] px-4 sm:px-5 py-1.5 rounded-xl" : "text-muted-foreground hover:text-sage-deep px-4 py-1.5"}`}>
                <Home className="size-[20px]" />
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${activeTab === "Home" ? "text-[#05443e]" : "text-muted-foreground"}`}>Home</span>
            </button>

            {/* Wellness Score */}
            <Link 
              to="/wellness-score"
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <div className={`flex items-center justify-center transition-all duration-300 ${activeTab === "Wellness" ? "bg-[#f0f9f6] text-[#05443e] px-4 sm:px-5 py-1.5 rounded-xl" : "text-muted-foreground hover:text-sage-deep px-4 py-1.5"}`}>
                <Heart className="size-[20px]" />
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${activeTab === "Wellness" ? "text-[#05443e]" : "text-muted-foreground whitespace-nowrap"}`}>Wellness</span>
            </Link>

            {/* Assessment */}
            <Link 
              to="/body-assessment"
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <div className={`flex items-center justify-center transition-all duration-300 ${activeTab === "Assessment" ? "bg-[#f0f9f6] text-[#05443e] px-4 sm:px-5 py-1.5 rounded-xl" : "text-muted-foreground hover:text-sage-deep px-4 py-1.5"}`}>
                <Activity className="size-[20px]" />
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${activeTab === "Assessment" ? "text-[#05443e]" : "text-muted-foreground"}`}>Assessment</span>
            </Link>

            {/* Chambers */}
            <button 
              onClick={() => handleHomeNav("chambers", "#chambers")}
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <div className={`flex items-center justify-center transition-all duration-300 ${activeTab === "Chambers" ? "bg-[#f0f9f6] text-[#05443e] px-4 sm:px-5 py-1.5 rounded-xl" : "text-muted-foreground hover:text-sage-deep px-4 py-1.5"}`}>
                <MapPin className="size-[20px]" />
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${activeTab === "Chambers" ? "text-[#05443e]" : "text-muted-foreground"}`}>Chambers</span>
            </button>

            {/* Book Now */}
            <button 
              onClick={() => handleHomeNav("booking", "#booking")}
              className="flex flex-col items-center justify-center gap-1.5"
            >
              <div className={`flex items-center justify-center transition-all duration-300 ${activeTab === "Book" ? "bg-[#f0f9f6] text-[#05443e] px-4 sm:px-5 py-1.5 rounded-xl" : "text-muted-foreground hover:text-sage-deep px-4 py-1.5"}`}>
                <Calendar className="size-[20px]" />
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${activeTab === "Book" ? "text-[#05443e]" : "text-muted-foreground whitespace-nowrap"}`}>Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
