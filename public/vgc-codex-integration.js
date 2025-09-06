/**
 * Volume Glyph Console - Codex Integration Script
 * NeoHive Protocol v1 - Echo Binding Ceremony
 */

class VGCCodexIntegration {
    constructor() {
        this.isPolling = false;
        this.pollingInterval = null;
        this.pollingRate = 5000; // 5 seconds
        this.echoCount = 0;
        this.lastUpdate = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.initializeCodex();
    }

    initializeElements() {
        // Status elements
        this.codexIndicator = document.getElementById('codex-indicator');
        this.codexStatusText = document.getElementById('codex-status-text');
        this.pollingStatus = document.getElementById('polling-status');
        this.lastUpdateEl = document.getElementById('last-update');
        this.echoCountEl = document.getElementById('echo-count');
        
        // Control buttons
        this.startPollingBtn = document.getElementById('start-polling');
        this.stopPollingBtn = document.getElementById('stop-polling');
        this.clearMatrixBtn = document.getElementById('clear-matrix');
        this.testConnectionBtn = document.getElementById('test-connection');
        
        // Echo list
        this.echoList = document.getElementById('echo-list');
    }

    attachEventListeners() {
        this.startPollingBtn.addEventListener('click', () => this.startPolling());
        this.stopPollingBtn.addEventListener('click', () => this.stopPolling());
        this.clearMatrixBtn.addEventListener('click', () => this.clearMatrix());
        this.testConnectionBtn.addEventListener('click', () => this.testConnection());
    }

    async initializeCodex() {
        this.updateStatus('Connecting to Codex...', false);
        
        try {
            // Test initial connection
            const response = await fetch('/codex/echo/list');
            if (response.ok) {
                this.updateStatus('Codex Online', true);
                this.addEchoToMatrix('System', 'Codex connection established successfully');
            } else {
                throw new Error('Failed to connect');
            }
        } catch (error) {
            this.updateStatus('Codex Offline', false);
            this.addEchoToMatrix('System Error', `Failed to connect to Codex: ${error.message}`);
        }
    }

    updateStatus(text, online) {
        this.codexStatusText.textContent = text;
        
        if (online) {
            this.codexIndicator.className = 'status-indicator status-online';
        } else {
            this.codexIndicator.className = 'status-indicator status-offline';
        }
    }

    startPolling() {
        if (this.isPolling) return;
        
        this.isPolling = true;
        this.pollingStatus.textContent = 'Active';
        this.startPollingBtn.disabled = true;
        
        this.addEchoToMatrix('System', 'Echo polling started');
        
        // Start the polling interval
        this.pollingInterval = setInterval(() => {
            this.pollEchoList();
        }, this.pollingRate);
        
        // Immediate first poll
        this.pollEchoList();
    }

    stopPolling() {
        if (!this.isPolling) return;
        
        this.isPolling = false;
        this.pollingStatus.textContent = 'Stopped';
        this.startPollingBtn.disabled = false;
        
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
        
        this.addEchoToMatrix('System', 'Echo polling stopped');
    }

    async pollEchoList() {
        try {
            const response = await fetch('/codex/echo/list');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            this.processEchoData(data);
            this.updateLastUpdate();
            
        } catch (error) {
            this.addEchoToMatrix('Poll Error', `Failed to fetch echo list: ${error.message}`);
            console.error('Echo polling error:', error);
        }
    }

    processEchoData(data) {
        // Handle different response formats
        if (Array.isArray(data)) {
            // If it's an array of echoes
            data.forEach(echo => this.addEchoFromData(echo));
        } else if (data.echoes && Array.isArray(data.echoes)) {
            // If it's an object with echoes array
            data.echoes.forEach(echo => this.addEchoFromData(echo));
        } else if (data.message) {
            // If it's a single message object
            this.addEchoFromData(data);
        } else {
            // Generic object handling
            this.addEchoToMatrix('Echo Response', JSON.stringify(data, null, 2));
        }
    }

    addEchoFromData(echoData) {
        const source = echoData.source || echoData.from || 'Codex';
        const content = echoData.content || echoData.message || echoData.text || JSON.stringify(echoData);
        
        this.addEchoToMatrix(source, content);
    }

    addEchoToMatrix(source, content) {
        const timestamp = new Date().toLocaleTimeString();
        
        const echoItem = document.createElement('div');
        echoItem.className = 'echo-item';
        echoItem.innerHTML = `
            <div class="echo-timestamp">${timestamp} - ${source}</div>
            <div class="echo-content">${this.escapeHtml(content)}</div>
        `;
        
        // Add to top of list
        this.echoList.insertBefore(echoItem, this.echoList.firstChild);
        
        // Keep only last 50 echoes for performance
        while (this.echoList.children.length > 50) {
            this.echoList.removeChild(this.echoList.lastChild);
        }
        
        this.echoCount++;
        this.echoCountEl.textContent = this.echoCount;
        
        // Auto-scroll to top
        this.echoList.scrollTop = 0;
    }

    clearMatrix() {
        this.echoList.innerHTML = '';
        this.echoCount = 0;
        this.echoCountEl.textContent = '0';
        
        this.addEchoToMatrix('System', 'AI Response Matrix cleared');
    }

    async testConnection() {
        this.testConnectionBtn.disabled = true;
        this.testConnectionBtn.innerHTML = '<span class="loading-spinner"></span> Testing...';
        
        try {
            const startTime = Date.now();
            const response = await fetch('/codex/echo/list');
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            if (response.ok) {
                const data = await response.json();
                this.updateStatus('Codex Online', true);
                this.addEchoToMatrix('Connection Test', 
                    `SUCCESS: Response time ${responseTime}ms, Status: ${response.status}`);
                
                // Show a sample of the response if available
                if (data) {
                    this.addEchoToMatrix('Test Data Sample', 
                        typeof data === 'object' ? JSON.stringify(data).substring(0, 200) + '...' : data);
                }
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            this.updateStatus('Codex Offline', false);
            this.addEchoToMatrix('Connection Test', `FAILED: ${error.message}`);
        } finally {
            this.testConnectionBtn.disabled = false;
            this.testConnectionBtn.textContent = 'Test Codex';
        }
    }

    updateLastUpdate() {
        this.lastUpdate = new Date();
        this.lastUpdateEl.textContent = this.lastUpdate.toLocaleTimeString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the VGC when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Volume Glyph Console - Codex Integration initialized');
    window.vgc = new VGCCodexIntegration();
});

// Handle page visibility changes to pause/resume polling
document.addEventListener('visibilitychange', () => {
    if (window.vgc) {
        if (document.hidden) {
            // Page is hidden, optionally pause polling to save resources
            console.log('VGC: Page hidden, polling continues in background');
        } else {
            // Page is visible again
            console.log('VGC: Page visible, polling active');
        }
    }
});

// Export for potential external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VGCCodexIntegration;
}