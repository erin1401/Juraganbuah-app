/* ============================================================
   JURAGAN BUAH — dashboard.js FINAL LEVEL 4
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    // =======================================================
    // CEK LOGIN
    // =======================================================
    document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");

  if (!user) {
    // 🔥 BALIK KE LOGIN DENGAN PATH BENAR
    window.location.replace("./login.html");
    return;
  }

  // optional: tampilkan nama user
  try {
    const u = JSON.parse(user);
    const el = document.getElementById("currentUser");
    if (el) el.innerText = u.username;
  } catch (e) {}
});

    // =======================================================
    // LOAD DATA
    // =======================================================
    const items = DataStore.getItems();
    const sales = DataStore.getSales();
    const buyers = DataStore.getBuyers();


    // =======================================================
    // UPDATE STAT BOX
    // =======================================================
    function updateStats() {
        const totalItems = document.getElementById("statTotalItems");
        const totalBuyers = document.getElementById("statBuyers");
        const totalSales = document.getElementById("statSales");

        if (totalItems) totalItems.innerText = items.length;
        if (totalBuyers) totalBuyers.innerText = buyers.length;

        let totalRevenue = sales.reduce((a, b) => a + b.total, 0);
        if (totalSales) totalSales.innerText = "Rp " + totalRevenue.toLocaleString();
    }
    updateStats();


   /* =========================================
   DASHBOARD CHART – FINAL STEP 1
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Pastikan canvas ada
  const canvas = document.getElementById("salesChart");
  if (!canvas) return;

  // Ambil data penjualan
  const sales = DataStore.getSales() || [];

  // Kelompokkan penjualan per tanggal
  const daily = {};
  sales.forEach(s => {
    const date = s.date || new Date().toISOString().slice(0, 10);
    daily[date] = (daily[date] || 0) + (s.total || 0);
  });

  const labels = Object.keys(daily);
  const data   = Object.values(daily);

  // Jika tidak ada data → tampilkan dummy
  const chartLabels = labels.length ? labels : ["Belum ada data"];
  const chartData   = data.length ? data : [0];

  // Buat grafik
  new Chart(canvas, {
    type: "line",
    data: {
      labels: chartLabels,
      datasets: [{
        label: "Penjualan Harian",
        data: chartData,
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: v => "Rp " + v.toLocaleString("id-ID")
          }
        }
      }
    }
  });

});

    // =======================================================
    // LOGOUT
    // =======================================================
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("jb_logged_user");
            window.location.href = ".../pages/login.html";
        });
    }

});






