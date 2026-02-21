const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("EduTexAdmin@2026!#", 10);

  const admin = await prisma.user.upsert({
    where: { email: "superadmin@edutex.com" },
    update: {
      password: hashedPassword,
      name: "EduTex Superadmin",
    },
    create: {
      name: "EduTex Superadmin",
      email: "superadmin@edutex.com",
      password: hashedPassword,
      role: "SUPERADMIN",
      status: "Approved",
    },
  });

  // Also handle the old 'admin@edutex.com' if it exists to avoid confusion
  await prisma.user.deleteMany({
    where: { 
      email: "admin@edutex.com",
      role: "SUPERADMIN"
    }
  });

  console.log("Superadmin created successfully:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
