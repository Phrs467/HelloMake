import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando banco de dados...');
  await prisma.imagemProduto.deleteMany({});
  await prisma.produto.deleteMany({});
  await prisma.categoria.deleteMany({});
  await prisma.marca.deleteMany({});
  await prisma.administrador.deleteMany({});

  console.log('Criando administrador...');
  await prisma.administrador.create({
    data: {
      nome: 'Admin',
      email: 'admin@admin.com',
      senha: 'admin'
    }
  });

  console.log('Criando categorias...');
  const catMaquiagem = await prisma.categoria.create({
    data: { nome: 'Maquiagem', slug: 'maquiagem', descricao: 'Produtos para maquiagem facial, olhos e boca' }
  });
  const catSkincare = await prisma.categoria.create({
    data: { nome: 'Skincare', slug: 'skincare', descricao: 'Cuidados com a pele' }
  });
  const catPerfumaria = await prisma.categoria.create({
    data: { nome: 'Perfumaria', slug: 'perfumaria', descricao: 'Perfumes nacionais e importados' }
  });

  console.log('Criando marcas...');
  const marcaMac = await prisma.marca.create({ data: { nome: 'MAC Cosmetics', slug: 'mac-cosmetics' } });
  const marcaCerave = await prisma.marca.create({ data: { nome: 'CeraVe', slug: 'cerave' } });
  const marcaCH = await prisma.marca.create({ data: { nome: 'Carolina Herrera', slug: 'carolina-herrera' } });
  const marcaBocaRosa = await prisma.marca.create({ data: { nome: 'Boca Rosa Beauty', slug: 'boca-rosa-beauty' } });

  console.log('Criando produtos...');
  
  // Produto 1
  await prisma.produto.create({
    data: {
      nome: 'Base Líquida Studio Fix Fluid FPS 15',
      slug: 'base-liquida-studio-fix-fluid-mac',
      descricao: 'Uma base líquida de cobertura média a total, com acabamento matte e FPS 15.',
      preco: 259.00,
      destaque: true,
      estoque: 50,
      categoriaId: catMaquiagem.id,
      marcaId: marcaMac.id,
      imagens: {
        create: [
          { url: 'https://www.maccosmetics.com.br/media/export/cms/products/640x600/mac_sku_M2LP01_640x600_0.jpg', principal: true }
        ]
      }
    }
  });

  // Produto 2
  await prisma.produto.create({
    data: {
      nome: 'Batom Matte Lipstick',
      slug: 'batom-matte-lipstick-mac',
      descricao: 'Batom de acabamento matte clássico, alta pigmentação e longa duração.',
      preco: 129.00,
      destaque: true,
      estoque: 100,
      categoriaId: catMaquiagem.id,
      marcaId: marcaMac.id,
      imagens: {
        create: [
          { url: 'https://www.maccosmetics.com.br/media/export/cms/products/640x600/mac_sku_S31011_640x600_0.jpg', principal: true }
        ]
      }
    }
  });

  // Produto 3
  await prisma.produto.create({
    data: {
      nome: 'Loção Hidratante CeraVe',
      slug: 'locao-hidratante-cerave',
      descricao: 'Loção hidratante para rosto e corpo. Hidrata e ajuda a restaurar a barreira protetora da pele.',
      preco: 89.90,
      destaque: true,
      estoque: 200,
      categoriaId: catSkincare.id,
      marcaId: marcaCerave.id,
      imagens: {
        create: [
          { url: 'https://epocacosmeticos.vtexassets.com/arquivos/ids/207901-800-auto?v=637374026369530000&width=800&height=auto&aspect=true', principal: true }
        ]
      }
    }
  });

  // Produto 4
  await prisma.produto.create({
    data: {
      nome: 'Perfume Good Girl Eau de Parfum',
      slug: 'perfume-good-girl-edp',
      descricao: 'Perfume feminino marcante e sensual. Uma arma de sedução para a mulher moderna.',
      preco: 599.00,
      destaque: true,
      estoque: 20,
      categoriaId: catPerfumaria.id,
      marcaId: marcaCH.id,
      imagens: {
        create: [
          { url: 'https://epocacosmeticos.vtexassets.com/arquivos/ids/206584-800-auto?v=637172037989330000&width=800&height=auto&aspect=true', principal: true }
        ]
      }
    }
  });

  // Produto 5
  await prisma.produto.create({
    data: {
      nome: 'Bruma Fixadora Perfect M',
      slug: 'bruma-fixadora-boca-rosa',
      descricao: 'A Bruma Fixadora hidrata e ajuda a fixar a maquiagem, deixando um aspecto natural e iluminado.',
      preco: 69.90,
      destaque: false,
      estoque: 80,
      categoriaId: catMaquiagem.id,
      marcaId: marcaBocaRosa.id,
      imagens: {
        create: [
          { url: 'https://d2j6dbq0eux0bg.cloudfront.net/images/64879282/2723793616.jpg', principal: true }
        ]
      }
    }
  });

  console.log('Seed completo!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
