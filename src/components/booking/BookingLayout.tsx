"use client";

import React from "react";
import { StepProgress } from "./StepProgress";
import { Button } from "@/components/ui/Button";

interface BookingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  title?: string;
}

export function BookingLayout({
  children,
  currentStep,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = "Next",
  title,
}: BookingLayoutProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-2xl animate-fade-up">
        <div className="mb-8">
          <StepProgress currentStep={currentStep} totalSteps={6} />
        </div>

        {title && (
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
        )}

        <div className="mb-8 rounded-3xl border border-border bg-card p-8 shadow-sm transition-colors duration-300 animate-scale-in">
          {children}
        </div>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className="flex-1"
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}