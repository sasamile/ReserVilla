"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password-input";
import { Button } from "@/components/ui/button";
import { RegisterSchema } from "@/schemas";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function FormRegister() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {}

  return (
    <div className="pt-6 w-full max-w-[500px] text-white h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-gray-300">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#525252]"
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-gray-300">Apellido</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#525252]"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">
                  Correo electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-[#525252]"
                    placeholder="Correo electrónico"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Contraseña</FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    isSubmitting={isSubmitting}
                    className="border-[#525252]"
                  />
                </FormControl>
                <FormDescription className="text-[13.5px]">
                  La contraseña debe tener un mínimo de 8 caracteres, incluyendo
                  al menos 1 letra, 1 número y 1 carácter especial.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <PhoneInput
            defaultCountry="ua"
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />

          <Button
            disabled={!isValid || isSubmitting}
            className="w-full h-10 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full"
          >
            Iniciar
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default FormRegister;
