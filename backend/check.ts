import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const produtos = await prisma.produto.findMany();
  console.log(produtos);
}

main().finally(() => prisma.$disconnect());
