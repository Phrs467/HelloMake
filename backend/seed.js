const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({})

async function main() {
  console.log('Iniciando inserção no Banco de Dados SQLite...');
  
  const product = await prisma.product.create({
    data: {
      name: 'Base Líquida Boca Rosa Beauty HD',
      slug: 'base-liquida-boca-rosa-hd',
      description: 'Base de alta cobertura com acabamento matte perfeito.',
      price: 59.90,
      category: {
        connectOrCreate: {
          where: { slug: 'maquiagem' },
          create: { name: 'Maquiagem', slug: 'maquiagem' }
        }
      },
      brand: {
        connectOrCreate: {
          where: { slug: 'boca-rosa' },
          create: { name: 'Boca Rosa', slug: 'boca-rosa' }
        }
      }
    }
  });

  console.log('Produto Criado com Sucesso:', product.name);
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
