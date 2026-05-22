import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_WHATSAPP_NUMBER}&text=${encodeURIComponent(`Hello, I would like to consult with ${import.meta.env.VITE_DOCTOR_NAME}. Kindly let me know the available appointment slots. Thank you.`)}&type=phone_number&app_absent=0`}
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
