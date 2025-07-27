const { exec } = require('child_process');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/shutdown', (req, res) => {
  exec('shutdown now', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).send('Shutdown failed');
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
      return res.status(500).send('Shutdown error');
    }
    console.log('🛑 Shutdown command issued');
    res.send('Shutting down...');
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Shutdown service running on port ${PORT}`);
});
