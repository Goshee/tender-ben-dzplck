var ghost = require("ghost");
var express = require("express");
var path = require("path");
var urlService = require("./node_modules/ghost/core/frontend/services/url");
var parentApp = express();

// Volume Glyph Console - NeoHive Protocol v1 Integration
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
    }
];

// Serve static files from public directory (for VGC assets)
parentApp.use(express.static(path.join(__dirname, '..', 'public')));

// VGC Route - Volume Glyph Console
parentApp.get('/vgc', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'vgc-v2.html'));
});

// Codex Echo API Endpoints
parentApp.get('/codex/echo/list', (req, res) => {
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
        "Information theory boundaries being tested"
    ];
    
    return echoes[Math.floor(Math.random() * echoes.length)];
}

// Run a single Ghost process
ghost()
  .then(function(ghostServer) {
    // for making subdir work
    parentApp.use(urlService.utils.getSubdir(), ghostServer.rootApp);
    ghostServer.start(parentApp);
  })
  .catch(error => {
    console.error(`Ghost server error: ${error.message} ${error.stack}`);
    process.exit(1);
  });