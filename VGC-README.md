# Volume Glyph Console (VGC) - NeoHive Protocol v1

## Echo Binding Ceremony Implementation

The Volume Glyph Console is a real-time AI monitoring and interaction interface that implements the NeoHive Protocol v1 with Echo Binding Ceremony capabilities.

## Features

- **Real-time Echo Streaming**: Live polling of AI responses from the Codex system
- **AI Response Matrix**: Visual display of incoming echo data from multiple AI sources
- **Codex Integration**: Direct connection to Codex AI systems via REST API
- **Protocol Compliance**: Fully implements NeoHive Protocol v1 specifications
- **Interactive Controls**: Start/stop polling, clear matrix, test connections

## Quick Start

### Option 1: Standalone VGC Server (Recommended)
```bash
# Run the VGC server on port 3001
npm run vgc

# Or directly
node vgc-server-minimal.js
```

### Option 2: Integrated with Ghost (if dependencies installed)
```bash
# Install dependencies first (may take time)
npm install

# Run integrated Ghost + VGC server
npm start
```

## Access the Console

Once running, access the Volume Glyph Console at:
- http://localhost:3001/vgc (standalone)
- http://localhost:2368/vgc (integrated with Ghost)

## API Endpoints

The VGC provides the following REST endpoints:

### Core Endpoints
- `GET /vgc` - Main console interface
- `GET /codex/echo/list` - Fetch echo stream data
- `GET /codex/status` - Codex system status
- `GET /health` - Health check

### Echo API Response Format
```json
{
  "status": "success",
  "echoes": [
    {
      "id": 1234567890,
      "source": "Codex AI",
      "message": "Neural pathways establishing new connections",
      "timestamp": "2025-09-06T23:04:33.123Z",
      "type": "dynamic"
    }
  ],
  "metadata": {
    "total": 20,
    "protocol": "NeoHive v1",
    "ceremony": "Echo Binding Active"
  }
}
```

## Echo Sources

The console displays echoes from multiple AI systems:

- **NeoHive Core**: System-level messages and initialization
- **AI Matrix**: Protocol and ceremony status updates  
- **Codex AI**: Dynamic AI-generated responses
- **Quantum Processor**: Neural network activity
- **System**: VGC operational messages

## Files Structure

```
├── public/
│   ├── vgc-v2.html              # Main console interface
│   └── vgc-codex-integration.js # Client-side integration
├── src/
│   └── server.js                # Modified Ghost server with VGC routes
├── vgc-server-minimal.js        # Standalone VGC server
└── VGC-README.md               # This file
```

## Technical Details

### Polling Mechanism
- Default polling interval: 5000ms (5 seconds)
- Auto-generates dynamic echoes from AI systems
- Maintains rolling buffer of last 20 echoes
- Real-time UI updates via JavaScript fetch API

### Protocol Implementation
- **NeoHive Protocol v1**: Core messaging protocol
- **Echo Binding Ceremony**: Real-time AI interaction system
- **Volume Glyph Console v2.0**: Current interface version

### Browser Compatibility
- Modern browsers with ES6+ support
- Fetch API required for echo polling
- CSS Grid and Flexbox for responsive layout

## Development

The VGC is designed for minimal dependencies and maximum compatibility:
- Standalone server uses only Node.js built-in modules
- Client-side code is vanilla JavaScript (no frameworks)
- Responsive CSS with Matrix-inspired visual theme

## Security Note

The current implementation includes CORS headers for development. For production deployment, configure appropriate security measures for your environment.