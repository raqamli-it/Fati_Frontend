# Bosqich 1: Build bosqichi
FROM node:20

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8089

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173" ]
