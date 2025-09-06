const express = require('express');
const path = require('path');

const app = express();

// --- Middleware & static files ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from /public (adjust if your public dir differs)
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- Routes ---
// Your VGC route module should export an Express.Router()
// that includes `router.get('/vgc', ...)`
const vgcRouter = require('./routes/vgc');
app.use('/', vgcRouter);

// (Optional) Health check
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// (Optional) 404 handler (placed after your routes)
app.use((req, res, _next) => {
  res.status(404).send('Not Found');
});

// --- Server bootstrap ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NeoHive server listening on http://localhost:${PORT}`);
});

module.exports = app;