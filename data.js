/* data.js — Level 4 final data store */
function rid(){ return 'id'+Math.random().toString(36).slice(2,10); }
function setStore(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function getStore(k,d){ try{ const s=localStorage.getItem(k); return s? JSON.parse(s): d; }catch(e){ return d; } }

const DataStore = (function(){
  // seed if empty
  if(!getStore('items')) setStore('items', [
    { id: rid(), code:'APL01', name:'Apel Fuji', price:12000, cost:8000, stock:30 },
    { id: rid(), code:'ORG01', name:'Jeruk Manis', price:8000, cost:5000, stock:50 }
  ]);
  if(!getStore('buyers')) setStore('buyers', [{ id: rid(), name:'Umum', phone:'', address:'' }]);
  if(!getStore('users')) setStore('users', [{ id: rid(), username:'admin', password: btoa('admin'), role:'admin', created: today() }]);
  if(!getStore('sales')) setStore('sales', []);
  if(!getStore('stockIn')) setStore('stockIn', []);
  if(!getStore('stockOut')) setStore('stockOut', []);
  if(!getStore('opname')) setStore('opname', []);

  // items
  function getItems(){ return getStore('items', []); }
  function addItem(it){ it.id = it.id || rid(); it.stock = Number(it.stock||0); const a=getItems(); a.push(it); setStore('items', a); return it; }
  function updateItem(id, patch){ const all=getItems(); const idx=all.findIndex(x=>x.id===id); if(idx>=0){ all[idx] = {...all[idx], ...patch}; setStore('items', all); } }
  function deleteItem(id){ setStore('items', getItems().filter(x=>x.id!==id)); setStore('stockIn', getStockIn().filter(r=>r.itemId!==id)); setStore('stockOut', getStockOut().filter(r=>r.itemId!==id)); }

  // buyers
  function getBuyers(){ return getStore('buyers', []); }
  function addBuyer(b){ b.id = b.id || rid(); const a=getBuyers(); a.push(b); setStore('buyers', a); return b; }
  function updateBuyer(id, patch){ const a=getBuyers(); const i=a.findIndex(x=>x.id===id); if(i>=0){ a[i]= {...a[i], ...patch}; setStore('buyers', a); } }
  function deleteBuyer(id){ setStore('buyers', getBuyers().filter(x=>x.id!==id)); }

  // stockin/out/opname
  function getStockIn(){ return getStore('stockIn', []); }
  function addStockIn(rec){ rec.id=rid(); rec.qty=Number(rec.qty||0); rec.price=Number(rec.price||0); rec.date = rec.date || today(); const a=getStockIn(); a.push(rec); setStore('stockIn', a); // update stok
    const it = getItems().find(x=>x.id===rec.itemId); if(it){ it.stock = Number(it.stock||0) + Number(rec.qty); updateItem(it.id, { stock: it.stock }); } return rec;
  }

  function getStockOut(){ return getStore('stockOut', []); }
  function addStockOut(rec){ rec.id=rid(); rec.qty=Number(rec.qty||0); rec.date = rec.date || today(); const a=getStockOut(); a.push(rec); setStore('stockOut', a);
    const it = getItems().find(x=>x.id===rec.itemId); if(it){ it.stock = Math.max(0, Number(it.stock||0) - Number(rec.qty)); updateItem(it.id, { stock: it.stock }); } return rec;
  }

  function getOpname(){ return getStore('opname', []); }
  function addOpname(rec){ rec.id=rid(); rec.qty=Number(rec.qty||0); rec.date = rec.date || today(); const a=getOpname(); a.push(rec); setStore('opname', a); // apply to item
    const it = getItems().find(x=>x.id===rec.itemId); if(it){ it.stock = Number(rec.qty); updateItem(it.id, { stock: rec.qty }); } return rec;
  }

  // compute stock realtime
  function getStock(itemId){
    const it = getItems().find(x=>x.id===itemId);
    return it ? Number(it.stock||0) : 0;
  }

  // users
  function getUsers(){ return getStore('users', []); }
  function addUser(u){ u.id = u.id || rid(); u.password = btoa(u.password||'123456'); u.created = u.created || today(); const a=getUsers(); a.push(u); setStore('users', a); }
  function updateUser(id, patch){ const a=getUsers(); const i=a.findIndex(x=>x.id===id); if(i>=0){ if(patch.password) patch.password = btoa(patch.password); a[i] = {...a[i], ...patch}; setStore('users', a); } }
  function deleteUser(id){ setStore('users', getUsers().filter(x=>x.id!==id)); }

  // sales
  function getSales(){ return getStore('sales', []); }
  function addSale(sale){
    sale.id = sale.id || rid();
    sale.date = sale.date || today();
    sale.total = Number(sale.total||0);
    sale.bayar = Number(sale.bayar||sale.pay||0);
    sale.kembali = Number(sale.kembali|| (sale.bayar - sale.total) || 0);
    const a = getSales(); a.push(sale); setStore('sales', a); return sale;
  }

  // auth
  function getLoginUser(){ return getStore('loginUser', null); }
  function login(username, password){
    const users = getUsers(); const ph = btoa(password);
    const u = users.find(x=> x.username === username && x.password === ph);
    if(!u) return false;
    setStore('loginUser', u);
    return true;
  }
  function logout(){ localStorage.removeItem('loginUser'); }

  return {
    getItems, addItem, updateItem, deleteItem,
    getBuyers, addBuyer, updateBuyer, deleteBuyer,
    getStockIn, addStockIn, getStockOut, addStockOut, getOpname, addOpname,
    getStock, getUsers, addUser, updateUser, deleteUser,
    getSales, addSale, getLoginUser, login, logout
  };
})();
window.DataStore = DataStore;
