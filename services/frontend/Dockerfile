FROM node:12-alpine as builder
RUN npm install -g http-server
WORKDIR /app
COPY ./app/package.json /app/package.json
RUN npm install

COPY ./app  /app
RUN npm run build
EXPOSE 8080
USER node
CMD [ "http-server", "dist" ]

# base image
#FROM node:12-alpine

#RUN npm install -g http-server

# set working directory
#WORKDIR /app

#add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# g++ compiler for fibers and sass
#RUN apk add python make g++

# install app dependencies
#COPY ./app/package.json /app/package.json
#COPY ./app/yarn.lock /app/yarn.lock
#COPY ./app/package-lock.json /app/package-lock.json
#RUN yarn install
#RUN yarn global add @vue/cli
#RUN yarn install --production

#RUN npm install

# copy files
#COPY ./app /app

#RUN npm run build


#CMD yarn serve

#FROM node:lts-alpine

# устанавливаем простой HTTP-сервер для статики
#RUN npm install -g http-server

# делаем каталог 'app' текущим рабочим каталогом
#WORKDIR /app

# копируем оба 'package.json' и 'package-lock.json' (если есть)
#COPY ./app/package*.json ./

# устанавливаем зависимости проекта
#RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
#COPY . .

# собираем приложение для production с минификацией
#RUN npm run build

#EXPOSE 8080
#CMD [ "http-server", "dist" ]
