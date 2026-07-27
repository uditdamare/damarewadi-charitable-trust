import { trustSettings } from "@/content/trust-settings";

// A static wa.me link — no WhatsApp Business API integration yet (that's the
// future "WhatsApp Notifications" roadmap item). This just gives visitors a
// one-tap way to message the POC directly, which is what every reference NGO
// site (Akshaya Patra, etc.) offers via a floating chat button.
export function WhatsAppButton() {
  const digitsOnly = trustSettings.contactPhone.replace(/[^\d]/g, "");

  return (
    <a
      href={`https://wa.me/${digitsOnly}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.484 1.345 4.997l-1.35 4.933a.75.75 0 0 0 .92.92l4.933-1.35a9.96 9.96 0 0 0 4.15.898h.004c5.514 0 9.997-4.483 9.997-9.998 0-2.671-1.04-5.181-2.929-7.07a9.937 9.937 0 0 0-7.07-2.927zm0 1.5a8.44 8.44 0 0 1 6.01 2.487 8.44 8.44 0 0 1 2.487 6.01c0 4.687-3.813 8.497-8.5 8.497h-.003a8.46 8.46 0 0 1-3.626-.812.75.75 0 0 0-.567-.032l-3.483.953.953-3.483a.75.75 0 0 0-.033-.567 8.46 8.46 0 0 1-.79-3.556c0-4.687 3.813-8.497 8.552-8.497z" />
      </svg>
    </a>
  );
}
