FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]