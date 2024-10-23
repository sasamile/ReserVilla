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
import React from "react";
import { PasswordInput } from "./password-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function FormLogin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { data: session } = useSession();

  const { isSubmitting, isValid } = form.formState;

  // useEffect(() => {
  //   if (session?.user) {
  //     router.push("/dashboard");
  //   }
  // }, [session]);

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const data = await axios.post("/api/auth/sign-in", values);
      toast.success(`Bienvenido ${data.data.user.name}`);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Ocurrió un error al iniciar sesión");
      }
    }
  }

  return (
    <div className="pt-12 w-[450px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormLabel className="text-gray-700">Contraseña</FormLabel>
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
export default FormLogin;
