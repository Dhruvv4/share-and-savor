FROM node:20-alpine AS base
RUN apk add --no-cache git

WORKDIR /client

COPY package.json /client

RUN npm install

COPY . /client

RUN npm run build