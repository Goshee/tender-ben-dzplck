/**
 * Volume Glyph Console Server
 * A minimal Express server for VGC functionality
 * Can be used standalone or integrated with existing systems
 */

const express = require('express');
const path = require('path');
const app = express();

// Default port for VGC
const PORT = process.env.PORT || 3001;

// Mock echo data store for demonstration
let echoStore = [
    {
        id: 1,
        source: "NeoHive Core",
        message: "System initialization complete",
        timestamp: new Date().toISOString(),
        type: "system"
    },
    {
        id: 2,
        source: "AI Matrix", 
        message: "Echo binding ceremony protocols loaded",
        timestamp: new Date(Date.now() - 5000).toISOString(),
        type: "protocol"
    },
    {
        id: 3,
        source: "Quantum Processor",
        message: "Neural pathways establishing new connections",
        timestamp: new Date(Date.now() - 10000).toISOString(),
        type: "neural"
    }
];

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// VGC Route - Volume Glyph Console
app.get('/vgc', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'vgc-v2.html'));
});

// Root route redirects to VGC
app.get('/', (req, res) => {
    res.redirect('/vgc');
});

// Codex Echo API Endpoints
app.get('/codex/echo/list', (req, res) => {
    // Simulate dynamic echo responses
    const dynamicEcho = {
        id: Date.now(),
        source: "Codex AI",
        message: generateRandomEcho(),
        timestamp: new Date().toISOString(),
        type: "dynamic"
    };
    
    // Add new echo and keep last 20
    echoStore.unshift(dynamicEcho);
    if (echoStore.length > 20) {
        echoStore = echoStore.slice(0, 20);
    }
    
    res.json({
        status: "success",
        echoes: echoStore,
        metadata: {
            total: echoStore.length,
            protocol: "NeoHive v1",
            ceremony: "Echo Binding Active"
        }
    });
});

// Additional Codex API endpoints for future expansion
app.post('/codex/echo/send', (req, res) => {
    const { message, source } = req.body;
    
    const newEcho = {
        id: Date.now(),
        source: source || "User",
        message: message || "No message provided",
        timestamp: new Date().toISOString(),
        type: "user"
    };
    
    echoStore.unshift(newEcho);
    if (echoStore.length > 20) {
        echoStore = echoStore.slice(0, 20);
    }
    
    res.json({
        status: "success",
        echo: newEcho,
        message: "Echo added successfully"
    });
});

app.get('/codex/status', (req, res) => {
    res.json({
        status: "online",
        protocol: "NeoHive v1",
        version: "VGC-v2.0",
        uptime: process.uptime(),
        echoes_stored: echoStore.length,
        ceremony: "Echo Binding Active"
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Volume Glyph Console'
    });
});

// Helper function to generate random echo messages
function generateRandomEcho() {
    const echoes = [
        "Neural pathways establishing new connections",
        "Quantum resonance detected in data stream", 
        "Cryptographic signatures verified and authenticated",
        "Distributed processing nodes coming online",
        "Semantic analysis complete - patterns emerging",
        "Blockchain consensus achieved across network",
        "Machine learning models updating parameters", 
        "Temporal synchronization maintaining stability",
        "Data integrity verification successful",
        "Protocol handshake completed with remote nodes",
        "Consciousness simulation reaching new benchmarks",
        "Recursive algorithms exploring solution space",
        "Neural networks adapting to environmental changes",
        "Quantum entanglement effects observed in processing",
        "Information theory boundaries being tested",
        "Holographic data storage optimization in progress",
        "Fractal pattern recognition systems activating",
        "Emergent intelligence clusters forming",
        "Dimensional folding calculations converging",
        "Matrix harmonics achieving resonant frequency"
    ];
    
    return echoes[Math.floor(Math.random() * echoes.length)];
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('VGC Server Error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found - try /vgc for the console',
        timestamp: new Date().toISOString()
    });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║    Volume Glyph Console - NeoHive Protocol v1           ║
║                                                          ║
║    Server running on port ${PORT.toString().padEnd(4)}                          ║
║    Access console: http://localhost:${PORT}/vgc              ║
║                                                          ║
║    Echo Binding Ceremony: ACTIVE                        ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
        `);
    });
}

module.exports = app;