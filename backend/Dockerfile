FROM node:22.9-alpine as builder

WORKDIR /usr/app/

COPY . .

RUN npm ci

RUN npm run build && npm prune --production

FROM node:22.9-alpine

WORKDIR /usr/src/app/

COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/node_modules ./node_modules

CMD ["npm", "start"]