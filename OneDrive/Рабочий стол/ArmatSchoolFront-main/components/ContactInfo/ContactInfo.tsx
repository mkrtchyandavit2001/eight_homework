// components/contact/ContactInfo.tsx
"use client";

import { CONTACT_CONFIG } from "@/config/contact";
import { useLanguage } from "@/context/LanguageContext";
import type { ContactInfoItem, ContactPageDictionary } from "@/types/contact";
import ContactInfoCard from "../ContactInfoCard/ContactInfoCard";
import {  ClockOrangeIcon, MailIcon, PhoneOrangeIcon } from "../icons/Icons";

export default function ContactInfo() {
  const { dict } = useLanguage();
  const t = (dict.contactPage as ContactPageDictionary).info;

  const items: ContactInfoItem[] = [
    {
      id: "phone",
      label: t.phone,
      value: CONTACT_CONFIG.phone,
      href: `tel:${CONTACT_CONFIG.phone.replace(/\s/g, "")}`,
      icon: <PhoneOrangeIcon />,
    },
    {
      id: "email",
      label: t.email,
      value: CONTACT_CONFIG.email,
      href: `mailto:${CONTACT_CONFIG.email}`,
      icon: <MailIcon />,
    },
    {
      id: "hours",
      label: t.workingHours,
      value: t.workingHoursValue,
      icon: <ClockOrangeIcon />,
    },
  ];

  return (
    <div className="flex flex-col gap-5 ">
      {items.map(({ id, ...item }) => (
        <ContactInfoCard key={id} {...item} />
      ))}
    </div>
  );
}