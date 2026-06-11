import { useState } from "react";
import { format } from "date-fns";
import { Loader2, Check, UserCircle, Mail, Phone, X, Send, Calendar } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { sendBookingEmail } from "@/services/brevo";

interface DirectBookingDialogProps {
  clinicName: string;
  clinicDays: number[];
  trigger: React.ReactNode;
}

export function DirectBookingDialog({ clinicName, clinicDays, trigger }: DirectBookingDialogProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDirectBooking = async () => {
    if (!name.trim()) { setEmailError("Please enter your name."); setEmailStatus("error"); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError("Please enter a valid email address."); setEmailStatus("error"); return; }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) { setEmailError("Please enter a valid phone number."); setEmailStatus("error"); return; }
    if (!date) { setEmailError("Please select a preferred date."); setEmailStatus("error"); return; }

    setEmailStatus("loading");
    setEmailError("");

    const result = await sendBookingEmail({
      name: name.trim(),
      age,
      gender,
      email: email.trim(),
      phone: phone.trim(),
      mode: `Chamber Visit (${clinicName})`,
      price: 300,
      category: "",
      description: "Direct booking from Clinic Availability card",
      preferredDate: format(date, "yyyy-MM-dd"),
    });

    if (result.success) {
      setEmailStatus("success");
      setTimeout(() => {
        setIsDialogOpen(false);
        setEmailStatus("idle");
        setName(""); setAge(""); setGender("Male"); setEmail(""); setPhone(""); setDate(undefined);
      }, 3000);
    } else {
      setEmailStatus("error");
      setEmailError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-strong border-sage/20 rounded-[2rem] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-serif text-[#05443e]">Book {clinicName}</DialogTitle>
        </DialogHeader>

        {emailStatus === "success" ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
              <Check className="size-8" />
            </div>
            <h3 className="text-xl font-bold text-[#05443e]">Booking Confirmed!</h3>
            <p className="text-sm text-muted-foreground">Please check your email for the confirmation details.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {emailStatus === "error" && emailError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
                <X className="size-4 shrink-0" /> {emailError}
              </div>
            )}

            <div className="space-y-3">
              <div className="relative group">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full glass rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="w-full glass rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage" />
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full glass rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage appearance-none">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>

              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (emailStatus === "error") setEmailStatus("idle"); }} placeholder="Email Address" className="w-full glass rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage" />
              </div>

              <div className="relative group">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); if (emailStatus === "error") setEmailStatus("idle"); }} placeholder="Phone Number" className="w-full glass rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage" />
              </div>

              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full glass rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage text-left flex items-center">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <span className={!date ? "text-muted-foreground" : "text-[#05443e]"}>
                        {date ? format(date, "PPP") : "Select date"}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[100]" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d: Date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (d < today) return true;
                        return !clinicDays.includes(d.getDay());
                      }}
                      initialFocus
                      className="bg-white rounded-xl border border-sage/20 shadow-lg"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <button
              onClick={handleDirectBooking}
              disabled={emailStatus === "loading"}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-deep text-white font-bold shadow-md hover:scale-[1.02] transition-transform disabled:opacity-80 disabled:scale-100"
            >
              {emailStatus === "loading" ? (
                <><Loader2 className="size-4 animate-spin" /> Booking...</>
              ) : (
                <><Send className="size-4" /> Book Appointment</>
              )}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
