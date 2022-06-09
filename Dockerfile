FROM node:16-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY src src
RUN yarn install
RUN yarn tsc
RUN yarn build
EXPOSE 3006
CMD [ "yarn", "start"]