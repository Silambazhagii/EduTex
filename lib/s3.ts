import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function generatePresignedUrl(fileName: string, fileType: string) {
  // Enforce precise 4 formats: PDF, PPT/PPTX, DOC/DOCX, JPG/PNG 
  const allowedTypes = [
    'application/pdf', 
    'application/vnd.ms-powerpoint', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ];

  if (!allowedTypes.includes(fileType)) {
    throw new Error("Invalid file format. Only PDF, PPT, DOC, and JPG/PNG are allowed.");
  }

  // Generate unique filename to avoid overrides
  const uniqueFileName = `${Date.now()}-${fileName.replace(/\s+/g, "_")}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: uniqueFileName,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiration
  return { url, key: uniqueFileName };
}
