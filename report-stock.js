/* ============================================================
   report-stock.js — Juragan Buah
   Laporan Persediaan — Level 4
============================================================ */

window.onload = () => {
  renderStockReport();
};

/* ============================================================
   HITUNG LAPORAN PERSEDIAAN
============================================================ */
function renderStockReport() {
  const tbody = document.getElementById("stockReportTable");
  tbody.innerHTML = "";

  items.forEach((item, i) => {
    // Hitung stok masuk berdasarkan itemId
    const masuk = stockIn
      .filter(s => s.itemId == item.id)
      .reduce((a, b) => a + b.qty, 0);

    // Hitung stok keluar berdasarkan itemId
    const keluar = stockOut
      .filter(s => s.itemId == item.id)
      .reduce((a, b) => a + b.qty, 0);

    // Hitung opname terakhir (jika ada)
    const opnameData = opname.filter(o => o.itemId == item.id);
    const opnameValue =
      opnameData.length > 0
        ? opnameData[opnameData.length - 1].qty
        : "-";

    const stokAkhir = item.stock;

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td>${item.initialStock || 0}</td>
        <td>${masuk}</td>
        <td>${keluar}</td>
        <td>${opnameValue}</td>
        <td>${stokAkhir}</td>
      </tr>
    `;
  });
}

/* ============================================================
   CETAK LAPORAN PERSEDIAAN
============================================================ */
function printStockReport() {
  const frame = document.getElementById("printFrame").contentWindow;

  let html = `
    <h2>Laporan Persediaan — Juragan Buah</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr>
        <th style="border-bottom:1px solid #000;text-align:left;">Item</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Stok Awal</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Masuk</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Keluar</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Opname</th>
        <th style="border-bottom:1px solid #000;text-align:left;">Sisa</th>
      </tr>
  `;

  items.forEach(item => {
    const masuk = stockIn.filter(s => s.itemId == item.id).reduce((a,b)=>a+b.qty,0);
    const keluar = stockOut.filter(s => s.itemId == item.id).reduce((a,b)=>a+b.qty,0);
    const opData = opname.filter(o => o.itemId == item.id);
    const opValue = opData.length ? opData[opData.length-1].qty : "-";
    const akhir = item.stock;

    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.initialStock || 0}</td>
        <td>${masuk}</td>
        <td>${keluar}</td>
        <td>${opValue}</td>
        <td>${akhir}</td>
      </tr>
    `;
  });

  html += `
    </table>
    <script>window.print()<\/script>
  `;

  frame.document.body.innerHTML = html;
}
