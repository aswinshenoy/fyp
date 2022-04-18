FROM node:alpine as deps

RUN apk add build-base zlib-dev autoconf automake nasm libtool libpng-dev jpeg-dev g++ gcc libgcc libstdc++ linux-headers make python3
RUN apk add --no-cache libc6-compat

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG NODE_ENV=production
ARG NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pages ./pages

USER nextjs

EXPOSE 80
CMD npm start
