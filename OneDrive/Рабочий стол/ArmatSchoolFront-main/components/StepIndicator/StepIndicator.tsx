import type { StepIndicatorProps } from "@/types/types";

export default function StepIndicator({ currentStep, completed = false }: StepIndicatorProps) {
  const steps = [1, 2, 3] as const;

  return (
    <div className="flex items-center justify-center gap-3 py-5">
      {steps.map((step, i) => {
        const isPast = step < currentStep;
        const isCurrent = !completed && step === currentStep;
        const isActive = completed || isPast || isCurrent;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={[
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold leading-none",
                isActive ? "bg-[#F15A22]" : "bg-[#EDEDED]",
              ].join(" ")}
              style={{ color: isActive ? "#FFFFFF" : "#AAAAAA" }}
              aria-current={isCurrent ? "step" : undefined}
            >
              {completed ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              ) : (
                <span className="block select-none font-sans tabular-nums">{step}</span>
              )}
            </div>

            {i < steps.length - 1 && (
              <div
                className={[
                  "h-0.5 w-16 rounded-full",
                  completed || step < currentStep ? "bg-[#F15A22]" : "bg-[#EDEDED]",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}