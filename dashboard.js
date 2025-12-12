/* ==========================================================
   dashboard.js — Juragan Buah (Level 4)
   Mengisi statistik + grafik + validasi login
   ========================================================== */

console.log("Dashboard JS Loaded ✔");

// -------------------------------
// CEK LOGIN
// -------------------------------
function checkLogin() {
  const user = localStorage.getItem("loggedUser");
  if (!user) {
    window.location.href = "login.html";
    return;
  }
}
checkLogin();

// -------------------------------
// LOGOUT
// -------------------------------
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}

// -------------------------------
// FORMAT RUPIAH
// -------------------------------
function formatRupiah(num) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

// -------------------------------
// HITUNG PENJUALAN HARI INI
// -------------------------------
function getSalesToday() {
  const today = new Date().toISOString().slice(0, 10);

  const todaySales = sales.filter(s => s.date === today);

  let total = 0;
  todaySales.forEach(sale => {
    sale.items.forEach(item => {
      total += item.qty * item.price;
    });
  });

  return total;
}

// -------------------------------
// ISI CARD
// -------------------------------
function fillCards() {
  document.getElementById("salesToday").textContent = formatRupiah(
    getSalesToday()
  );

  document.getElementById("totalItems").textContent = items.length;
  document.getElementById("totalBuyers").textContent = buyers.length;
}

fillCards();

// -------------------------------
// SIAPKAN DATA GRAFIK MINGGUAN
// -------------------------------
function getWeeklyChartData() {
  const labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const weekly = [0,0,0,0,0,0,0];

  sales.forEach(sale => {
    let d = new Date(sale.date);
    let day = d.getDay(); 

    // Ubah format JS (0=Min) ke format kita (0=Sen)
    let idx = (day === 0 ? 6 : day - 1);

    sale.items.forEach(it => {
      weekly[idx] += it.price * it.qty;
    });
  });

  return { labels, weekly };
}

const chartData = getWeeklyChartData();

// -------------------------------
// RENDER GRAFIK
// -------------------------------
function renderChart() {
  const ctx = document.getElementById("salesChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Penjualan",
          data: chartData.weekly,
          borderColor: "#0E4F24",
          backgroundColor: "rgba(14,79,36,0.15)",
          borderWidth: 3,
          tension: 0.35,
          fill: true,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return "Rp " + value.toLocaleString("id-ID");
            },
          },
        },
      },
    },
  });
}

renderChart();
