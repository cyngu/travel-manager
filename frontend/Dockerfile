FROM node:22.9-alpine AS builder

WORKDIR /usr/app/

COPY . .

RUN npm ci

RUN npm run build && npm prune --production

FROM nginx:1.27.4-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
