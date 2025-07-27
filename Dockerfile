FROM node:18-alpine

# Install sudo for passwordless shutdown
RUN apk add --no-cache sudo

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

EXPOSE 3000

CMD ["node", "shutdown.js"]
