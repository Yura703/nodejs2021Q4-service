FROM node:16.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npx tsc

# CMD [ "node", "./dist/server.js" ]

CMD [ "npm", "run", "start" ]