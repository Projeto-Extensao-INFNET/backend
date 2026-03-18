FROM node:22-alpine AS builder 

WORKDIR /app

RUN  corepack enable 

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
COPY .env.production .env

RUN pnpm prisma generate && pnpm run build


FROM node:22-alpine AS production

WORKDIR /app

RUN corepack enable

COPY --from=builder /app/package.json /app/pnpm-lock.yaml  ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

RUN pnpm install --frozen-lockfile --production --ignore-scripts

RUN npx prisma generate

ENV NODE_ENV=production

EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
