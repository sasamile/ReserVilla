import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, lastName, file, isAdmin } =
      await req.json();

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) return { error: "Email ya Existe" };

    const passwordHas = await bcrypt.hash(password, 10);

    const data = await db.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHas,
        phone,
        lastName,
        file,
        isAdmin: isAdmin,
        role: isAdmin ? "ADMIN" : "USER",
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error 500" };
  }
}
