const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst({
    where: { role: "SUPERADMIN" },
  });

  if (existing) {
    console.log("Superadmin already exists:", existing.email);
    return;
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
