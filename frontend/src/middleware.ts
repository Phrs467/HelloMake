import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pega o caminho atual que o usuário quer acessar
  const path = request.nextUrl.pathname;

  // Verifica se é uma rota de Admin (mas ignora a tela de login)
  if (path.startsWith('/admin') && !path.startsWith('/login/admin')) {
    
    // Verifica se o usuário tem o cookie com o token
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Se não tem token, redireciona para a tela de login
      return NextResponse.redirect(new URL('/login/admin', request.url));
    }
  }

  // Se tem token ou não é rota de admin, deixa passar livremente
  return NextResponse.next();
}

// Configura o middleware para rodar apenas nas rotas necessárias
export const config = {
  matcher: ['/admin/:path*'],
};
