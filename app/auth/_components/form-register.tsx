"use client";

import { useRef, useState, useTransition } from "react";
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
import { FileIcon, Loader2, XIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/actions/uploadthing-actions";
import toast from "react-hot-toast";
import { register } from "@/actions/auth";
import { useAccountTypeStore } from "@/stores/useAccountTypeStore";

function FormRegister() {
  const router = useRouter();

  const { accountType } = useAccountTypeStore();
  const [isLoading, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(async () => {
      try {
        if (selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile!);

          const response = await uploadFile(formData);

          if (response?.success && response.fileUrl) {
            const { success, error } = await register(
              values,
              accountType!,
              response.fileUrl
            );

            if (error) {
              toast.error(error);
            }

            if (success) {
              toast.success(success);
              form.reset();
              setSelectedFile(null);
              setPreviewUrl(null);
            }
          }

          if (!response?.success) {
            toast.error("No se pudo subir el archivo.");
          }
        } else {
          const { success, error } = await register(values, accountType!);

          if (error) {
            toast.error(error);
          }

          if (success) {
            toast.success(success);
            form.reset();
          }
        }
      } catch (error) {
        toast.error("Algo salió mal al subir el archivo");
      }
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      alert("Por favor, selecciona un archivo PDF válido.");
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-[500px] text-white h-full">
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Teléfono</FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="co"
                    value={field.value} // Vincula el valor del formulario con el input
                    onChange={(phone) => {
                      field.onChange(phone); // Sincroniza el valor con useForm
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {accountType === "ADMIN" && (
            <div className="w-full mx-auto  space-y-4">
              <Label className="text-gray-300">
                RUT o documento que acredite propiedad del terreno
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="lg"
                  onClick={handleButtonClick}
                  className="flex items-center gap-2 w-full"
                >
                  <FileIcon className="size-4" />
                  <span>Seleccionar PDF</span>
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  hidden
                />
                {selectedFile && (
                  <Button
                    size="icon"
                    onClick={handleRemoveFile}
                    className="min-w-6 min-h-6 shrink-0 flex items-center rounded-full bg-rose-500 text-white"
                  >
                    <XIcon className="w-4 h-4" strokeWidth={3} />
                  </Button>
                )}
              </div>
              {selectedFile && (
                <div className="text-sm text-gray-500">
                  Archivo seleccionado: {selectedFile.name}
                </div>
              )}
              {previewUrl && (
                <div className="relative sm:min-h-[600px] min-h-[400px] w-full bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={previewUrl}
                    className="w-full h-full absolute inset-0 border-0"
                    title="PDF Preview"
                  />
                </div>
              )}
            </div>
          )}

          <Button
            disabled={
              !isValid ||
              isSubmitting ||
              (!selectedFile && accountType === "ADMIN") ||
              isLoading
            }
            className="w-full h-10 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full"
          >
            {isLoading && <Loader2 className="size-4 animate-spin shrink-0" />}
            Registrarse
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default FormRegister;
