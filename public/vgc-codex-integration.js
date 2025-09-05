// Lightweight Codex polling + safe render for the AI Response Matrix
// Poll interval: 6000ms. Adjust as needed.

(function(){
  const POLL_MS = 6000;
  const ENDPOINT = '/codex/echo/list?limit=12';
  const container = document.getElementById('responseMatrix');
  if(!container) return;

  function escapeHtml(s){
    return String(s).replace(/[&<>"'`]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;', '`':'&#96;'}[c]));
  }

  function renderEcho(e){
    // e has shape: { receivedAt, remoteAddr, echo: { tokenId, node, result, processedAt, note, originalToken } }
    const time = escapeHtml(e.receivedAt || (e.echo && e.echo.processedAt) || '');
    const node = escapeHtml((e.echo && e.echo.node) || e.node || 'unknown');
    const id = escapeHtml((e.echo && e.echo.tokenId) || '');
    let note = '';
    if(e.echo && e.echo.note) note = escapeHtml(e.echo.note);
    else if(e.echo && e.echo.originalToken) note = escapeHtml(JSON.stringify(e.echo.originalToken));
    else if(e.note) note = escapeHtml(e.note);
    return `<div style="padding:8px;background:rgba(217,27,134,0.12);border-radius:6px;margin-bottom:8px;border-left:3px solid #d91b86">
      <strong>🔔 ${node}</strong> <small style="opacity:.8">[${time}]</small>
      <div style="margin-top:6px;font-size:.92rem">${note} <span style="opacity:.65">${id}</span></div>
    </div>`;
  }

  async function fetchAndUpdate(){
    try{
      const res = await fetch(ENDPOINT, {cache:'no-store'});
      if(!res.ok) throw new Error('status '+res.status);
      const json = await res.json();
      const results = Array.isArray(json.results) ? json.results : (json.results || []);
      if(results.length === 0) return;
      const fragment = document.createDocumentFragment();
      results.slice().reverse().forEach(r=>{
        const div = document.createElement('div');
        div.innerHTML = renderEcho(r);
        fragment.appendChild(div.firstElementChild);
      });
      while(container.children.length > 40) container.removeChild(container.firstChild);
      container.appendChild(fragment);
      container.scrollTop = container.scrollHeight;
      document.getElementById('statusOrb').title = 'Codex: linked';
    }catch(err){
      document.getElementById('statusOrb').title = 'Codex poll failed';
    }
  }

  // initial fetch + periodic polling
  fetchAndUpdate();
  setInterval(fetchAndUpdate, POLL_MS);
})();