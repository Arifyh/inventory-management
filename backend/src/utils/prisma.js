const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
require('dotenv').config();

const url = new URL(process.env.DATABASE_URL || 'mysql://root:@localhost:3306/inventory_db');

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.replace('/', ''),
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
