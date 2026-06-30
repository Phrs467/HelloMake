import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll(@Query('query') query: string) {
    if (query) {
      return this.prisma.categoria.findMany({
        where: {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            { descricao: { contains: query, mode: 'insensitive' } }
          ]
        },
      });
    }

    return this.prisma.categoria.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.categoria.findUnique({
      where: { id },
    });
  }

  @Post()
  async create(@Body() data: { name: string; description?: string; slug?: string }) {
    if (!data.name) {
      throw new BadRequestException('O nome da categoria é obrigatório.');
    }

    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Verifica se já existe uma categoria com este slug
    const existing = await this.prisma.categoria.findUnique({ where: { slug } });
    if (existing) {
      throw new BadRequestException('Já existe uma categoria com este nome/slug.');
    }

    return this.prisma.categoria.create({
      data: {
        nome: data.name,
        slug: slug,
        descricao: data.description || null,
      }
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: { name?: string; description?: string }) {
    const updateData: any = {};
    if (data.name) {
      updateData.nome = data.name;
      updateData.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (data.description !== undefined) {
      updateData.descricao = data.description;
    }

    return this.prisma.categoria.update({
      where: { id },
      data: updateData
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.categoria.delete({
      where: { id }
    });
  }
}
