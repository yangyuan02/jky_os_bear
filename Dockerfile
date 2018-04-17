FROM node:alpine
MAINTAINER guxiaobai <sikuan.gu@gmail.com>

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN yarn config set registry 'https://registry.npm.taobao.org'

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
