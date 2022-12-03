FROM node:12-alpine as builder
RUN npm install -g http-server

WORKDIR /app
COPY ./app/package.json /app/package.json
COPY ./app/yarn.lock /app/yarn.lock

RUN yarn install
COPY ./app  /app

RUN yarn build
EXPOSE 8080
USER node
CMD [ "http-server", "dist" ]
