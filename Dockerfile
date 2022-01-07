FROM node:16.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ARG PORT
EXPOSE ${PORT}

# RUN npx tsc

# CMD [ "node", "./dist/server.js" ]

CMD [ "npm", "run", "start" ]