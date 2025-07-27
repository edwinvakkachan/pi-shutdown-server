FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy app code
COPY shutdown.js .

EXPOSE 3000
CMD ["npm", "start"]
