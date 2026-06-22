# Fase 3: UX/UI (Wireframes Textuais) - Bella Make

A estrutura abaixo descreve a organização visual (Wireframes) baseada na referência e nas melhores práticas de conversão.

## 1. Home
- **Header:**
  - Logo Bella Make (Esquerda).
  - Barra de Busca Inteligente com lupa (Centro).
  - Ícones: Login, Favoritos, Carrinho (com badge de quantidade) (Direita).
  - Menu de Navegação Horizontal: Maquiagem, Skincare, Perfumaria, Acessórios, Kits, Ofertas.
- **Hero Banner:**
  - Carrossel dinâmico (Framer Motion) com promoções principais (ex: Frete Grátis Ap. Goiânia).
- **Seção: Destaques (Features):**
  - 4 ícones: Compra Segura, Entrega Local Rápida, Parcelamento no Cartão, Desconto no PIX.
- **Seção: Categorias Populares:**
  - Cards redondos/arredondados com imagens de categorias (Bases, Batons, Skincare).
- **Seção: Mais Vendidos (Carrossel de Produtos):**
  - Cards de produto: Imagem, Marca, Nome, Preço Riscado, Preço Atual, Botão "Comprar".
- **Seção: Banner Secundário:**
  - Chamada para a aba de "Kits de Presente".
- **Seção: Marcas Parceiras:**
  - Logos em escala de cinza/suave: Bruna Tavares, Boca Rosa, Franciny Ehlke, etc.
- **Footer:**
  - Links Úteis, Contato (WhatsApp, Email), Selos de Segurança, Métodos de Pagamento, CNPJ, Endereço.

## 2. Categoria / Catálogo
- **Header** (Padrão).
- **Breadcrumbs:** Home > Maquiagem > *Bases*.
- **Sidebar (Filtros - Esquerda):**
  - Preço (Range Slider).
  - Marca (Checkboxes).
  - Tom de Pele (Cores/Tags).
  - Disponibilidade (Apenas em Estoque).
- **Área Principal:**
  - Título da Categoria e Ordenação (Mais Relevantes, Menor Preço).
  - Grid de Produtos (Responsive: 2 colunas no mobile, 4 colunas no desktop).
  - Paginação infinita (Load More).

## 3. Página do Produto
- **Breadcrumbs** (Padrão).
- **Layout Split (2 Colunas no Desktop):**
  - **Esquerda (Imagens):** Imagem principal grande (com Zoom on Hover). Miniaturas abaixo.
  - **Direita (Detalhes):**
    - Nome do Produto e Marca.
    - Estrelas de Avaliação (ex: 4.8/5.0).
    - Preço (com destaque para PIX) e opções de Parcelamento.
    - Seletor de Variações (Cor/Tom da base - botões visuais).
    - Campo para cálculo de Frete e Prazo.
    - Botão Grande (Rosa/Pink) "Adicionar ao Carrinho".
    - Botão Secundário de "Favoritar" (Coração).
- **Seção Abaixo:**
  - Abas: Descrição Completa, Como Usar, Composição.
  - Avaliações de Clientes (com possibilidade de anexar foto).
  - Carrossel: "Quem comprou isso também comprou..."

## 4. Carrinho (Sidebar / Drawer)
- Abre deslizando da direita.
- Lista de Itens (Imagem miniatura, Nome, Quantidade com +/-).
- Subtotal.
- Barra de Progresso de Frete Grátis ("Faltam R$ 30 para Frete Grátis").
- Botão "Finalizar Compra".

## 5. Checkout (Página Focada - Sem distrações)
- Header simplificado (Apenas Logo e ícone de Cadeado).
- **Passo 1: Identificação:** E-mail ou Login Social.
- **Passo 2: Entrega:** CEP, Endereço. Opções de Frete (Motoboy Ap. Goiânia, PAC, Sedex).
- **Passo 3: Pagamento:** PIX (gera QR Code/Copia e Cola), Cartão (Integração Transparente).
- **Resumo Lateral (Sticky):** Resumo do pedido e input de Cupom de Desconto.

## 6. Outras Telas Planejadas
- **Minha Conta:** Dashboard do cliente, Meus Pedidos, Meus Dados, Endereços, Favoritos, Pontos (Fidelidade).
- **Autenticação (Login/Cadastro):** Layout Split com imagem inspiracional de beleza na direita e formulário na esquerda.
- **Blog:** Listagem de artigos (ex: "Tendências de Maquiagem 2026") para captação via SEO.
