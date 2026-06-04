
const SCRIPT_URL='https://script.google.com/a/macros/mercadolivre.com/s/AKfycbxHGNvlrL_kItJQCgqX6k0BxjvHNIj0UlGx8TN14jpJpQkNGPFWv-8sanbpLDtuoSNC/exec';
const PORTALS={home:'home',colab:'colab',lms:'lms',org:'org',bingo:'bingo'};

// ── Guest mode ───────────────────────────────────────────────────────────────
const GUEST_MODE = new URLSearchParams(window.location.search).get('guest') === '1';
const GUEST_DURATION_MS = 60 * 60 * 1000;
const _GUEST_START = GUEST_MODE ? Date.now() : null;

const _MOCK = {
  getMeuPerfilHome:  () => ({nome:'Visitante Demo', foto:'', iniciais:'VD'}),
  getAppsData:       () => [
    {title:'Colaboradores', icon:'users',         url:'colab'},
    {title:'LMS',           icon:'graduation-cap', url:'lms'},
    {title:'Organograma',   icon:'git-fork',       url:'org'},
    {title:'Bingo',         icon:'grid-2x2',       url:'bingo'},
  ],
  getFuncionarios:   () => [
    {ID_UNICO:'D1',NOME:'Ana Demo',EMAIL:'ana@demo.com',CARGO:'Analista',EMPRESA:'ML',UNIDADE:'SP',TURNO:'M',MODAL:'van',LIDER:'Carlos Demo',LIDER_EMAIL:'carlos@demo.com',LMS_ID:'10001'},
    {ID_UNICO:'D2',NOME:'Bruno Demo',EMAIL:'bruno@demo.com',CARGO:'Supervisor',EMPRESA:'ML',UNIDADE:'RJ',TURNO:'T',MODAL:'moto',LIDER:'Carlos Demo',LIDER_EMAIL:'carlos@demo.com',LMS_ID:'10002'},
  ],
  getLmsDashboardData: () => ({extQuery:[], queryLms:[]}),
  captarMeuPerfil:   () => ({nome:'Visitante Demo', email:'guest@demo.com', foto:'', iniciais:'VD', cargo:'Demo', unidade:'Demo'}),
  captarTudoDoUsuario:() => ({funcionario:null, historico:[]}),
  getAppsData:       () => [],
};

function _guestCall(action) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fn = _MOCK[action];
      if (fn) resolve(fn());
      else resolve(null);
    }, 300);
  });
}

if (GUEST_MODE) {
  // Banner with countdown
  document.addEventListener('DOMContentLoaded', function() {
    const remaining = () => {
      const ms = GUEST_DURATION_MS - (Date.now() - _GUEST_START);
      if (ms <= 0) return null;
      const m = String(Math.floor(ms / 60000)).padStart(2,'0');
      const s = String(Math.floor((ms % 60000) / 1000)).padStart(2,'0');
      return `${m}:${s}`;
    };
    const banner = document.createElement('div');
    banner.id = 'guest-banner';
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#3483fa;color:#fff;text-align:center;padding:8px;font-size:13px;font-weight:bold;z-index:99999;';
    banner.innerHTML = '👤 Modo Visitante — sessão expira em <span id="guest-timer">60:00</span> &nbsp;|&nbsp; <a href="?" style="color:#ffe600;">Sair do modo visitante</a>';
    document.body.appendChild(banner);
    const iv = setInterval(() => {
      const t = remaining();
      const el = document.getElementById('guest-timer');
      if (!t) { clearInterval(iv); if(el) el.closest('#guest-banner').innerHTML = '⏱️ Sessão de visitante expirada. <a href="?" style="color:#ffe600;">Recarregar</a>'; }
      else if (el) el.textContent = t;
    }, 1000);
  });
}

// ── API call ─────────────────────────────────────────────────────────────────
async function _srvCall(action,args){
  if (GUEST_MODE) return _guestCall(action);
  const res=await fetch(SCRIPT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,args})});
  if(!res.ok)throw new Error('HTTP '+res.status);
  const json=await res.json();
  if(json.success===false)throw new Error(json.error||'Servidor indisponível');
  return json.data;
}

const _SRV=['getFuncionarios','getLmsDashboardData','salvarFuncionario','excluirFuncionario','getAppsData','adminManageApp','getMeuPerfilHome','processarBingo','syncUpdates','salvarBingoManual','salvarConfMdl','atualizarQueryBQ','getRawDataDebug','buscarSugestoesDiretorio','captarTudoDoUsuario','captarMeuPerfil','debugBingoTabelas','uploadCsvFaltantes','sincronizarFaltantesBingo'];
function _mkR(){let _ok=null,_err=null;const r={withSuccessHandler(cb){_ok=cb;return r},withFailureHandler(cb){_err=cb;return r}};_SRV.forEach(m=>{r[m]=(...a)=>_srvCall(m,a).then(d=>_ok&&_ok(d)).catch(e=>_err?_err({message:e.message}):console.error('['+m+']',e.message))});return r;}
const google={script:{run:new Proxy({},{get(_,p){const r=_mkR();return typeof r[p]==='function'?r[p].bind(r):r[p]}})}};
function navTo(t){if(typeof showModule==='function')showModule(PORTALS[t]||'home');}
