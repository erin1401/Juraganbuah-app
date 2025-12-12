/* ============================================================
   report-profit.js — Juragan Buah
   Laporan Laba Rugi (Level UI 4)
============================================================ */

window.onload = () => {
  loadProfit();
};

/* ============================================================
   GENERATE LAPORAN LABA RUGI
============================================================ */
function loadProfit(startDate = null, endDate = null) {
  const tbody = document.getElementById("profitTable");
  tbody.innerHTML = "";

  let totalSales = 0;
  let totalCost = 0;

  // Loop semua transaksi penjualan
  sales.forEach((sale, index) => {
    const saleDate = new Date(sale.date);

    // Filter tanggal jika ada
    if (startDate && saleDate < new Date(startDate)) return;
    if (endDate && saleDate > new Date(endDate)) return;

    const item = items.find(i => i.id == sale.itemId);
    if (!item) return;

    // Perhitungan
    const qty = sale.qty;
    const hargaJual = sale.price;
    const hargaModal = item.cost || 0; // ambil harga modal
    const subtotalCost = qty * hargaModal;
    const subtotalSell = qty * hargaJual;

    totalSales += subtotalSell;
    totalCost += subtotalCost;

    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${formatDate(sale.date)}</td>
        <td>${item.name}</td>
        <td>${qty}</td>
        <td>Rp ${formatNumber(hargaJual)}</td>
        <td>Rp ${formatNumber(hargaModal)}</td>
        <td>Rp ${formatNumber(subtotalCost)}</td>
        <td>Rp ${formatNumber(subtotalSell)}</td>
      </tr>
    `;
  });

  // Laba
  const grossProfit = totalSales - totalCost;
  const netProfit = grossProfit; // bisa ditambah biaya operasional nanti

  // Tampilkan ringkasan
  document.getElementById("profitSales").innerText = "Rp " + formatNumber(totalSales);
  document.getElementById("profitCost").innerText = "Rp " + formatNumber(totalCost);
  document.getElementById("profitGross").innerText = "Rp " + formatNumber(grossProfit);
  document.getElementById("profitNet").innerText = "Rp " + formatNumber(netProfit);
}

/* ============================================================
   FILTER LAPORAN
============================================================ */
function filterProfit() {
  const start = document.getElementById("profitStart").value;
  const end = document.getElementById("profitEnd").value;
  loadProfit(start, end);
}

/* ============================================================
   CETAK / PRINT LAPORAN
============================================================ */
function printProfit() {
  const frame = document.getElementById("printFrame").contentWindow;

  let html = `
    <h2 style="font-family:Arial">Laporan Laba Rugi — Juragan Buah</h2>
    <table style="width:100%;border-collapse:collapse;font-size:13px;font-family:Arial;">
      <tr>
        <th style="border-bottom:1px solid #000;text-align:left;">Tanggal</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Item</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Qty</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Harga Modal</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Subtotal Modal</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Harga Jual</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Subtotal Jual</th>
      </tr>
  `;

  sales.forEach(s => {
    const item = items.find(i => i.id == s.itemId);
    if (!item) return;

    const modal = item.cost || 0;
    const subtotalModal = modal * s.qty;
    const subtotalJual = s.price * s.qty;

    html += `
      <tr>
        <td>${formatDate(s.date)}</td>
        <td>${item.name}</td>
        <td>${s.qty}</td>
        <td>Rp ${formatNumber(modal)}</td>
        <td>Rp ${formatNumber(subtotalModal)}</td>
        <td>Rp ${formatNumber(s.price)}</td>
        <td>Rp ${formatNumber(subtotalJual)}</td>
      </tr>
    `;
  });

  html += `
    </table>
    <script>window.print()<\/script>
  `;

  frame.document.body.innerHTML = html;
}
