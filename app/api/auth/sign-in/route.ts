// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validación inicial con Zod
    const { success, data, error } = LoginSchema.safeParse(body);

    if (!success) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 400 }
      );
    }

    // Verificar si el usuario existe primero
    const user = await db.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    // Verificar contraseña
    if (!user.password) {
      return NextResponse.json(
        { error: "Contraseña no establecida" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Contraseña inválida" },
        { status: 401 }
      );
    }

    // Verificar rol y estado
    if (user.role === "ADMIN" && !user.isActive) {
      return NextResponse.json(
        { error: "Usuario no autorizado, cuenta inactiva" },
        { status: 403 }
      );
    }

    // Verificar permisos según rol
    if (
      user.role === "SUPERUSER" ||
      user.role === "USER" ||
      (user.role === "ADMIN" && user.isActive)
    ) {
      // Hacer el signIn de next-auth
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        return NextResponse.json({ error: result.error }, { status: 401 });
      }

      // Retornar usuario sin la contraseña
      const { password, ...userWithoutPassword } = user;

      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
        url: result?.url || "/",
      });
    }

    return NextResponse.json(
      { error: "Usuario no autorizado" },
      { status: 403 }
    );
  } catch (error) {
    console.error("Login error details:", error);

    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.cause?.err?.message || "Error de autenticación" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
