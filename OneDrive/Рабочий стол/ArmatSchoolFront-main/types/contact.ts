import type { ReactNode } from "react";

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

export interface ContactInfoItem {
  id: "phone" | "email" | "hours";
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
}

export interface ContactPageDictionary {
  label: string;
  title: string;
  subtitle: string;
  form: {
    title: string;
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  info: {
    phone: string;
    email: string;
    workingHours: string;
    workingHoursValue: string;
  };
}