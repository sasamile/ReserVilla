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
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { PasswordInput } from "./password-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function FormRegister() {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      apellido: "",
      numeroTelefono: "",
      isAdmin: false,
      email: "",
      password: "",
      archivo: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const [imageSrc, setImageSrc] = useState<string | null>(null);


  async function onSubmit(values: z.infer<typeof RegisterSchema>) {}

  return (
    <div className="pt-6 w-[550px] text-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!form.watch("isAdmin") && (
            <>
              <div className="flex justify-between space-x-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Nombre</FormLabel>
                      <FormControl>
                        <Input
                          className="py-5 border-2 w-[250px] border-green-300 focus:border-green-500 bg-transparent"
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
                  name="apellido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Apellido</FormLabel>
                      <FormControl>
                        <Input
                          className="py-5 w-[250px] border-2 border-green-300 focus:border-green-500 bg-transparent"
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
                        className="py-5 border-2 border-green-300 focus:border-green-500 bg-transparent"
                        placeholder="shadcn"
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
                        className="py-5 border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200"
                      />
                    </FormControl>
                    <FormDescription className="text-[13.5px]">
                      La contraseña debe tener un mínimo de 8 caracteres,
                      incluyendo al menos 1 letra, 1 número y 1 carácter
                      especial.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="isAdmin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      {...field}
                      value={field.value ? "true" : "false"}
                      disabled={
                        !form.watch("name") ||
                        !form.watch("email") ||
                        !form.watch("password") ||
                        !form.watch("apellido")
                      }
                    />
                    <span className="text-gray-300">¿Es administrador?</span>
                  </label>
                </FormControl>
              </FormItem>
            )}
          />
          {form.watch("isAdmin") && (
            <>
              {/* Agrega aquí los campos adicionales para el formulario de administrador */}
              <FormField
                control={form.control}
                name="numeroTelefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Numero de Telefono
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        className="py-5 border-2 border-green-300 focus:border-green-500 bg-transparent"
                        placeholder="+57"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
            </>
          )}

          <Button
            disabled={!isValid || isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
          >
            Iniciar
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default FormRegister;
