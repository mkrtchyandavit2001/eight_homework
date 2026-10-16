"use client";

import AllSetScreen from "@/components/AllSetScreen/AllSetScreen";
import ContactDetailsStep from "@/components/ContactDetailsStep/ContactDetailsStep";
import Container from "@/components/Container";
import InformationSavedScreen from "@/components/InformationSavedScreen/InformationSavedScreen";
import PersonalInfoStep from "@/components/Personalinfostep/Personalinfostep";
import StepIndicator from "@/components/StepIndicator/StepIndicator";
import {
  initialFreeLessonFormData,
  type BookingResult,
  type FreeLessonFormData,
} from "@/types/types";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import StudentsStep from "@/components/Studentsstep/Studentsstep";
import FreeTrialBookingPage from "../calendar/page";

type FlowStage = 1 | 2 | 3 | "saved" | "calendar" | "confirmed";

export default function FreeLessonFlow() {
  const { dict } = useLanguage();
  const t = dict?.freeLesson ?? {};

  const [stage, setStage] = useState<FlowStage>(1);
  const [data, setData] = useState<FreeLessonFormData>(
    initialFreeLessonFormData,
  );
  const [booking, setBooking] = useState<BookingResult | null>(null);

  function patch(update: Partial<FreeLessonFormData>) {
    setData((prev) => ({ ...prev, ...update }));
  }

  // Ուսանողների քայլը բաց ենք թողնում միայն «For me» դեպքում
  const needsStudents = data.registeringFor !== "me";

  const stepIndicatorStage = typeof stage === "number" ? stage : 3;
  const allCompleted = stage === "saved" || stage === "confirmed";

  // Օրացույցի էջը լիաէկրան է (իր NavBar-ով), առանց ձևի կոնտեյների
  if (stage === "calendar") {
    return (
      <FreeTrialBookingPage
        onConfirm={(result) => {
          setBooking(result);
          setStage("confirmed");
        }}
      />
    );
  }

  return (
    <section className="w-full bg-[#F7F7F7] px-6 py-20">
      <Container className="flex flex-col items-center">
        <div className="flex w-full max-w-[900px] flex-col items-center">
          <header className="flex flex-col items-center gap-1.5 text-center">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F15A22]" />
              <span className="text-[11px] font-semibold uppercase tracking-[1.1px] text-[#F15A22]">
                {t.badge}
              </span>
            </div>
            <h1 className="text-[44px] font-semibold leading-[1.5] tracking-[-1.1px] text-[#2D2D2D]">
              {t.heading}
            </h1>
            <p className="text-base text-[#666666]">{t.subtitle}</p>
          </header>

          <StepIndicator
            currentStep={stepIndicatorStage}
            completed={allCompleted}
          />

          <div className="mt-6 w-full max-w-[770px]">
            {stage === 1 && (
              <PersonalInfoStep
                data={data}
                onChange={patch}
                onContinue={() => setStage(needsStudents ? 2 : 3)}
              />
            )}

            {stage === 2 && (
              <StudentsStep
                data={data}
                onChange={patch}
                onBack={() => setStage(1)}
                onContinue={() => setStage(3)}
              />
            )}

            {stage === 3 && (
              <ContactDetailsStep
                data={data}
                onChange={patch}
                onBack={() => setStage(needsStudents ? 2 : 1)}
                onSubmit={() => setStage("saved")}
              />
            )}

            {stage === "saved" && (
              <InformationSavedScreen
                onOpenCalendly={() => setStage("calendar")}
              />
            )}

            {stage === "confirmed" && (
              <AllSetScreen
                dateLabel={booking?.dateLabel ?? ""}
                timeLabel={booking?.timeLabel ?? ""}
                onReturnHome={() => {
                  setStage(1);
                  setData(initialFreeLessonFormData);
                  setBooking(null);
                }}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
