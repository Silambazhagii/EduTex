"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveHod(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: "Approved" },
    });
    revalidatePath("/superadmin");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function rejectHod(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: "Rejected" },
    });
    revalidatePath("/superadmin");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}
