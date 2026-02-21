"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function addFaculty(data: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "HOD") {
    return { error: "Unauthorized" };
  }

  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const department = data.get("department") as string;

  if (!name || !email || !password || !department) {
    return { error: "Missing required fields" };
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "User with this Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department,
        role: "FACULTY",
        status: "Approved", // Faculty added by HOD goes live immediately
      },
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
