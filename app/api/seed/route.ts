import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existing = await prisma.user.findFirst({
      where: { role: "SUPERADMIN" },
    });

    if (existing) {
      return NextResponse.json({ message: "Superadmin already exists", user: existing.email });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.create({
      data: {
        name: "System Superadmin",
        email: "admin@edutex.com",
        password: hashedPassword,
        role: "SUPERADMIN",
        status: "Approved",
      },
    });

    return NextResponse.json({ message: "Superadmin created successfully", user: admin.email });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
