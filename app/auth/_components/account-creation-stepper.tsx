"use client";

import { useState } from "react";
import { Role } from "@prisma/client";

import { AccountTypeStep } from "./role-step";
import FormRegister from "./form-register";
import { NavigationButtons } from "./navigation-buttons";
import { ProgressIndicator } from "./progress-indicator";
import { useAccountTypeStore } from "@/stores/useAccountTypeStore";

export function AccountCreationStepper() {
  const [step, setStep] = useState(1);
  const { accountType } = useAccountTypeStore();

  const handleContinue = () => {
    if (step === 1 && accountType) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AccountTypeStep accountType={accountType} />;
      case 2:
        return <FormRegister />;
      case 3:
      // return <ExpertiseStep expertise={expertise} setExpertise={setExpertise} />
      default:
        return null;
    }
  };

  const isNextDisabled =
    (step === 1 && !accountType) || step === 2 || step === 3;

  return (
    <div className="py-8 space-y-6 max-w-[500px]">
      {renderStep()}

      <NavigationButtons
        step={step}
        handleBack={handleBack}
        handleContinue={handleContinue}
        isNextDisabled={isNextDisabled}
      />

      <ProgressIndicator step={step} totalSteps={2} />
    </div>
  );
}
