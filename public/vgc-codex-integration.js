(function(){
  const POLL_MS = 3000;
  const lastSeen = new Set();
  const matrix = document.getElementById('responseMatrix');
  const orb = document.getElementById('statusOrb');

  function setOrb(connected){
    if(!orb) return;
    orb.style.background = connected ? '#31D0AA' : '#8b8b8b';
    orb.title = `Codex: ${connected ? 'connected' : 'disconnected'}`;
  }

  async function poll(){
    try{
      const res = await fetch('/codex/echo/list', { cache: 'no-store' });
      if(!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if(Array.isArray(data)){
        let added = false;
        data.forEach(item => {
          const id = item.id ?? item.timestamp ?? JSON.stringify(item);
          if(!lastSeen.has(id)){
            lastSeen.add(id);
            added = true;
            const entry = document.createElement('div');
            entry.style.padding = '8px';
            entry.style.borderBottom = '1px solid rgba(255,255,255,0.03)';
            entry.style.fontSize = '0.95rem';
            const time = item.timestamp ? new Date(item.timestamp).toLocaleString() + ' — ' : '';
            entry.textContent = time + (item.text ?? item.message ?? JSON.stringify(item));
            if(matrix) matrix.appendChild(entry);
          }
        });
        if(added && matrix) matrix.scrollTop = matrix.scrollHeight;
        setOrb(data.length > 0);
      } else {
        setOrb(false);
      }
    }catch(e){
      setOrb(false);
      // swallow errors silently, but keep polling
    }
    setTimeout(poll, POLL_MS);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // If the page loaded before this script was fetched, elements exist; otherwise poll will be noop until DOM ready
    if(matrix) poll();
  });
})();