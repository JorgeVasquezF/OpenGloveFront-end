# build stage
FROM node:lts-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN apk add build-base jpeg-dev zlib-dev
ENV LIBRARY_PATH=/lib:/usr/lib
RUN npm install -g @quasar/cli
COPY . .

# build stage
FROM develop-stage as build-stage

RUN npm install
RUN quasar build -m pwa

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/pwa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]