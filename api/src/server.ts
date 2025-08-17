import dotenv from 'dotenv';

import app from './app';
import { PrismaClient } from './generated/prisma';

dotenv.config();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main();
