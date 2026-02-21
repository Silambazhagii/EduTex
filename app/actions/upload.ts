"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { generatePresignedUrl } from "@/lib/s3";

export async function getUploadUrl(fileName: string, fileType: string) {
  const session = await auth();
  if (!session?.user) return { error: "Not logged in" };

  try {
    const { url, key } = await generatePresignedUrl(fileName, fileType);
    return { success: true, url, key };
  } catch (error: any) {
    return { error: error.message || "Failed to generate upload URL" };
  }
}

export async function saveDocumentRecord(data: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Not logged in" };

  const title = data.get("title") as string;
  const fileUrl = data.get("fileUrl") as string;
  const format = data.get("format") as string;
  const semester = data.get("semester") as string;
  const subject = data.get("subject") as string;
  const unit = data.get("unit") as string;

  if (!title || !fileUrl || !format || !semester || !subject || !unit) {
    return { error: "Missing required document details" };
  }

  // Gatekeeper Logic:
  // Faculty/Admin -> Approved immediately
  // Student -> Pending approval
  const isFacultyOrAdmin = ["FACULTY", "HOD", "SUPERADMIN"].includes((session.user as any).role as string);
  const status = isFacultyOrAdmin ? "Approved" : "Pending";

  const collegeName = (session.user as any).collegeName as string;
  const department = (session.user as any).department as string;

  if (!collegeName || !department) {
    return { error: "Your college or department is not registered to this platform." };
  }

  try {
    // Assert prisma Document type explicitly
    await (prisma as any).document.create({
      data: {
        title,
        fileUrl,
        format,
        semester,
        subject,
        unit,
        collegeName,
        department,
        status,
        uploaderId: session.user.id as string,
      }
    });

    // Revalidate paths to update UI instantly
    revalidatePath("/admin");
    revalidatePath("/faculty");
    revalidatePath("/student");
    revalidatePath("/repository");

    return { success: true, message: status === "Approved" ? "Uploaded perfectly!" : "Submitted for approval." };
  } catch (e: any) {
    return { error: e.message || "Database error saving document." };
  }
}

export async function getLiveDocuments(filterQuery: string, filterSem: string) {
  const session = await auth();
  if (!session?.user) return [];

  const collegeName = (session.user as any).collegeName as string;
  const department = (session.user as any).department as string;

  if (!collegeName || !department) return [];

  // Students and Faculty see only the live/approved documents in the repository
  const docs = await (prisma as any).document.findMany({
    where: {
      status: "Approved",
      collegeName,
      department,
      ...(filterSem ? { semester: filterSem } : {}),
      ...(filterQuery ? {
        OR: [
          { title: { contains: filterQuery, mode: 'insensitive' } },
          { subject: { contains: filterQuery, mode: 'insensitive' } },
        ]
      } : {})
    },
    orderBy: { createdAt: "desc" },
    include: { uploader: { select: { name: true, role: true } } }
  });

  return docs;
}

export async function getPendingDocuments() {
  const session = await auth();
  if (!session?.user || !["FACULTY", "HOD", "SUPERADMIN"].includes((session.user as any).role)) {
    return [];
  }

  const collegeName = (session.user as any).collegeName as string;
  const department = (session.user as any).department as string;

  if (!collegeName || !department) return [];

  const pending = await (prisma as any).document.findMany({
    where: { 
      status: "Pending",
      collegeName,
      department
    },
    orderBy: { createdAt: "asc" },
    include: { uploader: { select: { name: true, usn: true } } }
  });

  return pending;
}

export async function reviewDocument(docId: string, action: "Approve" | "Reject") {
  const session = await auth();
  if (!session?.user || !["FACULTY", "HOD", "SUPERADMIN"].includes((session.user as any).role)) {
    return { error: "Unauthorized" };
  }

  try {
    await (prisma as any).document.update({
      where: { id: docId },
      data: { status: action === "Approve" ? "Approved" : "Rejected" }
    });
    
    revalidatePath("/admin");
    revalidatePath("/faculty");
    revalidatePath("/repository");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}
