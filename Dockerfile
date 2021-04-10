FROM node:14-alpine as base

ADD ./ /opt/app
WORKDIR /opt/app

RUN apk update && apk add bash curl && rm -rf /var/cache/apk/*
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

RUN npm install -g npm

RUN npm ci

RUN /usr/local/bin/node-prune

FROM node:14-alpine as release
COPY --from=base /opt/app /opt/app

ENV HOME_DIR=/opt/app \
	NODE_ENV=production \
	PORT=7702

ENTRYPOINT node server.js
