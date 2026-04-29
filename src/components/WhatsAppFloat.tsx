import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp consultation"
      className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-whatsapp text-white grid place-items-center shadow-elegant hover:scale-110 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30" />
      <MessageCircle className="size-6 relative" />
    </a>
  );
}
