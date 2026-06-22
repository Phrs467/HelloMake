# Fase 4: Arquitetura - Bella Make

A arquitetura foi desenhada para suportar alto tráfego, ser manutenível e escalável, utilizando princípios de Clean Architecture e SOLID.

## Estrutura de Pastas de Alto Nível

A raiz do projeto será um monorepo ou dividida logicamente entre Frontend, Backend e Infraestrutura.

```text
bellamake/
├── backend/                  # NestJS + Prisma
│   ├── src/
│   │   ├── core/             # Entidades de Domínio e Interfaces (Clean Arch)
│   │   ├── application/      # Casos de Uso (Use Cases/CQRS)
│   │   ├── infrastructure/   # Implementação de Repositories, Prisma, Serviços Externos
│   │   └── presentation/     # Controllers REST (NestJS)
│   ├── prisma/               # Schemas e Migrations do banco de dados
│   ├── test/                 # Testes E2E e Integração
│   └── Dockerfile
│
├── frontend/                 # Next.js 15 (App Router)
│   ├── src/
│   │   ├── app/              # Rotas, Layouts, Pages
│   │   ├── components/       # Componentes React (UI genéricos e específicos)
│   │   ├── hooks/            # Custom Hooks
│   │   ├── lib/              # Utils, Clients (Axios, Prisma, etc)
│   │   ├── store/            # Gerenciamento de Estado (Zustand ou Context)
│   │   └── types/            # Tipagens globais TypeScript
│   ├── public/               # Assets estáticos (Imagens, Ícones)
│   └── Dockerfile
│
├── infra/                    # Configurações de DevOps e Deploy
│   ├── docker-compose.yml    # Orquestração local (Postgres, Redis, Backend, Frontend)
│   ├── nginx/                # Configurações do Nginx/WAF
│   └── scripts/              # Scripts de CI/CD e Backup
└── README.md
```

## Padrões Arquiteturais

### 1. Clean Architecture & DDD no Backend
O backend (NestJS) será dividido em camadas:
- **Domain (Core):** Regras de negócio puras (ex: `Product`, `Order`, `User`). Não depende de nenhum framework.
- **Application (Use Cases):** Orquestração das regras de negócio (ex: `CreateOrderUseCase`).
- **Infrastructure:** Integração com banco de dados (Prisma), Cache (Redis), Gateway de Pagamento (Mercado Pago). É a única camada que conhece os detalhes de implementação (Repository Pattern).
- **Presentation:** Controladores do NestJS que recebem as requisições HTTP e as passam para os Use Cases.

### 2. CQRS e Event-Driven
- **Command Query Responsibility Segregation (CQRS):** Separação clara entre as operações de leitura (Queries - ex: listar produtos na home) e escrita (Commands - ex: fechar pedido). O NestJS suporta nativamente através da lib `@nestjs/cqrs`.
- **Event-Driven:** Quando um pedido é finalizado, disparamos um evento `OrderCreatedEvent`. Isso permite que módulos independentes reajam (ex: Módulo de E-mail envia confirmação, Módulo de Estoque desconta produto, sem travar o request principal).

### 3. Frontend (Next.js 15 App Router)
- **Server Components:** Para SEO impecável e carregamento rápido (SSR), a renderização da Home, Categoria e Página de Produto será feita no servidor.
- **Client Components:** Apenas para partes interativas (Framer Motion, Gerenciamento de Carrinho, Filtros avançados).
- **State Management:** Utilizaremos `Zustand` para o estado global do Carrinho e Favoritos (leve e rápido).

### 4. Cache Strategy (Redis)
- Consultas pesadas (ex: Categorias de produtos da Home, Menu de navegação) serão cacheadas no Redis.
- A invalidação ocorrerá via eventos (ex: Quando um produto for alterado no Painel Admin, dispara um evento que limpa o cache específico da categoria).

### 5. Armazenamento (AWS S3)
- Imagens de produtos, banners e avatares não ficarão no servidor. Serão enviados diretamente (Upload) ou via Backend para um bucket S3 (ou compatível, como MinIO localmente/DigitalOcean Spaces na produção), servidos via CDN para máxima performance.
