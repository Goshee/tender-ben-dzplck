const express = require('express');
const path = require('path');
const router = express.Router();

// Serves the Volume Glyph Console static HTML at GET /vgc
router.get('/vgc', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'vgc-v2.html'));
});

module.exports = router;