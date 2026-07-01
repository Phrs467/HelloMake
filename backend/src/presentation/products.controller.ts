import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll(@Query('query') query: string) {
    if (query) {
      return this.prisma.produto.findMany({
        where: {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            { descricao: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          categoria: true,
          marca: true,
          imagens: true,
        }
      });
    }

    return this.prisma.produto.findMany({
      include: {
        categoria: true,
        marca: true,
        imagens: true,
      }
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: {
        categoria: true,
        marca: true,
        imagens: true,
      }
    });
  }

  @Post()
  async create(@Body() data: any) {
    const price = typeof data.price === 'number' && !isNaN(data.price) ? data.price : parseFloat(data.price);
    const stock = typeof data.stock === 'number' && !isNaN(data.stock) ? data.stock : parseInt(data.stock, 10);

    if (isNaN(price)) {
      throw new BadRequestException('O preço fornecido é inválido.');
    }

    // Busca ou cria a categoria usando OR para evitar duplicados ou conflitos de unique constraint
    const categoryName = data.categoryName?.trim();
    const categorySlug = data.categorySlug?.trim() || categoryName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

    let categoria = await this.prisma.categoria.findFirst({
      where: {
        OR: [
          { slug: categorySlug },
          { nome: categoryName }
        ]
      }
    });

    if (!categoria) {
      categoria = await this.prisma.categoria.create({
        data: { nome: categoryName, slug: categorySlug }
      });
    }

    // Busca ou cria a marca usando OR para evitar conflito de unique constraint (nome/slug)
    const brandName = data.brandName?.trim();
    const brandSlug = data.brandSlug?.trim() || brandName?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

    let marca = await this.prisma.marca.findFirst({
      where: {
        OR: [
          { slug: brandSlug },
          { nome: brandName }
        ]
      }
    });

    if (!marca) {
      marca = await this.prisma.marca.create({
        data: { nome: brandName, slug: brandSlug }
      });
    }

    // Gera um slug limpo e único para o Produto
    const baseSlug = data.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    let productSlug = baseSlug;
    let slugExists = await this.prisma.produto.findUnique({ where: { slug: productSlug } });
    let counter = 1;
    while (slugExists) {
      productSlug = `${baseSlug}-${counter}`;
      slugExists = await this.prisma.produto.findUnique({ where: { slug: productSlug } });
      counter++;
    }

    // Cria o Produto
    return this.prisma.produto.create({
      data: {
        nome: data.name.trim(),
        slug: productSlug,
        descricao: data.description,
        preco: price,
        estoque: isNaN(stock) ? 10 : stock,
        categoriaId: categoria.id,
        marcaId: marca.id,
        imagens: {
          create: data.images.map((url: string, index: number) => ({
            url,
            principal: index === 0
          }))
        }
      },
      include: {
        categoria: true,
        marca: true,
        imagens: true
      }
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    // Primeiro, atualiza os dados básicos do produto
    const produto = await this.prisma.produto.update({
      where: { id },
      data: {
        nome: data.name,
        descricao: data.description,
        preco: data.price,
        estoque: data.stock
      }
    });

    // Se vieram imagens no request, atualiza
    if (data.images && Array.isArray(data.images) && data.images.length > 0) {
      // Deleta as antigas
      await this.prisma.imagemProduto.deleteMany({
        where: { produtoId: id }
      });
      
      // Insere as novas (index 0 é a principal)
      await this.prisma.produto.update({
        where: { id },
        data: {
          imagens: {
            create: data.images.map((url: string, index: number) => ({
              url,
              principal: index === 0
            }))
          }
        }
      });
    }

    return produto;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.produto.delete({
      where: { id }
    });
  }
}
