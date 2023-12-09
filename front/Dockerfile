FROM node:18-alpine as build

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY img/ /app/img
COPY package.json /app/
COPY nginx.conf /app/nginx/

RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
