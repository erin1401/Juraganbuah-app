/* ============================================================
   DASHBOARD.JS — Juragan Buah Level 4 Final
   Menangani:
   - Hitung total item
   - Hitung total pembeli
   - Hitung transaksi harian
   - Render Chart.js
   ============================================================ */

// Pastikan DataStore siap
if (typeof DataStore === "undefined") {
  console.error("DataStore tidak ditemukan.");
}

// Ambil elemen DOM
const elTotalItems   = document.getElementById("totalItems");
const elTotalBuyers  = document.getElementById("totalBuyers");
const elTodaySales   = document.getElementById("todaySales");

// ============ LOAD DATA ==============
function loadDashboardData() {

  // --- TOTAL ITEMS ---
  const items = DataStore.getItems() || [];
  elTotalItems.textContent = items.length;

  // --- TOTAL BUYERS ---
  const buyers = DataStore.getBuyers() || [];
  elTotalBuyers.textContent = buyers.length;

  // --- TOTAL SALES HARI INI ---
  const sales = DataStore.getSales() || [];
  const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD

  const todayCount = sales.filter(s => s.date === today).length;
  elTodaySales.textContent = todayCount;
}

// ============ CHART ==============
let chartRef = null;

function renderChart() {
  const ctx = document.getElementById("salesChart");

  if (!ctx) return;

  const sales = DataStore.getSales() || [];

  // Buat ringkasan penjualan per hari
  const grouped = {};
  sales.forEach(s => {
    if (!grouped[s.date]) grouped[s.date] = 0;
    grouped[s.date] += Number(s.total) || 0;
  });

  const labels = Object.keys(grouped);
  const values = Object.values(grouped);

  if (chartRef) chartRef.destroy();

  chartRef = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Penjualan Harian (Rp)",
        data: values,
        fill: true,
        borderColor: "#0E4F24",
        backgroundColor: "rgba(14,79,36,0.2)",
        borderWidth: 3,
        tension: 0.3,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: { ticks: { color: "#333" }},
        y: { ticks: { color: "#333" }}
      }
    }
  });
}

// ============ INITIAL RUN ==============
document.addEventListener("DOMContentLoaded", () => {
  try {
    loadDashboardData();
    renderChart();
  } catch (e) {
    console.error("Dashboard gagal load:", e);
  }
});
