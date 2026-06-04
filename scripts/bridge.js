
const SCRIPT_URL='https://script.google.com/a/macros/mercadolivre.com/s/AKfycbxHGNvlrL_kItJQCgqX6k0BxjvHNIj0UlGx8TN14jpJpQkNGPFWv-8sanbpLDtuoSNC/exec';
const PORTALS={home:'home',colab:'colab',lms:'lms',org:'org',bingo:'bingo'};
async function _srvCall(action,args){const res=await fetch(SCRIPT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,args})});if(!res.ok)throw new Error('HTTP '+res.status);const json=await res.json();if(json.success===false)throw new Error(json.error||'Servidor indisponível');return json.data;}
const _SRV=['getFuncionarios','getLmsDashboardData','salvarFuncionario','excluirFuncionario','getAppsData','adminManageApp','getMeuPerfilHome','processarBingo','syncUpdates','salvarBingoManual','salvarConfMdl','atualizarQueryBQ','getRawDataDebug','buscarSugestoesDiretorio','captarTudoDoUsuario','captarMeuPerfil','debugBingoTabelas','uploadCsvFaltantes','sincronizarFaltantesBingo'];
function _mkR(){let _ok=null,_err=null;const r={withSuccessHandler(cb){_ok=cb;return r},withFailureHandler(cb){_err=cb;return r}};_SRV.forEach(m=>{r[m]=(...a)=>_srvCall(m,a).then(d=>_ok&&_ok(d)).catch(e=>_err?_err({message:e.message}):console.error('['+m+']',e.message))});return r;}
const google={script:{run:new Proxy({},{get(_,p){const r=_mkR();return typeof r[p]==='function'?r[p].bind(r):r[p]}})}};
function navTo(t){if(typeof showModule==='function')showModule(PORTALS[t]||'home');}
