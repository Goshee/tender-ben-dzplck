const express = require('express');
const path = require('path');

const app = express();

// --- Middleware & static files ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from /public (adjust if your public dir differs)
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- Routes ---
// Attempt to mount your existing VGC router; fallback to serving the console HTML
try {
  const vgcRouter = require('./routes/vgc');
  app.use('/', vgcRouter);
} catch (e) {
  app.get('/vgc', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'vgc-v2.html'));
  });
}

// Health check
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// 404 handler
app.use((req, res, _next) => {
  res.status(404).send('Not Found');
});

// Server bootstrap
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`NeoHive server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;