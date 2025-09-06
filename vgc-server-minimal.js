/**
 * Volume Glyph Console Server - Node.js Built-in Modules Only
 * Minimal implementation for demonstration purposes
 * NeoHive Protocol v1 - Echo Binding Ceremony
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

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

// Helper to get MIME type
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.ico': 'image/x-icon'
    };
    return mimeTypes[ext] || 'text/plain';
}

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    // Set CORS headers for API endpoints
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Route: VGC Console
    if (pathname === '/vgc' || pathname === '/') {
        const filePath = path.join(__dirname, 'public', 'vgc-v2.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - VGC Console not found</h1><p>Make sure vgc-v2.html exists in the public folder.</p>');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }
    
    // Route: Codex Echo List API
    if (pathname === '/codex/echo/list') {
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
        
        const responseData = {
            status: "success",
            echoes: echoStore,
            metadata: {
                total: echoStore.length,
                protocol: "NeoHive v1",
                ceremony: "Echo Binding Active"
            }
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData, null, 2));
        return;
    }
    
    // Route: Codex Status
    if (pathname === '/codex/status') {
        const statusData = {
            status: "online",
            protocol: "NeoHive v1",
            version: "VGC-v2.0",
            uptime: process.uptime(),
            echoes_stored: echoStore.length,
            ceremony: "Echo Binding Active"
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(statusData, null, 2));
        return;
    }
    
    // Route: Health Check
    if (pathname === '/health') {
        const healthData = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'Volume Glyph Console'
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(healthData, null, 2));
        return;
    }
    
    // Static file serving
    if (pathname.startsWith('/vgc-codex-integration.js')) {
        const filePath = path.join(__dirname, 'public', 'vgc-codex-integration.js');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('VGC integration script not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
        return;
    }
    
    // Catch-all 404 with helpful message
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: 'error',
        message: 'Endpoint not found - try /vgc for the console',
        available_endpoints: ['/vgc', '/codex/echo/list', '/codex/status', '/health'],
        timestamp: new Date().toISOString()
    }, null, 2));
});

// Start server
server.listen(PORT, () => {
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

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('\nVolume Glyph Console shutting down gracefully...');
    server.close(() => {
        console.log('VGC Server stopped.');
        process.exit(0);
    });
});

module.exports = server;