import { useState } from "react";
import { AccountTypeStep } from "./role-step";
import FormRegister from "./form-register";
import { NavigationButtons } from "./navigation-buttons";
import { Role } from "@prisma/client";
import { ProgressIndicator } from "./progress-indicator";
// import { AccountTypeStep } from './account-type-step'
// import { CreatorInfoStep } from './creator-info-step'
// import { ExpertiseStep } from './expertise-step'
// import { CompletionStep } from './completion-step'
// import { NavigationButtons } from './navigation-buttons'
// import { ProgressIndicator } from './progress-indicator'

type AccountType = "solo" | "team" | null;

export function AccountCreationStepper() {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<Role | null>(null);

  const handleContinue = () => {
    if (step === 1 && accountType) {
      setStep(accountType === "ADMIN" ? 2 : 4);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4 && accountType === "ADMIN") {
      setStep(3);
    } else if (step === 4 && accountType === "USER") {
      setStep(1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AccountTypeStep
            accountType={accountType}
            setAccountType={setAccountType}
          />
        );
      case 2:
        return <FormRegister />;
      case 3:
      // return <ExpertiseStep expertise={expertise} setExpertise={setExpertise} />
      default:
        return null;
    }
  };

  const isNextDisabled =
    (step === 1 && !accountType) ||
    (step === 2) ||
    (step === 3);

  return (
    <div className="py-6 space-y-6">
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
