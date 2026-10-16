"use client";

import { useMemo } from "react";
import type { ContactDetailsStepProps } from "@/types/types";
import SelectField from "../SelectField/SelectField";
import CountrySelect from "../CountrySelect/CountrySelect";
import ContactMethodSelector from "../ContactMethodSelector/ContactMethodSelector";
import { useLanguage } from "@/context/LanguageContext";
import { useGetTimezonesQuery } from "@/redux/slices/timezonesSlice/timezonesApi";
import AdditionalInfoSection from "../AdditionalInfoSection/AdditionalInfoSection";
import {
  ArrowLeftIcon,
  ArrowRightSizedIcon,
  ClockIcon,
  GlobeIcon,
  InstagramLineIcon,
  WhatsAppIcon,
} from "../icons/Icons";

export default function ContactDetailsStep({
  data,
  onChange,
  onBack,
  onSubmit,
}: ContactDetailsStepProps) {
  const { dict, locale } = useLanguage();
  const t = dict?.freeLesson?.steps?.contactDetails ?? {};

  // Կատարում ենք հարցում բեքենդին՝ փոխանցելով ընտրված երկրի ID-ն (`countryId`)
  const { data: timezonesData, isLoading: isTimezonesLoading } =
    useGetTimezonesQuery({
      locale: locale || "hy",
      country_id: data.countryId ?? "",
      detected: !data.countryId
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "",
      search: "",
    });

  // Վերածում ենք բեքենդից եկած տվյալները SelectField-ի համար համապատասխան ֆորմատի (value / label)
  const timezones = useMemo(() => {
    if (!timezonesData?.data) return [];
    return timezonesData.data.map((tz) => ({
      value: tz.identifier,
      label: tz.label,
    }));
  }, [timezonesData]);

  const whatsappLabel = t.whatsappLabel ?? "WhatsApp Number";
  const whatsappPlaceholder = t.whatsappPlaceholder ?? "+374 00 000000";

  // «For me» դեպքում Students քայլը բաց է թողնվում՝ այսինքն 1-ից ուղիղ 3-րդն ենք եկել
  const isForMe = data.registeringFor === "me";

  // Երկիրը փոխելիս թարմացնում ենք և՛ երկրի անունը, և՛ ID-ն, ինչպես նաև մաքրում հին timezone-ը
  function handleCountryChange(
    countryCode: string,
    countryName: string,
    countryId: number,
  ) {
    onChange({
      country: countryCode,
      countryId: countryId, // <--- Սա պետք է լինի թիվ (integer)
      timezone: "", // Մաքրում ենք հին timezone-ը
    });
  }

  // Պարտադիր դաշտեր՝ country, timezone, contactMethod,
  // instagram / whatsapp ընտրելիս՝ նաև համապատասխան տվյալը,
  // «For me» դեպքում՝ նաև լեվլը
  const isContactValid =
    data.country.trim() !== "" &&
    data.timezone.trim() !== "" &&
    data.contactMethod.trim() !== "" &&
    (data.contactMethod !== "instagram" ||
      data.instagramUsername.trim() !== "") &&
    (data.contactMethod !== "whatsapp" || data.whatsappNumber.trim() !== "") &&
    (!isForMe || data.armenianLevel.trim() !== "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isContactValid) return;
        onSubmit();
      }}
      className="flex w-full flex-col gap-8 rounded-[32px] border border-[#EDEDED] bg-white p-10 shadow-sm"
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 self-start text-base font-semibold text-[#999999] hover:text-[#F15A22]"
      >
        <ArrowLeftIcon />
        {t.back}
      </button>

      <section className="flex flex-col gap-5">
        <h3 className="text-base font-semibold text-[#2D2D2D]">{t.location}</h3>

        <div className="flex flex-col">
          <div className="flex flex-col gap-5 sm:flex-row">
            <CountrySelect
              required
              icon={<GlobeIcon />}
              value={data.country}
              onChange={(code, name, id) => handleCountryChange(code, name, id)}
            />
            <SelectField
              label={t.timezone}
              required
              icon={<ClockIcon />}
              placeholder={
                !data.country
                  ? "Նախ ընտրեք երկիրը"
                  : isTimezonesLoading
                    ? "Բեռնվում է..."
                    : t.timezonePlaceholder
              }
              value={data.timezone}
              options={timezones}
              onChange={(timezone) => onChange({ timezone })}
            />
          </div>

          {/* Helper տեքստը՝ երկու դաշտերի տակ, ամբողջ լայնությամբ */}
          {t.timezoneHelper && (
            <p className="pt-2.5 text-xs leading-4 text-[#999999]">
              {t.timezoneHelper}
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div>
          <h3 className="text-base font-semibold text-[#2D2D2D]">
            {t.contactMethodTitle}
          </h3>
          <p className="pt-0.5 text-xs text-[#666666]">
            {t.contactMethodSubtitle}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          <ContactMethodSelector
            value={data.contactMethod}
            onChange={(contactMethod) => onChange({ contactMethod })}
          />

          {data.contactMethod === "instagram" && (
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="instagramUsername"
                className="text-sm font-medium leading-5 text-[#2D2D2D]"
              >
                {t.instagramLabel}
                <span className="text-[#F15A22]"> *</span>
              </label>
              <div className="relative w-full">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]">
                  <InstagramLineIcon width={16} height={16} />
                </span>
                <input
                  id="instagramUsername"
                  type="text"
                  value={data.instagramUsername}
                  onChange={(e) =>
                    onChange({ instagramUsername: e.target.value })
                  }
                  placeholder={t.instagramPlaceholder ?? "@yourusername"}
                  className="h-[46px] w-full rounded-2xl border border-[#EDEDED] bg-white pl-11 pr-4 text-sm leading-[18px] text-[#2D2D2D] placeholder:text-[#C0C0C5] focus:border-[#F15A22] focus:outline-none"
                />
              </div>
            </div>
          )}

          {data.contactMethod === "whatsapp" && (
            <div className="flex w-full flex-col gap-1.5">
              <label
                htmlFor="whatsappNumber"
                className="text-sm font-medium leading-5 text-[#2D2D2D]"
              >
                {whatsappLabel}
                <span className="text-[#F15A22]"> *</span>
              </label>
              <div className="relative w-full">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]">
                  <WhatsAppIcon width={16} height={16} />
                </span>
                <input
                  id="whatsappNumber"
                  type="tel"
                  inputMode="tel"
                  value={data.whatsappNumber}
                  onChange={(e) => onChange({ whatsappNumber: e.target.value })}
                  placeholder={whatsappPlaceholder}
                  className="h-[46px] w-full rounded-2xl border border-[#EDEDED] bg-white pl-11 pr-4 text-sm leading-[18px] text-[#2D2D2D] placeholder:text-[#C0C0C5] focus:border-[#F15A22] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <AdditionalInfoSection
        data={data}
        onChange={onChange}
        isForMe={isForMe}
      />

      <button
        type="submit"
        disabled={!isContactValid}
        className={`flex w-full items-center justify-center gap-2.5 rounded-full bg-transparent pt-5 text-base font-semibold text-[#F15A22] transition-opacity ${
          !isContactValid ? "cursor-not-allowed opacity-50" : "hover:opacity-80"
        }`}
      >
        {t.continue}
        <ArrowRightSizedIcon />
      </button>
    </form>
  );
}
