"use client";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : isCompleted
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`h-1 w-8 transition-all duration-300 ${
                  isCompleted
                    ? "bg-secondary"
                    : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
