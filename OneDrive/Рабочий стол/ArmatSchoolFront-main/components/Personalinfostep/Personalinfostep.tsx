"use client";

import type { PersonalInfoStepProps } from "@/types/types";
import FormField from "../FormField/FormField";
import RegisteringForToggle from "../RegisteringForToggle/RegisteringForToggle";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightSizedIcon, CalendarIcon, EmailIcon, PhoneIcon } from "../icons/Icons";

export default function PersonalInfoStep({ data, onChange, onContinue }: PersonalInfoStepProps) {
  const { dict } = useLanguage();
  const t = dict?.freeLesson?.steps?.personalInfo ?? {};
  const isChild = data.registeringFor === "child";
  const isOther = data.registeringFor === "other";

  const emailLabel = isChild ? t.parentEmail ?? t.email : t.email;
  const emailPlaceholder = isChild
    ? t.parentEmailPlaceholder ?? t.emailPlaceholder
    : t.emailPlaceholder;

  const companyNameLabel = t.companyName ?? "Company Name";
  const companyNamePlaceholder = t.companyNamePlaceholder ?? "Company name";

  // Հիմնական վավերացում
  const isFormValid =
    data.birthDate.trim() !== "" &&
    data.phoneNumber.trim() !== "" &&
    data.email.trim() !== "" &&
    (!isOther || data.companyName.trim() !== "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isFormValid) return;
        onContinue();
      }}
      className="flex w-full flex-col gap-5 rounded-[32px] border border-[#EDEDED] bg-white px-10 py-5 shadow-sm"
    >
      {isChild && (
        <div className="-mx-10 border-b border-[#EDEDED] px-10 py-2.5">
          <p className="text-[13px] text-[#666666]">{t.parentNotice}</p>
        </div>
      )}

      <div className="flex w-full flex-col gap-5">
        <RegisteringForToggle
          value={data.registeringFor}
          onChange={(registeringFor) => {
            onChange({
              registeringFor,
              ...(registeringFor !== "other" ? { companyName: "" } : {}),
            });
          }}
        />

        {/* Անուն և Ազգանուն */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            label={t.firstName}
            placeholder={t.firstNamePlaceholder}
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
          />
          <FormField
            id="lastName"
            label={t.lastName}
            placeholder={t.lastNamePlaceholder}
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
          />
        </div>

        {/* Email Address և Phone Number */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="email"
            label={emailLabel}
            required
            type="email"
            placeholder={emailPlaceholder}
            icon={<EmailIcon width={16} height={16} />}
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
          <FormField
            id="phoneNumber"
            label={t.phoneNumber}
            type="tel"
            placeholder={t.phoneNumberPlaceholder}
            icon={<PhoneIcon width={16} height={16} />}
            value={data.phoneNumber}
            onChange={(e) => onChange({ phoneNumber: e.target.value })}
          />
        </div>

        {/* Birth Date (և Company Name, եթե Other է) */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="birthDate"
            label={t.birthDate}
            required
            type="date"
            icon={<CalendarIcon width={16} height={16} />}
            value={data.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
          />

          {isOther && (
            <FormField
              id="companyName"
              label={companyNameLabel}
              required
              placeholder={companyNamePlaceholder}
              value={data.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-base font-semibold text-[#F15A22] transition-opacity ${
            !isFormValid ? "cursor-not-allowed opacity-50" : "hover:opacity-80"
          }`}
        >
          {t.continue}
          <ArrowRightSizedIcon />
        </button>
      </div>
    </form>
  );
}