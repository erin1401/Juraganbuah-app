/* ============================================================
   report-sales.js — Juragan Buah
   Laporan Penjualan — Level 4
============================================================ */

window.onload = () => {
  renderSales(sales);
};

/* --------------------------------------
   RENDER TABEL LAPORAN
---------------------------------------*/
function renderSales(list) {
  const tbody = document.getElementById("reportSalesTable");
  tbody.innerHTML = "";

  let total = 0;

  list.forEach((s, i) => {
    const buyer = buyers.find(b => b.id == s.buyerId);

    total += s.total;

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${s.tanggal}</td>
        <td>${buyer ? buyer.name : "-"}</td>
        <td>Rp ${s.total.toLocaleString()}</td>
        <td>${s.metode.toUpperCase()}</td>
      </tr>
    `;
  });

  document.getElementById("totalPeriod").innerText =
    "Rp " + total.toLocaleString();
}

/* --------------------------------------
   FILTER TANGGAL
---------------------------------------*/
function filterSales() {
  const start = document.getElementById("dateStart").value;
  const end = document.getElementById("dateEnd").value;

  if (!start || !end) {
    showAlert("Tanggal belum lengkap!", "error");
    return;
  }

  const d1 = new Date(start);
  const d2 = new Date(end);

  const filtered = sales.filter(s => {
    const sd = new Date(s.tanggal);
    return sd >= d1 && sd <= d2;
  });

  renderSales(filtered);
}

/* --------------------------------------
   CETAK / PRINT PDF
---------------------------------------*/
function printReport() {
  const frame = document.getElementById("printFrame").contentWindow;

  let html = `
  <h2>Laporan Penjualan — Juragan Buah</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr>
      <th style="border-bottom:1px solid #000;text-align:left;">Tanggal</th>
      <th style="border-bottom:1px solid #000;text-align:left;">Pembeli</th>
      <th style="border-bottom:1px solid #000;text-align:right;">Total</th>
      <th style="border-bottom:1px solid #000;text-align:left;">Metode</th>
    </tr>
  `;

  let total = 0;

  sales.forEach(s => {
    const buyer = buyers.find(b => b.id == s.buyerId);
    total += s.total;

    html += `
      <tr>
        <td>${s.tanggal}</td>
        <td>${buyer ? buyer.name : "-"}</td>
        <td style="text-align:right;">Rp ${s.total.toLocaleString()}</td>
        <td>${s.metode.toUpperCase()}</td>
      </tr>
    `;
  });

  html += `
    <tr>
      <td colspan="4" style="padding-top:20px;font-weight:bold;">
        Total Keseluruhan: Rp ${total.toLocaleString()}
      </td>
    </tr>
  </table>
  <script>window.print()<\/script>
  `;

  frame.document.body.innerHTML = html;
}
