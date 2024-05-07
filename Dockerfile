FROM node:20-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install -g npm@10.7.0

COPY . .

RUN npm run build

CMD [ "npm", "start" ]

EXPOSE 3000