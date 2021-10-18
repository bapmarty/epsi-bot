FROM node:16

LABEL maintainer="contact@baptistemrt.fr"

WORKDIR /bot

ENV PATH /bot/node_modules/.bin:$PATH

ADD package.json /bot/package.json
RUN npm install

CMD ["node", "index.js"]
