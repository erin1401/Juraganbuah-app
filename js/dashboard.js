// ================================
// DASHBOARD.JS FINAL LEVEL 8
// ================================

document.addEventListener("DOMContentLoaded", () => {
  protectPage();
  loadDashboard();
  setupSidebar();
});

/* ================================
   PROTECT PAGE (LOGIN CHECK)
================================ */
function protectPage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "../pages/login.html";
  }
  document.getElementById("currentUser").innerText =
    user.name + " (" + user.role + ")";
}

/* ================================
   LOAD DASHBOARD DATA
================================ */
function loadDashboard() {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const sales = JSON.parse(localStorage.getItem("sales")) || [];

  // TOTAL ITEM
  document.getElementById("totalItems").innerText = items.length;

  // TOTAL STOK
  let totalStock = 0;
  items.forEach(i => {
    totalStock += Number(i.stock || 0);
  });
  document.getElementById("totalStock").innerText = totalStock;

  // TOTAL PENJUALAN (AKURAT)
  let totalSales = 0;
  sales.forEach(trx => {
    trx.items.forEach(it => {
      totalSales += it.qty * it.price;
    });
  });

  document.getElementById("totalSales").innerText =
    "Rp " + totalSales.toLocaleString("id-ID");

  // LOAD CHART
  renderSalesChart(sales);
}

/* ================================
   SALES CHART
================================ */
function renderSalesChart(sales) {
  const ctx = document.getElementById("salesChart");
  if (!ctx) return;

  // GROUP BY DATE
  const map = {};
  sales.forEach(trx => {
    const date = trx.date;
    let sum = 0;
    trx.items.forEach(it => {
      sum += it.qty * it.price;
    });
    map[date] = (map[date] || 0) + sum;
  });

  const labels = Object.keys(map);
  const values = Object.values(map);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Penjualan Harian",
        data: values,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          ticks: {
            callback: v => "Rp " + v.toLocaleString("id-ID")
          }
        }
      }
    }
  });
}

/* ================================
   SIDEBAR TOGGLE (MOBILE)
================================ */
function setupSidebar() {
  const toggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");
  if (toggle) {
    toggle.onclick = () => sidebar.classList.toggle("open");
  }
}
