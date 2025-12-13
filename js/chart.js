/* =====================================
   DASHBOARD CHART MODULE — LEVEL 7
===================================== */

function renderCharts() {
  renderSalesChart();
  renderTopItems();
}

/* ===== PENJUALAN HARIAN ===== */
function renderSalesChart() {
  const sales = DataStore.getSales();
  const daily = {};

  sales.forEach(s => {
    const d = new Date(s.date).toLocaleDateString();
    daily[d] = (daily[d] || 0) + s.total;
  });

  const labels = Object.keys(daily);
  const data = Object.values(daily);

  new Chart(document.getElementById("salesChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Penjualan Harian",
        data,
        borderColor: "#1abc9c",
        backgroundColor: "rgba(26,188,156,.2)",
        fill: true,
        tension: .4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

/* ===== ITEM TERLARIS ===== */
function renderTopItems() {
  const sales = DataStore.getSales();
  const map = {};

  sales.forEach(s => {
    s.items.forEach(i => {
      map[i.name] = (map[i.name] || 0) + i.qty;
    });
  });

  const labels = Object.keys(map);
  const data = Object.values(map);

  new Chart(document.getElementById("itemChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Item Terjual",
        data,
        backgroundColor: "#3498db"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}
