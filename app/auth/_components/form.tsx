"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import { PasswordInput } from "./password-input";
import Image from "next/image";
import { oswald, oswald2 } from "@/lib/font";
import FormWrapper from "./Form-Wraper";
import FormLogin from "./form-login";
import FormRegister from "./form-register";
import { AccountCreationStepper } from "./account-creation-stepper";

function FormAuth() {
  const [ischange, setIsChange] = useState<"login" | "register">("login");

  return (
    <div>
      <FormWrapper ischange={ischange} setIsChange={setIsChange}>
        {ischange === "login" ? <FormLogin /> : <AccountCreationStepper />}
      </FormWrapper>
    </div>
  );
}

export default FormAuth;

