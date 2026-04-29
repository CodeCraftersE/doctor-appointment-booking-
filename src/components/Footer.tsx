import { MessageCircle, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative px-4 md:px-8 pb-8 pt-12">
      <div className="max-w-7xl mx-auto glass-strong rounded-[2.5rem] p-8 md:p-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full gradient-deep grid place-items-center text-primary-foreground font-serif text-lg font-semibold">S</div>
              <div>
                <div className="font-serif text-lg font-semibold">Dr. Sandip Das</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Classical Homeopathy</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground max-w-md leading-relaxed">
              Personalized homeopathic care rooted in classical principles. Restoring health, gently and naturally — for over 18 years.
            </p>
            <a
              href="https://wa.me/919999999999"
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
              <li className="flex items-center gap-2"><Phone className="size-4 text-sage" /> +91 99999 99999</li>
              <li className="flex items-center gap-2"><Mail className="size-4 text-sage" /> care@drsandipdas.com</li>
              <li>Jagacha & Notun Rasta, Howrah</li>
              <li>Mon – Fri · 5–6 PM</li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-sage mb-4">Connect</div>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="size-10 grid place-items-center rounded-full glass hover:bg-white/60"><Instagram className="size-4" /></a>
              <a href="#" aria-label="Facebook" className="size-10 grid place-items-center rounded-full glass hover:bg-white/60"><Facebook className="size-4" /></a>
              <a href="https://wa.me/919999999999" aria-label="WhatsApp" className="size-10 grid place-items-center rounded-full glass hover:bg-white/60"><MessageCircle className="size-4" /></a>
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              <li><a href="#about" className="hover:text-sage">About</a></li>
              <li><a href="#treatments" className="hover:text-sage">Treatments</a></li>
              <li><a href="#booking" className="hover:text-sage">Book</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Dr. Sandip Das · Classical Homeopathy</div>
          <div>Crafted with care · Howrah, India</div>
        </div>
      </div>
    </footer>
  );
}
