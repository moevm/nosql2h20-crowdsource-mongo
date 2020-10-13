# base image
FROM node:12.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# g++ compiler for fibers and sass
#RUN apk add python make g++

# install app dependencies
COPY ./app/package.json /app/package.json
#COPY ./app/package-lock.json /app/package-lock.json
RUN yarn install
RUN yarn global add @vue/cli

# copy files
COPY ./app /app

CMD yarn serve
