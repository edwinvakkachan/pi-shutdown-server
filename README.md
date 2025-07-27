# 🛑 pi-shutdown-server

A lightweight Node.js Express server running in a Docker container to trigger a **passwordless shutdown** of your Raspberry Pi over the network. Useful for integration with tools like **Home Assistant**.

---

## ✨ Features

- Runs a secure shutdown command on your Raspberry Pi
- Lightweight Alpine-based Node.js image
- Optional token authentication
- Dockerized and easy to deploy
- Home Assistant integration ready
- Can be triggered via REST or HTTP

---

## 🚀 Setup Instructions

### 1. Clone this repository

```bash
git clone https://github.com/<your-username>/pi-shutdown-server.git
cd pi-shutdown-server
