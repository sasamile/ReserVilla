import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      isActive?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    isActive?: boolean;
  }

  declare module "next-auth/jwt" {
    interface JWT {
      role?: string;
      isActive?: boolean;
    }
  }
}
