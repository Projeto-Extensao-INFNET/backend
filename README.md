# Backend Projeto Extensão

Este repositório contém o backend do Projeto **FUTURO NOME DO PROJETO**, desenvolvido com NestJS, Prisma ORM e PostgreSQL, seguindo princípios de Clean Architecture e Domain-Driven Design. O objetivo é fornecer uma API robusta, escalável e de fácil manutenção para aplicações web e mobile.

## Tecnologias principais

- **Node.js** (>= 22.15.1)
- **pnpm** (10.12.1)
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **Redis** — Cache de dados
- **Vitest** — Testes unitários, integração e E2E
- **Supertest** — Testes de integração/E2E
- **Docker**
- **ESLint + Prettier**
- **SWC** — Compilação TypeScript
- **Husky + lint-staged + Commitlint**
- **Swagger/OpenAPI** — Documentação interativa
- **JWT + Passport** — Autenticação
- **Pulumi** — Infraestrutura como código (AWS)

## Configuração e ambientes

O projeto utiliza arquivos `.env` para separar configurações de cada ambiente:

- `.env`: desenvolvimento local
- `.env.test`: testes unitários/integrados
- `.env.production`: produção

Outros arquivos importantes:

- `docker-compose.yml`: orquestra containers para dev (PostgreSQL, Redis)
- `Dockerfile`: imagem para prod
- `prisma/`: schema, seeds e migrations do Prisma ORM
- `pulumi/`: infraestrutura como código (AWS)
- `.husky/`: hooks de git
- `.lintstagedrc.json`: lint-staged (Prettier + ESLint)
- `.swcrc`: config do SWC
- `vitest.config.ts` e `vitest.config.e2e.ts`: configs de testes

## Estrutura do Projeto

O projeto segue **Clean Architecture** e **DDD**. Principais pastas:

```
src/
├── test/         # Configurações e testes
├── __mocks__/         # Mocks customizados
├── config/            # Configurações (env, docs)
├── core/              # Entidades do domínio
│   └── entities/
├── domain/            # Lógica de negócio (services)
│   └── services/
│       ├── appointments/
│       ├── professionals/
│       ├── specialty/
│       ├── treatment-type/
│       ├── upload-avatar/
│       └── user/
├── infra/             # Infraestrutura
│   ├── auth/          # JWT, Guards, Strategies, Controllers
│   ├── cache/         # Redis, cache-repository
│   ├── database/      # Prisma, repositórios
│   │   ├── prisma/
│   │   │   ├── generated/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   └── repositories/
│   ├── http/          # Controllers e rotas HTTP
│   │   └── controllers/
│   ├── app.module.ts  # Módulo principal
│   └── main.ts        # Entry point
├── shared/            # Código compartilhado
│   ├── constants/
│   ├── dto/
│   ├── errors/
│   ├── factories/
│   └── types/
└── utils/             # Funções utilitárias
```

### Padrões Utilizados

- **Repository Pattern**: abstração da camada de dados
- **Dependency Injection**: injeção de dependências (NestJS)
- **DTO Pattern**: validação e transformação de dados
- **Guard Pattern**: proteção de rotas e autorização
- **Strategy Pattern**: autenticação JWT

## Testes

O projeto possui cobertura de testes unitários, integração e E2E usando **Vitest** e **Supertest**.

### Executar testes

```bash
# Testes unitários
pnpm test
# Testes em modo watch
pnpm test:watch
# Coverage unitário
pnpm test:cov
# Testes E2E
pnpm test:e2e
```

## Como rodar localmente

### Com Docker (recomendado)

TODO => reformular a forma de subir o projeto (validar se dockeriza em dev ou não)

### Sem Docker

1. **Instale as dependências:**

   ```sh
   pnpm install
   ```

2. **Rode as migrations e gere o Prisma Client:**

   ```sh
   pnpm prisma:migrate
   pnpm prisma:generate
   ```

3. **Inicie a aplicação:**

   ```sh
   pnpm start:dev
   ```

## Scripts úteis

### Docker

TODO => adicionar possíveis scripts do docker

### Desenvolvimento

- `pnpm start:dev` — Hot-reload
- `pnpm start:debug` — Debug
- `pnpm build` — Compila para produção (`dist/`)
- `pnpm start:prod` — Produção

### Testes

- `pnpm test` — Unitários
- `pnpm test:watch` — Watch mode
- `pnpm test:cov` — Coverage unitário
- `pnpm test:e2e` — E2E

### Qualidade de Código

- `pnpm format` — Prettier
- `pnpm lint` — ESLint
- `pnpm commit` — Commitizen

### Banco de Dados (Prisma)

- `pnpm prisma:migrate` — Migrations (dev)
- `pnpm prisma:migrate:deploy` — Deploy migrations
- `pnpm prisma:generate` — Gera Prisma Client
- `pnpm prisma:studio` — Prisma Studio
- `pnpm prisma:seed` — Popula banco com seeds

## Padrões e qualidade de código

O projeto usa Husky, lint-staged e Commitlint:

- `pre-commit`: roda lint-staged (Prettier + ESLint) nos arquivos staged
- `commit-msg`: valida mensagem de commit (Commitlint)
- `pre-push`: executa testes unitários e E2E

O lint-staged está em `.lintstagedrc.json` e aplica Prettier e ESLint nos arquivos TypeScript do `src/`.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit: `git commit -m 'feat: minha nova feature'`
4. Push: `git push origin minha-feature`
5. Abra um Pull Request

## Autor

[Nathan Rodrigues Vieira](https://github.com/NathanRodriguesVieira99)
