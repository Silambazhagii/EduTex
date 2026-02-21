"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerStudent(data: FormData) {
  const usn = data.get("usn") as string;
  const name = data.get("name") as string;
  const semester = data.get("semester") as string;
  const email = (data.get("email") as string) || null;
  const password = data.get("password") as string;
  const collegeName = data.get("collegeName") as string;
  const department = data.get("department") as string;

  if (!usn || !name || !semester || !password || !collegeName || !department) {
    return { error: "Missing required fields" };
  }

  const existing = await prisma.user.findFirst({
    where: { 
      OR: [
        { usn },
        ...(email ? [{ email }] : [])
      ]
    },
  });

  if (existing) {
    return { error: "User with this USN or Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        usn,
        semester,
        email,
        collegeName,
        department,
        password: hashedPassword,
        role: "STUDENT",
        status: "Approved", // Student goes live immediately 
      },
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function registerHod(data: FormData) {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const department = data.get("department") as string;
  const collegeName = data.get("collegeName") as string;
  const password = data.get("password") as string;

  if (!name || !email || !department || !collegeName || !password) {
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
        department,
        collegeName,
        password: hashedPassword,
        role: "HOD",
        status: "Pending", // Requires Superadmin approval
      },
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
