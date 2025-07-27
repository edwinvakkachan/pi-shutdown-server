FROM node:18-slim

WORKDIR /app

# Install dbus-utils for dbus-send
RUN apt-get update && apt-get install -y dbus

COPY shutdown.js .

RUN npm init -y && npm install express

CMD ["node", "shutdown.js"]
