FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit-dev

COPY / /

USER node

CMD ["npm", "start"]

EXPOSE 3000