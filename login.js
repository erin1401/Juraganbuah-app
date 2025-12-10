// login.js — safe login (uses DataStore in data.js)
document.addEventListener('DOMContentLoaded', ()=> {
  // if already logged in -> dashboard
  if (DataStore.getLoginUser()) {
    setTimeout(()=> location.href = 'dashboard.html', 200);
    return;
  }

  document.getElementById('btnClear').onclick = ()=> {
    inpUser.value=''; inpPass.value='';
  };

  document.getElementById('btnLogin').onclick = async () => {
    const u = (document.getElementById('inpUser').value || '').trim();
    const p = (document.getElementById('inpPass').value || '').trim();
    const msg = document.getElementById('loginMsg');
    msg.textContent='';

    if(!u || !p){ msg.textContent = 'Isi username & password'; msg.className='msg msg-warn'; return; }

    // attempt login via DataStore
    const ok = DataStore.login(u,p);
    if(!ok){ msg.textContent = 'Username / password salah'; msg.className='msg msg-error'; return; }

    // give localStorage time to persist
    setTimeout(()=> location.href = 'dashboard.html', 120);
  };
});
