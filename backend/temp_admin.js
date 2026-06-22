const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
async function main() { 
  const admin = await prisma.administrador.findUnique({ where: { email: 'admin@admin.com' } }); 
  if (!admin) { 
    await prisma.administrador.create({ data: { nome: 'Admin', email: 'admin@admin.com', senha: 'admin' } }); 
    console.log('Admin created'); 
  } else { 
    console.log('Admin exists'); 
  } 
} 
main().finally(() => prisma.$disconnect());
