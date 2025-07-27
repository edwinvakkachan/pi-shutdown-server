# Use Debian-based Node.js image
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy source files
COPY . .

# Install dependencies (if any)
RUN npm install

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "server.js"]
