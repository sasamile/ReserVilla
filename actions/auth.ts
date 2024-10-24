"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { Role } from "@prisma/client";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "./user";

export async function login(credentials: z.infer<typeof LoginSchema>) {
  const result = LoginSchema.safeParse(credentials);

  if (result.error) {
    return { error: "Credenciales invalidas!" };
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: process.env.DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" };
        default:
          return { error: "Algo salió mal en el proceso!" };
      }
    }

    throw error;
  }
}

export async function register(
  values: z.infer<typeof RegisterSchema>,
  role: Role,
  fileUrl?: string
) {
  const result = RegisterSchema.safeParse(values);

  if (result.error) {
    return { error: "Credenciales inválidos!" };
  }

  if (!role) {
    return { error: "Role requerido!" };
  }

  if (role === "ADMIN" && !fileUrl) {
    return {
      error: "RUT o documento que acredite propiedad del terreno requerido!",
    };
  }

  const { name, lastName, phone, email, password } = result.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "El correo ingresado ya está en uso!" };
    }

    await db.user.create({
      data: {
        name,
        lastName,
        phone,
        email,
        password: hashedPassword,
        role,
        isAdmin: role === "ADMIN",
        file: fileUrl,
        isActive: role === "USER",
      },
    });

    return { success: "Registro exitoso." };
  } catch (error) {
    return { error: "Algo salió mal en el proceso." };
  }
}
