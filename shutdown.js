const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;
const SHUTDOWN_TOKEN = process.env.SHUTDOWN_TOKEN || 'supersecret';

app.use(express.json());

// Manual shutdown via HTTP
app.post('/shutdown', (req, res) => {
  const token = req.body.token;
  if (token !== SHUTDOWN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  shutdown();
  res.json({ message: 'Shutdown command sent' });
});

// Auto shutdown after 1 minute
setTimeout(() => {
  console.log('🕒 1 minute passed. Triggering auto-shutdown...');
  shutdown();
}, 60 * 1000); // 60 seconds

function shutdown() {
  console.log('🔌 Shutting down...');
  exec('dbus-send --system --print-reply --dest=org.freedesktop.login1 ' +
       '/org/freedesktop/login1 "org.freedesktop.login1.Manager.PowerOff" boolean:true',
    (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Shutdown failed:', error.message);
        return;
      }
      console.log('✅ Shutdown command executed');
    });
}

app.listen(PORT, () => {
  console.log(`🚀 Shutdown service running on port ${PORT}`);
});
