"use client";

import { useState } from "react";

import FormWrapper from "./form-wraper";
import FormLogin from "./form-login";
import { AccountCreationStepper } from "./account-creation-stepper";

function FormAuth() {
  const [ischange, setIsChange] = useState<"login" | "register">("login");

  return (
    <div className="h-full">
      <FormWrapper ischange={ischange} setIsChange={setIsChange}>
        {ischange === "login" ? <FormLogin /> : <AccountCreationStepper />}
      </FormWrapper>
    </div>
  );
}

export default FormAuth;
