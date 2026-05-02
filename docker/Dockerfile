# Stage 1: Dependências
FROM node:22-alpine AS deps

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production

# Copia dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copia código-fonte e configs necessários
COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
COPY prisma ./prisma

EXPOSE 3333

CMD ["pnpm", "start:prod"]
