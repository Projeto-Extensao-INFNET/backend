# Backend Projeto Extensão

Este repositório contém o backend do Projeto **FUTURO NOME DO PROJETO**, desenvolvido com NestJS, Prisma e PostgreSQL. O objetivo é fornecer uma API robusta, escalável e de fácil manutenção para aplicações web e mobile.

## Tecnologias principais

- **Node.js** (>= 22.15.1) — Ambiente de execução JavaScript
- **pnpm** (10.12.1) — Gerenciador de pacotes rápido e eficiente
- **NestJS** — Framework para aplicações Node.js escaláveis
- **Prisma ORM** — Mapeamento objeto-relacional para banco de dados
- **PostgreSQL** — Banco de dados relacional
- **Vitest** — Testes automatizados (unitários e E2E)
- **Docker** — Containers para ambientes de desenvolvimento e produção
- **ESLint + Prettier** — Linting e formatação de código
- **SWC** — Compilador rápido para TypeScript/JavaScript
- **Husky + lint-staged + Commitlint** — Garantem padrões de código e mensagens de commit
- **Terraform (CDKTF)** — Infraestrutura como código
  
## Sobre os arquivos de configuração e ambientes

O projeto utiliza diferentes arquivos `.env` para separar as configurações de cada ambiente:

- `.env`: ambiente de desenvolvimento local (porta, banco, CORS, etc).
- `.env.test`: ambiente de testes unitários/integrados (banco e porta isolados para testes).
- `.env.production`: ambiente de produção (configurações seguras para deploy).

Esses arquivos permitem rodar a aplicação em diferentes contextos sem alterar o código, apenas mudando as variáveis de ambiente.

Outros arquivos importantes:

- `docker-compose.dev.yml` e `docker-compose.prod.yml`: orquestram containers para desenvolvimento e produção, garantindo ambientes isolados e reprodutíveis.
- `Dockerfile.dev` e `Dockerfile.prod`: definem como as imagens são construídas para desenvolvimento e produção.
- `prisma/`: contém o schema do banco, seeds e migrations, usados pelo Prisma ORM.
- `terraform/`: configuração de infraestrutura como código usando CDKTF (Cloud Development Kit for Terraform).
- `.husky/`: hooks de git para automação de tarefas antes de commits/push.
- `.lintstagedrc.json`: configuração do lint-staged para executar formatação e linting em arquivos staged.
- `.swcrc`: configuração do SWC para compilação rápida.
- `vitest.config.ts` e `vitest.config.e2e.ts`: configurações para testes unitários e E2E com Vitest.

## Como rodar localmente

### Com Docker (recomendado)

1. **Clone o repositório:**

   ```sh
   git clone <url-do-repositório>
   cd backend
   ```

2. **Configure as variáveis de ambiente:**
   - Copie `.env.example` e/ou `.env.test.example` para `.env` e/ou `.env.test` e ajuste conforme necessário.

3. **Suba o banco de dados com Docker (ambiente de desenvolvimento):**

   ```sh
   pnpm docker:dev
   ```

Após o `docker:dev`, a imagem é construída, as dependências são instaladas (no build), o Prisma Client é gerado e a aplicação inicia automaticamente.

Observações para Docker:

- Por padrão, o `docker-compose.dev.yml` executa `pnpm exec prisma generate && pnpm start:dev`.
- Se precisar aplicar migrations ou seeds, execute dentro do container:

  ```sh
  docker compose -f docker-compose.dev.yml exec app pnpm prisma:migrate
  docker compose -f docker-compose.dev.yml exec app pnpm prisma:seed
  ```

### Sem Docker (alternativo)

1. **Instale as dependências:**

   ```sh
   pnpm install
   ```

2. **Rode as migrations e gere o client Prisma:**

   ```sh
   pnpm prisma:migrate
   pnpm prisma:generate
   ```

3. **Inicie a aplicação:**

   ```sh
   pnpm start:dev
   ```
  
## Scripts úteis

- `pnpm start:dev` — Inicia o servidor em modo desenvolvimento
- `pnpm build` — Compila a aplicação para produção (pasta `dist/`)
- `pnpm start:prod` — Inicia o servidor em modo de produção (usa `dist/main`)
- `pnpm test` — Executa os testes automatizados
- `pnpm test:watch` — Executa os testes automatizados em modo watch
- `pnpm test:coverage` — Mostra a cobertura dos testes automatizados
- `pnpm test:e2e` — Executa os testes e2e
- `pnpm test:coverage:e2e` — Mostra a cobertura dos testes e2e
- `pnpm format` — Formata o código usando Prettier
- `pnpm lint` — Roda o linter (ESLint) e corrige problemas automaticamente
- `pnpm commit` — Roda o commitzen para commits semânticos
- `pnpm prisma:migrate` — Executa as migrations do banco
- `pnpm prisma:generate` — Gera o client do Prisma
- `pnpm prisma:studio` — Abre o Prisma Studio para visualizar/editar dados
- `pnpm prisma:seed` — Popula o banco de dados
- `pnpm docker:dev` — Sobe os containers para desenvolvimento
- `pnpm docker:stop:dev` — Para os containers de desenvolvimento
- `pnpm docker:prod` — Sobe os containers para produção (detached)
- `pnpm docker:stop:prod` — Para os containers de produção

## Hooks de Git (Husky) e padrões

O projeto usa Husky, lint-staged e Commitlint para garantir qualidade e padronização:

- `pre-commit`: executa o `lint-staged` (Prettier e ESLint) sobre arquivos `src/**/*.ts` staged
- `commit-msg`: valida a mensagem de commit com Commitlint (formato convencional)
- `pre-push`: executa `pnpm test:coverage` e `pnpm test:coverage:e2e`

O lint-staged está configurado em `.lintstagedrc.json` e aplica formatação (Prettier) e linting (ESLint) automaticamente nos arquivos TypeScript do `src/`.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature/fix: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push para o seu fork: `git push origin minha-feature`
5. Abra um Pull Request

## Autor

[Nathan Rodrigues Vieira](https://github.com/NathanRodriguesVieira99)
