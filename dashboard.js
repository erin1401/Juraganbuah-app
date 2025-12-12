// =========================
//  DASHBOARD.JS FINAL V4
// =========================

// Cek login
document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedUser");
    if (!user) {
        window.location = "login.html";
        return;
    }

    loadSummary();
    loadSalesChart();
});


// =========================
// LOAD SUMMARY
// =========================

function loadSummary() {
    const items = getItems();
    const buyers = getBuyers();
    const sales = getSales();

    // Hitung pendapatan total
    let revenue = 0;
    sales.forEach(s => revenue += Number(s.total || 0));

    document.getElementById("sumItems").textContent = items.length;
    document.getElementById("sumBuyers").textContent = buyers.length;
    document.getElementById("sumSales").textContent = sales.length;
    document.getElementById("sumRevenue").textContent = formatRupiah(revenue);
}



// =========================
//  GRAFIK 7 HARI TERAKHIR
// =========================

function loadSalesChart() {
    const sales = getSales();

    // Siapkan tanggal 7 hari terakhir
    let labels = [];
    let dataRevenue = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
        labels.push(formatTanggalShort(key));

        // hitung total penjualan hari tersebut
        let totalDay = 0;
        sales.forEach(s => {
            if (s.date === key) {
                totalDay += Number(s.total || 0);
            }
        });

        dataRevenue.push(totalDay);
    }

    // Jika belum ada transaksi → tampilkan grafik kosong
    const ctx = document.getElementById('salesChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Pendapatan",
                data: dataRevenue,
                borderWidth: 3,
                borderColor: "#0E4F24",
                backgroundColor: "rgba(14, 79, 36, 0.2)",
                tension: 0.3,
                pointRadius: 5,
                pointBackgroundColor: "#0E4F24"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}



// =========================
//  LOGOUT
// =========================

function logout() {
    localStorage.removeItem("loggedUser");
    window.location = "login.html";
}



// =========================
//  HELPER TANGGAL SINGKAT
// =========================

function formatTanggalShort(str) {
    const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    const d = new Date(str);
    return d.getDate() + " " + bulan[d.getMonth()];
}
