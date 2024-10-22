// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const { success, data, error } = LoginSchema.safeParse(credentials);

          if (!success) {
            throw new Error("Credenciales inválidas");
          }

          const user = await db.user.findUnique({
            where: { email: data.email },
          });

          if (!user) {
            throw new Error("Usuario no encontrado");
          }

          if (!user.password) {
            throw new Error("Contraseña no establecida");
          }

          const isValid = await bcrypt.compare(data.password, user.password);

          if (!isValid) {
            throw new Error("Contraseña inválida");
          }

          // Validación de rol y estado
          if (user.role === "ADMIN" && !user.isActive) {
            throw new Error("Usuario no autorizado, cuenta inactiva");
          }

          // Validación final de roles
          if (
            user.role === "SUPERUSER" ||
            user.role === "USER" ||
            (user.role === "ADMIN" && user.isActive)
          ) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              isActive: user.isActive ?? true,
            };
          }

          throw new Error("Usuario no autorizado");
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isActive = user.isActive;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.isActive = token.isActive as boolean;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
