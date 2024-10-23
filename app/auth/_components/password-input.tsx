"use client";

import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  isSubmitting: boolean;
  variant?: "default" | "largeRounded";
  field:
    | ControllerRenderProps<
        {
          email: string;
          password: string;
        },
        "password"
      >
    | ControllerRenderProps<
        {
          email: string;
          password: string;
          name: string;
          phone: string;
        },
        "password"
      >
    | ControllerRenderProps<
        {
          oldPassword: string;
          newPassword: string;
        },
        "oldPassword"
      >
    | ControllerRenderProps<
        {
          oldPassword: string;
          newPassword: string;
        },
        "newPassword"
      >;
  className?: string;
  showPlaceholder?: boolean;
}

export function PasswordInput({
  isSubmitting,
  field,
  className,
  showPlaceholder = true,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative flex items-center justify-between">
      <Input
        className={cn(" pr-11", className)}
        type={showPassword ? "text" : "password"}
        placeholder={showPlaceholder ? "8+ caracteres" : ""}
        disabled={isSubmitting}
        {...field}
      />
      <Button
        variant="ghost"
        type="button"
        onClick={() => setShowPassword((current) => !current)}
        className="absolute right-1 hover:bg-transparent hover:text-white/80 p-0 mr-2"
      >
        {showPassword ? (
          <EyeOff className="min-w-5 min-h-5 shrink-0" />
        ) : (
          <Eye className="min-w-5 min-h-5 shrink-0" />
        )}
      </Button>
    </div>
  );
}
