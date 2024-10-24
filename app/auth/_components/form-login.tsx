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
import React, { useTransition } from "react";
import { PasswordInput } from "./password-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

function FormLogin() {
  const [isLoading, startTransition] = useTransition();
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

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      try {
        const data = await axios.post("/api/auth/sign-in", values);
        toast.success(`Bienvenido ${data.data.user.name}`);
        router.push("/dashboard");
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Ocurrió un error al iniciar sesión");
        }
      }
    });
  }

  return (
    <div className="pt-8 max-w-[500px] w-full">
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
          <Button
            disabled={!isValid || isSubmitting || isLoading}
            className="w-full h-10 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full"
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Iniciar
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default FormLogin;
