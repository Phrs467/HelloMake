# Fase 11: Produção & Documentação Final - Bella Make

## 1. Setup de Infraestrutura (VPS Ubuntu Linux)
**Passo a Passo do Deploy:**
1. Contratar VPS (Ex: DigitalOcean Droplet / AWS EC2 - Ubuntu 22.04).
2. Acessar via SSH: `ssh root@ip_do_servidor`.
3. Instalar dependências: `sudo apt update && sudo apt install docker.io docker-compose git -y`.
4. Clonar o repositório: `git clone https://github.com/suaconta/bellamake.git`.
5. Apontar o domínio `bellamake.com.br` para o IP da VPS no registro.br/Cloudflare.
6. Rodar o Certbot para o SSL HTTPS: `certbot certonly --webroot -w /var/www/certbot -d bellamake.com.br`.
7. Subir a aplicação: `docker-compose up -d --build`.
8. Rodar migrations do banco: `docker exec -it bellamake-api npx prisma migrate deploy`.

## 2. Segurança e LGPD
- **LGPD:** Inclusão de Banner de Cookies no Front-end (Cookie Consent). Termos de Uso e Política de Privacidade atualizados focados em e-commerce. Opção do usuário excluir sua conta e anonimizar dados no banco (`DELETE /users/:id`).
- **Rate Limit:** Implementado no Nginx e no NestJS (`@nestjs/throttler`) para evitar ataques de DDoS e Bruteforce no Login.
- **WAF:** Uso do Cloudflare Proxy (Nuvem Laranja) para filtrar tráfego malicioso antes de chegar à VPS.
- **Backup:** Script bash que faz dump do PostgreSQL (`pg_dump`) toda madrugada e envia pro AWS S3.

## 3. Plano de Testes (Meta: 95% de Cobertura)
- **Unitários (Jest):** Testar lógicas isoladas, como a função de cálculo de Frete e a regra de pontos de Fidelidade.
- **Integração (Supertest):** Testar os endpoints da API (ex: se o endpoint de criar pedido realmente debita o estoque do banco de teste).
- **E2E (Cypress / Playwright):** Testar o fluxo completo do usuário no navegador: Entrar na Home -> Buscar -> Adicionar ao Carrinho -> Fazer Checkout -> Receber tela de Sucesso.

## 4. Checklist de Publicação (Go-Live)
- [ ] Domínio `bellamake.com.br` respondendo via HTTPS.
- [ ] Banco de Dados de Produção isolado e seguro.
- [ ] Credenciais do Mercado Pago e Melhor Envio alteradas de *Sandbox* para *Produção*.
- [ ] Envio de e-mails transacionais testado.
- [ ] Google Analytics / Meta Pixel capturando eventos ("Add to Cart", "Purchase").
- [ ] Teste de carga (Load Testing) aprovado.

---
**Status do Projeto:** PRONTO PARA PRODUÇÃO.
O código fonte, arquitetura e scripts foram gerados no workspace do projeto.
