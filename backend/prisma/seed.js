const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
require("dotenv").config();

const url = new URL(
  process.env.DATABASE_URL || "mysql://root:@localhost:3308/inventory_db",
);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: parseInt(url.port) || 3308,
  user: url.username,
  password: url.password,
  database: url.pathname.replace("/", ""),
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@ikonik.co.id";
  const password = await bcrypt.hash("ikonik2024", 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password,
      role: "ADMIN",
    },
  });

  console.log("Seeded admin:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
