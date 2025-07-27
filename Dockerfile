FROM node:18-alpine

WORKDIR /app

COPY shutdown.js .

RUN npm init -y && npm install express

CMD ["node", "shutdown.js"]
