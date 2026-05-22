import { MessageCircle, Phone, Mail, Facebook } from "lucide-react";

export function Footer() {
  const docName = import.meta.env.VITE_DOCTOR_NAME;
  const waPhone = import.meta.env.VITE_WHATSAPP_NUMBER;
  const assistantName = import.meta.env.VITE_ASSISTANT_NAME;
  const assistantPhone = import.meta.env.VITE_ASSISTANT_PHONE;
  const assistantPhoneRaw = import.meta.env.VITE_ASSISTANT_PHONE_RAW;
  const doctorEmail = import.meta.env.VITE_DOCTOR_EMAIL;
  const doctorFacebook = import.meta.env.VITE_DOCTOR_FACEBOOK;

  const waUrl = `https://api.whatsapp.com/send/?phone=${waPhone}&text=${encodeURIComponent(`Hello, I would like to consult with ${docName}. Kindly let me know the available appointment slots. Thank you.`)}&type=phone_number&app_absent=0`;

  return (
    <footer className="relative px-4 md:px-8 pb-8 pt-12">
      {/* Unified Footer */}
      <div className="max-w-7xl mx-auto glass-strong rounded-[2.5rem] p-8 md:p-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full gradient-deep grid place-items-center text-primary-foreground font-serif text-lg font-semibold">
                {docName ? docName.replace("Dr. ", "").charAt(0) : "S"}
              </div>
              <div>
                <div className="font-serif text-lg font-semibold">{docName}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Classical Homeopathy</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground max-w-md leading-relaxed">
              Personalized homeopathic care rooted in classical principles. Restoring health, gently and naturally — for over 18 years.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-whatsapp text-white px-5 py-3 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
            >
              <MessageCircle className="size-4" /> WhatsApp Us
            </a>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-sage mb-4">Contact</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2 font-medium text-sage-deep uppercase tracking-wider text-[10px]">Call Assistance</li>
              <li className="flex items-center gap-2"><Phone className="size-4 text-sage" /> <a href={`tel:${assistantPhoneRaw}`} className="hover:text-sage transition-colors">{assistantPhone}</a></li>
              <li className="flex items-center gap-2 text-[11px]">Asst: {assistantName}</li>
              <li className="mt-4 flex items-center gap-2 font-medium text-sage-deep uppercase tracking-wider text-[10px]">Direct Doctor</li>
              <li className="flex items-center gap-2"><Phone className="size-4 text-sage" /> +{waPhone.replace(/^(\d{2})(\d{5})(\d{5})$/, "$1 $2 $3")}</li>
              <li className="flex items-center gap-2"><Mail className="size-4 text-sage" /> {doctorEmail}</li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-sage mb-4">Connect</div>
            <div className="flex gap-3">
              <a 
                href={doctorFacebook} 
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook" 
                className="size-10 grid place-items-center rounded-full glass hover:bg-white/60 hover:text-blue-600 transition-all"
              >
                <Facebook className="size-4" />
              </a>
              <a 
                href={waUrl} 
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp" 
                className="size-10 grid place-items-center rounded-full glass hover:bg-white/60 hover:text-whatsapp transition-all"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              <li><a href="#about" className="hover:text-sage">About</a></li>
              <li><a href="#treatments" className="hover:text-sage">Treatments</a></li>
              <li><a href="#booking" className="hover:text-sage">Book</a></li>
              <li><a href="/smart-calculators" className="hover:text-sage font-medium text-sage-deep">Smart Calculators</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} {docName} · Classical Homeopathy</div>
          <div>Crafted with care · Howrah, India</div>
        </div>
      </div>
    </footer>
  );
}
