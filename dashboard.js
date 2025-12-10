// dashboard.js
document.addEventListener('DOMContentLoaded', ()=>{
  // require login
  const user = DataStore.getLoginUser();
  if(!user){ location.href = 'login.html'; return; }
  document.getElementById('userBox').innerText = user.username + ' (' + user.role + ')';

  const items = DataStore.getItems();
  const sales = DataStore.getSales();
  const buyers = DataStore.getBuyers();

  document.getElementById('k_items').innerText = items.length;
  document.getElementById('k_tx').innerText = sales.length;
  const totalSales = sales.reduce((s,x)=>s + Number(x.total || 0), 0);
  document.getElementById('k_total').innerText = formatRupiah(totalSales);
  document.getElementById('k_low').innerText = items.filter(i => Number(i.stock || 0) <= 5).length;

  // chart
  const daily = {};
  sales.forEach(s => { daily[s.date] = (daily[s.date] || 0) + Number(s.total || 0); });
  const labels = Object.keys(daily).slice(-7);
  const values = labels.map(d => daily[d]);

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = ()=> {
    const ctx = document.getElementById('salesChart');
    new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Penjualan', data: values, backgroundColor:'#28a745'}] },
      options: { responsive:true, scales:{ y:{ ticks:{ callback: v => formatRupiah(v) } } } }
    });
  };
  document.head.appendChild(script);
});
