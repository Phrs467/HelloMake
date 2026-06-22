# Fase 8: Funcionalidades e Integrações - Bella Make

Esta fase cobre as integrações de terceiros e funcionalidades core avançadas do e-commerce.

## 1. Pagamentos (Mercado Pago API)
- **PIX:** Integração via API para gerar QR Code Dinâmico e "Copia e Cola". Webhook configurado no backend (`/api/v1/webhooks/mercadopago`) para receber a notificação de `payment.created` e alterar o status do pedido para `PAID` automaticamente, disparando o evento de separação de estoque.
- **Cartão de Crédito:** Checkout Transparente utilizando o SDK do Mercado Pago no Frontend. A tokenização do cartão ocorre no client-side, e apenas o token é enviado ao backend por motivos de segurança (PCI Compliance).

## 2. Logística e Frete
- **Correios & Melhor Envio:** Integração via API para cálculo de frete em tempo real no carrinho e na página do produto.
- **Entrega Local (Motoboy):** Lógica customizada: Se o CEP pertencer a Aparecida de Goiânia e o pedido for feito até as 12h (meio-dia), a opção "Same-Day Delivery" (Entrega no mesmo dia) aparece ativada por uma taxa fixa.

## 3. Autenticação (NextAuth / JWT)
- **Login Social:** Integração com Google OAuth. O usuário clica em "Entrar com Google", o NextAuth gera a sessão, o backend cria o usuário (se não existir) e devolve o JWT.
- **Recuperação de Senha:** Envio de e-mail transacional (Nodemailer + AWS SES) contendo um token JWT de uso único com expiração de 15 minutos.

## 4. Busca Inteligente (ElasticSearch / PostgreSQL FTS)
- Implementação de Full Text Search (FTS) no PostgreSQL com dicionário em português.
- Uso de `similarity()` da extensão `pg_trgm` para tolerância a erros de digitação (ex: encontrar "Boca Rosa" se o usuário digitar "Boka Roza").

## 5. Marketing e Retenção
- **Programa de Fidelidade (Cashback):** A cada R$ 1,00 gasto, o usuário ganha 1 Ponto. 100 pontos equivalem a R$ 5,00 de desconto na próxima compra.
- **Avaliações com Fotos:** Uso do AWS S3 para permitir que clientes façam upload de fotos na avaliação.
- **Integrações de Tracking:** Meta Pixel (Facebook) via Conversion API (CAPI no backend) e Google Analytics 4 (GA4) configurados globalmente no `layout.tsx` do Next.js.
