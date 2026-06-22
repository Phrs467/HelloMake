# Fase 5: Modelagem de Banco (PostgreSQL & Prisma) - Bella Make

A modelagem abaixo cobre todas as entidades cruciais exigidas para a operação de um e-commerce escalável.

## Entidades Principais
1. **User (Usuários):** Clientes e Administradores (Controle de Acesso - RBAC).
2. **Address (Endereços):** Múltiplos endereços por cliente (Foco em entrega local).
3. **Category & Brand (Categorias e Marcas):** Organização do catálogo.
4. **Product (Produtos):** Produto base.
5. **ProductVariant (Variações e Estoque):** Cores, tons e tamanhos, contendo a quantidade em estoque (Inventory).
6. **ProductImage (Imagens):** Múltiplas imagens por produto.
7. **Review (Avaliações):** Notas e comentários deixados pelos clientes.
8. **Order & OrderItem (Pedidos e Itens do Pedido):** Histórico transacional.
9. **Payment (Pagamentos):** Status do PIX, Cartão, transação do Mercado Pago.
10. **Coupon (Cupons):** Gerenciamento de descontos.
11. **BlogArticle:** Conteúdo SEO.

## Prisma Schema (`schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELED
}

enum PaymentMethod {
  PIX
  CREDIT_CARD
  BOLETO
}

model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String?   // Null for OAuth
  googleId  String?   @unique
  role      Role      @default(USER)
  phone     String?
  points    Int       @default(0) // Programa de Fidelidade
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  addresses Address[]
  orders    Order[]
  reviews   Review[]
}

model Address {
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  street     String
  number     String
  complement String?
  neighborhood String
  city       String   // Foco: Aparecida de Goiânia
  state      String
  zipCode    String
  isDefault  Boolean  @default(false)
}

model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]
}

model Brand {
  id          String    @id @default(uuid())
  name        String    @unique
  slug        String    @unique
  logoUrl     String?
  products    Product[]
}

model Product {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String
  howToUse    String?
  ingredients String?
  price       Decimal   @db.Decimal(10, 2)
  promotionalPrice Decimal? @db.Decimal(10, 2)
  isFeatured  Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  categoryId  String
  category    Category  @relation(fields: [categoryId], references: [id])
  brandId     String
  brand       Brand     @relation(fields: [brandId], references: [id])

  variants    ProductVariant[]
  images      ProductImage[]
  reviews     Review[]
}

model ProductVariant {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  sku       String   @unique
  colorName String?  // Ex: "Tom 01", "Ruby"
  colorHex  String?  // Ex: "#FF0000" para plotar bolinhas de cor
  stock     Int      @default(0) // Controle de Estoque
  
  orderItems OrderItem[]
}

model ProductImage {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  url       String   // S3 URL
  isMain    Boolean  @default(false)
}

model Review {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  rating    Int      // 1 a 5
  comment   String?
  imageUrl  String?  // Foto do cliente
  createdAt DateTime @default(now())
}

model Coupon {
  id             String   @id @default(uuid())
  code           String   @unique // Ex: BEMVINDO10
  discountPercent Int?
  discountValue  Decimal? @db.Decimal(10, 2)
  minPurchase    Decimal? @db.Decimal(10, 2)
  expiresAt      DateTime?
  isActive       Boolean  @default(true)
  orders         Order[]
}

model Order {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(fields: [userId], references: [id])
  status        OrderStatus @default(PENDING)
  totalAmount   Decimal     @db.Decimal(10, 2)
  freightCost   Decimal     @db.Decimal(10, 2)
  discount      Decimal     @default(0) @db.Decimal(10, 2)
  couponId      String?
  coupon        Coupon?     @relation(fields: [couponId], references: [id])
  shippingAddress Json      // Salva um snapshot do endereço
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  items         OrderItem[]
  payment       Payment?
}

model OrderItem {
  id               String         @id @default(uuid())
  orderId          String
  order            Order          @relation(fields: [orderId], references: [id])
  productVariantId String
  variant          ProductVariant @relation(fields: [productVariantId], references: [id])
  quantity         Int
  unitPrice        Decimal        @db.Decimal(10, 2)
}

model Payment {
  id             String        @id @default(uuid())
  orderId        String        @unique
  order          Order         @relation(fields: [orderId], references: [id])
  method         PaymentMethod
  externalId     String?       // ID Mercado Pago
  status         String        // "approved", "pending"
  paymentDate    DateTime?
  pixQrCode      String?       @db.Text
  pixCopyPaste   String?       @db.Text
}

model BlogArticle {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  coverUrl    String?
  authorName  String
  publishedAt DateTime @default(now())
  seoTitle    String?
  seoDesc     String?
}
```

## Considerações de Banco (SQL Gerado em Background)
- O comando `npx prisma migrate dev` converterá esta estrutura no dialeto PostgreSQL.
- **Indexação (Desempenho):** O Prisma já cria índices para campos com `@unique` e `References`. Posteriormente, índices de texto poderão ser criados diretamente via SQL (`CREATE INDEX`) em `Product.name` e `Product.description` para a funcionalidade de Busca Inteligente.
- **Auditoria:** Logs de admin (ex: quem alterou o estoque) não foram modelados nativamente, mas serão inseridos no MongoDB ou em uma tabela simplificada de `AuditLog` no futuro.
