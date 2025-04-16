FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD sleep 1 && npm run start:prod
