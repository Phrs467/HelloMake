import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './presentation/products.controller';
import { AuthController } from './presentation/auth.controller';
import { CategoriesController } from './presentation/categories.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, AuthController, CategoriesController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
