FROM node:22.16.0-alpine3.20 AS base
WORKDIR /app

# Стадия установки зависимостей (кешируется)
FROM base AS deps
COPY ./src/package.json ./src/yarn.lock ./
RUN yarn install $YARN_INSTALL_PARAMS

# Стадия сборки
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY ./src ./
RUN yarn build

# Финальный образ
FROM base AS runtime
WORKDIR /app
COPY --from=builder /app/.output ./.output
CMD ["node", "./.output/server/index.mjs"]
