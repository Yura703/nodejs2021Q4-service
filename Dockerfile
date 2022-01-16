FROM node:16.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]