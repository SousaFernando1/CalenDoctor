FROM node:20.13.1 AS BUILD_APP

WORKDIR /app

COPY package*.json ./

COPY . .

RUN yarn install && yarn run build

FROM nginx:1.23.1-alpine

ENV TZ=America/Sao_Paulo

WORKDIR /usr/share/nginx/html

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=BUILD_APP /app/dist .

USER nginx

EXPOSE 8081

CMD ["nginx", "-g", "daemon off;"]
