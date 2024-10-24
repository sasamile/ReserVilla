import { object, string, z } from "zod";

export const LoginSchema = object({
  email: z
    .string()
    .email({ message: "Por favor ingresa un correo válido." })
    .trim(),
  password: z.string().min(1).trim(),
});

export const RegisterSchema = object({
  email: string({ required_error: "El correo es requerido." })
    .min(1, "El correo es requerido.")
    .email("Correo no válido."),
  password: z
    .string()
    .min(8, { message: "Debe tener al menos 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "Debe contener por lo menos 1 letra." })
    .regex(/[0-9]/, { message: "Debe contener al menos 1 numero." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Debe contener al menos 1 carácter especial.",
    })
    .trim(),
  name: string({ required_error: "El nombre es requerido." })
    .min(1, {
      message: "Debe contener menos un carácter.",
    })
    .trim(),
  lastName: string({ required_error: "El apellido es requerido." })
    .min(1, {
      message: "Debe contener menos un carácter.",
    })
    .trim(),
  phone: string({ required_error: "Número de teléfono es requerido" })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message:
        "El número de teléfono debe ser válido y contener entre 7 y 15 dígitos.",
    })
    .trim(),
});

// export const RegisterSchema = object({
//   email: string({ required_error: "Email is required" })
//     .min(1, "Email is required")
//     .email("Invalid email"),
//   password: z
//     .string()
//     .min(8, { message: "Debe tener al menos 8 caracteres" })
//     .regex(/[a-zA-Z]/, { message: "Debe contener por lo menos 1 letra." })
//     .regex(/[0-9]/, { message: "Debe contener al menos 1 numero." })
//     .regex(/[^a-zA-Z0-9]/, {
//       message: "Debe contener al menos 1 caracterer especial.",
//     })
//     .trim(),
//   name: string({ required_error: "Name is required" }),
//   lastName: string({ required_error: "Apellido is required" }),
//   phone: string({ required_error: "Número de teléfono es requerido" }),
//   isAdmin: z.boolean().optional(), // Campo para verificar si el usuario es admin
//   file: z
//     .string()
//     .optional()
//     .refine((val) => val !== undefined, {
//       message: "El archivo es requerido", // Mensaje de error si no se envía el documento
//     }),
// });

export const PasswordResetSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
});
