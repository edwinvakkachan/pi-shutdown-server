const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;
const TOKEN = process.env.SHUTDOWN_TOKEN || 'supersecret';

app.get('/shutdown', (req, res) => {
  const token = req.query.token;
  if (token !== TOKEN) {
    return res.status(403).send('Forbidden: Invalid token');
  }

  exec('dbus-send --system --print-reply --dest=org.freedesktop.login1 ' +
       '/org/freedesktop/login1 "org.freedesktop.login1.Manager.PowerOff" boolean:true',
    (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Error:", error.message);
        return res.status(500).send('Shutdown failed: ' + error.message);
      }
      console.log("✅ Shutdown initiated.");
      res.send('Shutdown command sent.');
    });
});

app.listen(PORT, () => {
  console.log(`🚀 Shutdown service running on port ${PORT}`);
});
