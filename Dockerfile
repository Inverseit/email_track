FROM node:16-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY src src
EXPOSE 3006
RUN yarn install
RUN yarn tsc
RUN yarn build
CMD [ "yarn", "start"]