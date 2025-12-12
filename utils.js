/* utils.js — UI Level 4 helpers */
function formatRupiah(v=0){ return 'Rp ' + Number(v||0).toLocaleString('id-ID'); }
function today(){ return new Date().toISOString().slice(0,10); }
function sleep(ms){ return new Promise(res=>setTimeout(res,ms)); }

/* local storage safe */
function setStore(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function getStore(k,d=null){ try{ const s = localStorage.getItem(k); return s? JSON.parse(s) : d; }catch(e){ return d; } }

/* auth helpers */
function ensureLoginRedirect(){
  const u = DataStore.getLoginUser();
  if(!u){ window.location.href = 'login.html'; return false; }
  return true;
}

/* modal + toast */
function openModalHTML(html){
  const bg = document.getElementById('modal'); const box=document.getElementById('modalBox');
  if(!bg || !box) return;
  box.innerHTML = html; bg.style.display='flex';
}
function closeModal(){ const bg=document.getElementById('modal'); if(bg) bg.style.display='none'; }
function toast(msg, type='ok'){ const t=document.getElementById('toast'); t.innerText = msg; t.style.display='block'; t.className = 'toast ' + (type==='err'?'err':''); setTimeout(()=> t.style.display='none',1800); }

/* expose */
window.formatRupiah = formatRupiah; window.today = today; window.sleep = sleep;
window.setStore = setStore; window.getStore = getStore;
window.ensureLoginRedirect = ensureLoginRedirect; window.openModal = openModalHTML; window.closeModal = closeModal; window.toast = toast;
