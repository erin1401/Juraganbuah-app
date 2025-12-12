/* ============================================================
   JURAGAN BUAH — dashboard.js FINAL LEVEL 4
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    // =======================================================
    // CEK LOGIN
    // =======================================================
    const user = JSON.parse(localStorage.getItem("jb_logged_user"));

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Tampilkan nama user
    const userNameBox = document.getElementById("userName");
    if (userNameBox) userNameBox.innerText = user.name;


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


    // =======================================================
    // GRAFIK PENJUALAN
    // =======================================================
    function renderSalesChart() {
        const canvas = document.getElementById("salesChart");
        if (!canvas) return;

        // Ambil total penjualan per tanggal
        const dailyTotals = {};

        sales.forEach(s => {
            if (!dailyTotals[s.date]) dailyTotals[s.date] = 0;
            dailyTotals[s.date] += s.total;
        });

        const labels = Object.keys(dailyTotals);
        const data = Object.values(dailyTotals);

        new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Total Penjualan (Rp)",
                    data: data,
                    borderColor: "#27ae60",
                    backgroundColor: "rgba(39,174,96,0.2)",
                    borderWidth: 3,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    renderSalesChart();


    // =======================================================
    // LOGOUT
    // =======================================================
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("jb_logged_user");
            window.location.href = "login.html";
        });
    }

});
