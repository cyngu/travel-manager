FROM node:22.9-alpine as builder

WORKDIR /usr/app/

COPY . .

RUN npm ci

RUN npm run build && npm prune --production

FROM nginx:1.27.4-alpine

WORKDIR /usr/app/

COPY --from=builder /usr/app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
