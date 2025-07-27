FROM node:20-slim

# Install sudo (for shutdown), and clean cache
RUN apt update && apt install -y sudo && apt clean

# App setup
WORKDIR /app
COPY shutdown.js .

# Grant permission to use shutdown (without password)
RUN echo "node ALL=(ALL) NOPASSWD: /sbin/shutdown" >> /etc/sudoers

# Start app
CMD ["node", "shutdown.js"]
