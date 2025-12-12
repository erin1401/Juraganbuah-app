/* ============================================================
   DASHBOARD.JS — FINAL LEVEL 4
   Mengisi ringkasan + grafik penjualan pada dashboard
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    // DATA
    const items = DataStore.getItems();
    const buyers = DataStore.getBuyers();
    const sales = DataStore.getSales();

    /* ===================== RINGKASAN ======================== */

    document.getElementById("sumItems").innerText = items.length;
    document.getElementById("sumBuyers").innerText = buyers.length;
    document.getElementById("sumSales").innerText = sales.length;

    let totalRevenue = 0;
    sales.forEach(s => {
        totalRevenue += Number(s.total || 0);
    });

    document.getElementById("sumRevenue").innerText = formatRupiah(totalRevenue);


    /* ===================== GRAFIK PENJUALAN ================== */

    // Ambil 7 hari terakhir
    let labels = [];
    let values = [];

    for (let i = 6; i >= 0; i--) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        let tanggal = d.toISOString().slice(0, 10);

        labels.push(tanggal);

        // Hitung total pendapatan hari tersebut
        let daily = sales
            .filter(s => s.date === tanggal)
            .reduce((a, b) => a + Number(b.total || 0), 0);

        values.push(daily);
    }

    // Render Chart.js
    const ctx = document.getElementById("salesChart");

    if (ctx) {
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Pendapatan Harian",
                    data: values,
                    borderColor: "#0E4F24",
                    backgroundColor: "rgba(14, 79, 36, 0.20)",
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            callback: (v) => "Rp " + v.toLocaleString("id-ID")
                        }
                    }
                }
            }
        });
    }
});
