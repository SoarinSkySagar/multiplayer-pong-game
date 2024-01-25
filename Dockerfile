FROM node:21-alpine

WORKDIR /

COPY package*.json ./

RUN npm install --omit-dev

COPY / /

USER node

CMD ["node", "server.js"]

EXPOSE 3000