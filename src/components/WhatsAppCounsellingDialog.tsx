import { useState } from "react";
import { UserCircle, MessageCircle, Send } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WhatsAppCounsellingDialogProps {
  trigger: React.ReactNode;
}

export function WhatsAppCounsellingDialog({ trigger }: WhatsAppCounsellingDialogProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [reason, setReason] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleWhatsAppRedirect = () => {
    const text = `Hello Dr. Moumita Munian,\nI would like to consult regarding Psychological Counselling.\n\n*Patient Details:*\nName: ${name || "Not provided"}\nAge: ${age || "Not provided"}\nGender: ${gender}\nReason: ${reason || "Will discuss at clinic"}\n\nPlease let me know the available appointment slots.`;
    
    const whatsappUrl = `https://wa.me/919874415974?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-strong border-sage/20 rounded-[2rem] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-serif text-[#05443e] flex items-center gap-2">
            <MessageCircle className="size-6 text-[#22c55e] shrink-0" />
            <span className="leading-tight">WhatsApp Booking for Psychological Counselling</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-sage/10 p-4 rounded-xl border border-sage/20">
            <h4 className="font-serif text-lg text-sage-deep font-bold mb-1">Dr. Moumita Munian</h4>
            <div className="text-xs text-[#05443e] space-y-0.5">
              <p className="font-semibold">M.Sc. Psychology, D.M.B.S.</p>
              <p>PGD Counselling (J.U.)</p>
              <p>CBT (NIMHANS, Bengaluru)</p>
              <div className="pt-1 text-muted-foreground">
                <p>Attached to the Department of Psychology</p>
                <p>Medical College and Hospital, Kolkata</p>
              </div>
              <p className="pt-1.5 font-bold text-sage-deep">Adult and Child Counselling</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Please provide some basic details before we redirect you to WhatsApp. You can discuss the reason at the clinic if you prefer.
          </p>

          <div className="space-y-3">
            <div className="relative group">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Full Name (Optional)" 
                className="w-full glass rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]" 
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                placeholder="Age (Optional)" 
                className="w-full glass rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]" 
              />
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                className="w-full glass rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] appearance-none"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <textarea 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder="Reason for consultation (Optional)" 
              rows={3}
              className="w-full glass rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e] resize-none" 
            />
          </div>

          <button
            onClick={handleWhatsAppRedirect}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#22c55e] text-white font-bold shadow-md hover:scale-[1.02] transition-transform"
          >
            <Send className="size-4" /> Continue to WhatsApp
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
