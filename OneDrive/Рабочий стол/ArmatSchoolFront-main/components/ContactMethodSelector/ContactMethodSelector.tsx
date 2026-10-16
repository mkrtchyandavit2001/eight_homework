import type { ContactMethod, ContactMethodSelectorProps } from "@/types/types";
import { EmailIcon, InstagramLineIcon, PhoneIcon, WhatsAppIcon } from "../icons/Icons";

const OPTIONS: { value: ContactMethod; title: string; subtitle: string; icon: (active: boolean) => React.ReactNode }[] = [
  { 
    value: "email", 
    title: "Email", 
    subtitle: "Via email", 
    icon: (active) => <EmailIcon color={active ? "#F15A22" : "#666666"} /> 
  },
  { 
    value: "whatsapp", 
    title: "WhatsApp", 
    subtitle: "Chat & calls", 
    icon: (active) => <WhatsAppIcon color={active ? "#F15A22" : "#666666"} /> 
  },
  {
    value: "instagram",
    title: "Instagram",
    subtitle: "DM",
    icon: (active) => <InstagramLineIcon color={active ? "#F15A22" : "#666666"} />,
  },
  { 
    value: "phone", 
    title: "Phone Call", 
    subtitle: "Direct call", 
    icon: (active) => <PhoneIcon color={active ? "#F15A22" : "#666666"} /> 
  },
];

export default function ContactMethodSelector({ value, onChange }: ContactMethodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              "flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-colors",
              active
                ? "border-[#F15A22] bg-[#FFF4EA] shadow-[0_0_0_1px_rgba(241,90,34,0.15)]"
                : "border-[#EDEDED] bg-white",
            ].join(" ")}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              {opt.icon(active)}
            </span>
            <span className="flex flex-col">
              <span className={`text-sm font-medium ${active ? "text-[#F15A22]" : "text-[#2D2D2D]"}`}>
                {opt.title}
              </span>
              <span className="text-xs font-medium text-[#999999]">{opt.subtitle}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}