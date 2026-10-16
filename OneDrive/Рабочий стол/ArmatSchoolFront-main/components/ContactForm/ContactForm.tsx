// components/contact/ContactForm.tsx
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

import type {
  ContactFormStatus,
  ContactFormValues,
  ContactPageDictionary,
} from "@/types/contact";
import FormField from "../FormField/FormField";
import { SendIcon } from "../icons/Icons";

const initialValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const { dict, locale } = useLanguage();
  const t = (dict.contactPage as ContactPageDictionary).form;

  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const handleChange =
    (field: keyof ContactFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (status !== "idle") setStatus("idle");
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!res.ok) throw new Error("Request failed");

      setValues(initialValues);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col rounded-3xl border border-[#EDEDED] bg-white px-5 py-5 sm:px-8">
      <h2 className="text-xl font-semibold leading-[30px] text-ink">{t.title}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-5">
        <div className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="firstName"
              name="firstName"
              label={t.firstName}
              placeholder={t.firstNamePlaceholder}
              value={values.firstName}
              onChange={handleChange("firstName")}
              autoComplete="given-name"
            />
            <FormField
              id="lastName"
              name="lastName"
              label={t.lastName}
              placeholder={t.lastNamePlaceholder}
              value={values.lastName}
              onChange={handleChange("lastName")}
              autoComplete="family-name"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="email"
              name="email"
              type="email"
              required
              label={t.email}
              placeholder={t.emailPlaceholder}
              value={values.email}
              onChange={handleChange("email")}
              autoComplete="email"
            />
            <FormField
              id="phone"
              name="phone"
              type="tel"
              label={t.phone}
              placeholder={t.phonePlaceholder}
              value={values.phone}
              onChange={handleChange("phone")}
              autoComplete="tel"
            />
          </div>

          <FormField
            id="subject"
            name="subject"
            label={t.subject}
            placeholder={t.subjectPlaceholder}
            value={values.subject}
            onChange={handleChange("subject")}
          />

          <FormField
            multiline
            id="message"
            name="message"
            required
            label={t.message}
            placeholder={t.messagePlaceholder}
            value={values.message}
            onChange={handleChange("message")}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center justify-center gap-2 text-orange-500 rounded-[14px] px-0 py-4 text-[15px] font-semibold leading-[150%] text-primary transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.submit}
          <SendIcon  />
        </button>

        <p role="status" aria-live="polite" className="min-h-5 text-sm">
          {status === "success" && <span className="text-green-600">{t.success}</span>}
          {status === "error" && <span className="text-red-600">{t.error}</span>}
        </p>
      </form>
    </div>
  );
}