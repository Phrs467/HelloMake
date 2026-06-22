import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('login')
  async login(@Body() data: any) {
    const { email, password } = data;

    // Garante que o administrador específico existe no banco
    if (email === 'admin@hellomake.com.br' && password === 'B3llaM@k3!2026#Sec') {
      const exists = await this.prisma.administrador.findUnique({
        where: { email }
      });
      if (!exists) {
        await this.prisma.administrador.create({
          data: {
            nome: 'Administrador Hello Make',
            email,
            senha: password
          }
        });
      }
    }

    // Tenta encontrar o administrador no banco de dados
    const admin = await this.prisma.administrador.findUnique({
      where: { email }
    });

    if (admin && admin.senha === password) {
      // Senha validada com sucesso no banco em português
      const fakeJwt = Buffer.from(JSON.stringify({ role: 'ADMIN', email })).toString('base64');
      return { token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${fakeJwt}.signature_fake` };
    }

    throw new HttpException('Credenciais inválidas ou acesso não autorizado.', HttpStatus.UNAUTHORIZED);
  }
}
