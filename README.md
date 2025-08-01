# Backend Projeto Extensão

Este repositório contém o backend do Projeto **FUTURO NOME DO PROJETO**, desenvolvido com NestJS, Prisma e PostgreSQL. O objetivo é fornecer uma API robusta, escalável e de fácil manutenção para aplicações web e mobile.

## Tecnologias principais

- **Node.js** — Ambiente de execução JavaScript
- **NestJS** — Framework para aplicações Node.js escaláveis
- **Prisma ORM** — Mapeamento objeto-relacional para banco de dados
- **PostgreSQL** — Banco de dados relacional
- **Vitest** — Testes automatizados
- **Docker** — Containers para ambientes e banco de dados
- **BiomeJs** — Linter e Formatter do projeto
  
## Sobre os arquivos de configuração e ambientes

O projeto utiliza diferentes arquivos `.env` para separar as configurações de cada ambiente:

- `.env`: ambiente de desenvolvimento local (porta, banco, CORS, etc).
- `.env.test`: ambiente de testes unitários/integrados (banco e porta isolados para testes).
- `.env.e2e`: ambiente de testes end-to-end (banco e porta isolados para e2e).
- `.env.production`: ambiente de produção (configurações seguras para deploy).

Esses arquivos permitem rodar a aplicação em diferentes contextos sem alterar o código, apenas mudando as variáveis de ambiente.

Outros arquivos importantes:

- `docker-compose.yml` e `docker-compose.prod.yml`: orquestram containers para desenvolvimento, testes e produção, garantindo ambientes isolados e reprodutíveis.
- `Dockerfile`: define como a imagem do backend é construída para produção.
- `prisma/`: contém o schema do banco, seeds e migrations, usados pelo Prisma ORM.
- `.husky/`: hooks de git para automação de tarefas antes de commits/push.

## Como rodar localmente

1. **Clone o repositório:**

   ```sh
   git clone <url-do-repositório>
   cd backend_projeto_extensao
   ```

2. **Configure as variáveis de ambiente:**
   - Copie `.env.example` para `.env` e ajuste conforme necessário.

3. **Suba o banco de dados com Docker:**

   ```sh
   pnpm docker:up
   ```

4. **Instale as dependências:**

   ```sh
   pnpm install
   ```

5. **Rode as migrations e gere o client Prisma:**

   ```sh
   pnpm prisma:migrate
   pnpm prisma:generate
   ```

6. **Inicie a aplicação:**

   ```sh
   pnpm start:dev
   ```

## Scripts úteis

- `pnpm start:dev` — Inicia o servidor em modo desenvolvimento
- `pnpm test` — Executa os testes automatizados
- `pnpm test:watch` — Executa os testes automatizados em modo watch
- `pnpm test:coverage` — Mostra a cobertura dos testes automatizados
- `pnpm lint` — Roda o linter
- `pnpm commit` — Roda o commitzen para commits semânticos
- `pnpm prisma:migrate` — Executa as migrations do banco
- `pnpm prisma:generate` — Gera o client do Prisma
- `pnpm prisma:seed` — Popula o banco de dados

## Testes

Os testes utilizam o Vitest. Para rodar:

```sh
pnpm test
```

## Docker

O projeto possui arquivos para facilitar o uso de containers tanto em desenvolvimento quanto produção. Veja os arquivos `docker-compose.yml` e `docker-compose.prod.yml`.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature/fix: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push para o seu fork: `git push origin minha-feature`
5. Abra um Pull Request

## Autor

[Nathan Rodrigues Vieira](https://github.com/NathanRodriguesVieira99)
