import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
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
    // Busca ou cria a categoria e a marca usando os nomes fornecidos
    let categoria = await this.prisma.categoria.findUnique({ where: { slug: data.categorySlug } });
    if (!categoria) {
      categoria = await this.prisma.categoria.create({
        data: { nome: data.categoryName, slug: data.categorySlug }
      });
    }

    let marca = await this.prisma.marca.findUnique({ where: { slug: data.brandSlug } });
    if (!marca) {
      marca = await this.prisma.marca.create({
        data: { nome: data.brandName, slug: data.brandSlug }
      });
    }

    // Cria o Produto
    return this.prisma.produto.create({
      data: {
        nome: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        descricao: data.description,
        preco: data.price,
        estoque: data.stock || 10,
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
