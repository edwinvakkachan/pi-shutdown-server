const { exec } = require('child_process');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.SHUTDOWN_TOKEN || null;

app.get('/shutdown', (req, res) => {
  if (TOKEN && req.query.token !== TOKEN) {
    return res.status(401).send('Unauthorized');
  }

  exec('/usr/sbin/shutdown -h now', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).send('Shutdown failed');
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
    }
    console.log('🛑 Shutdown command issued');
    res.send('Shutting down...');
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Shutdown service running on port ${PORT}`);
});
