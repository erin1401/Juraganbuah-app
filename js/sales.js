<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Kasir Penjualan | Juragan Buah</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="../css/styles.css">
</head>

<body>

<!-- ===== HEADER ===== -->
<header class="topbar">
  <div class="logo">
    <img src="../assets/logo.png" alt="Juragan Buah">
    <span>Juragan Buah</span>
  </div>

  <nav class="nav">
    <a href="./dashboard.html">Dashboard</a>
    <a href="./items.html">Master Item</a>
    <a href="./buyers.html">Pembeli</a>
    <a href="./sales.html" class="active">Kasir</a>
    <a href="./report-sales.html">Laporan</a>
    <button id="logoutBtn" class="btn btn-red btn-sm">Logout</button>
  </nav>
</header>

<!-- ===== MAIN ===== -->
<main class="container">

<h2>🧾 Kasir Penjualan</h2>

<!-- Scan / pilih item -->
<section class="card">
  <h3>Tambah Produk</h3>

  <input id="barcodeInput" placeholder="Scan / Input Barcode">
  
  <select id="itemSelect"></select>

  <input id="qtyInput" type="number" min="1" value="1">

  <button id="addItemBtn" class="btn btn-green">Tambah</button>
</section>

<!-- Cart -->
<section class="card">
  <h3>Daftar Belanja</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Harga</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="cartBody"></tbody>
  </table>
</section>

<!-- Payment -->
<section class="card">
  <h3>Pembayaran</h3>

  <select id="buyerSelect"></select>

  <select id="paymentMethod">
    <option value="cash">Tunai</option>
    <option value="transfer">Transfer</option>
    <option value="qris">QRIS</option>
  </select>

  <input id="paidInput" type="number" placeholder="Jumlah Bayar">

  <p><strong>Total:</strong> Rp <span id="grandTotal">0</span></p>
  <p><strong>Kembalian:</strong> Rp <span id="change">0</span></p>

  <button id="payBtn" class="btn btn-green btn-big">Bayar & Simpan</button>
  <button onclick="window.print()" class="btn btn-blue">Print</button>
</section>

</main>

<!-- ===== SCRIPT (URUTAN WAJIB) ===== -->
<script src="../js/data.js"></script>
<script src="../js/auth.js"></script>

<script>
/* ===============================
   SALES LOGIC (INLINE - STABIL)
================================ */

const items = DataStore.getItems();
const buyers = DataStore.getBuyers();
let cart = [];

/* init dropdown */
const itemSelect = document.getElementById("itemSelect");
items.forEach(i => {
  itemSelect.innerHTML += `<option value="${i.id}">${i.name} - Rp${i.price}</option>`;
});

const buyerSelect = document.getElementById("buyerSelect");
buyers.forEach(b => {
  buyerSelect.innerHTML += `<option value="${b.id}">${b.name}</option>`;
});

/* add item */
document.getElementById("addItemBtn").onclick = () => {
  const id = itemSelect.value;
  const qty = parseInt(document.getElementById("qtyInput").value);
  const item = items.find(x => x.id === id);
  if (!item) return;

  cart.push({
    id: item.id,
    name: item.name,
    qty,
    price: item.price
  });

  renderCart();
};

function renderCart() {
  const body = document.getElementById("cartBody");
  body.innerHTML = "";
  let total = 0;

  cart.forEach((c, i) => {
    const t = c.qty * c.price;
    total += t;
    body.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>${c.qty}</td>
        <td>Rp${c.price}</td>
        <td>Rp${t}</td>
        <td><button onclick="removeItem(${i})">❌</button></td>
      </tr>`;
  });

  document.getElementById("grandTotal").innerText = total;
}

window.removeItem = (i) => {
  cart.splice(i, 1);
  renderCart();
};

/* payment */
document.getElementById("paidInput").oninput = () => {
  const paid = parseInt(event.target.value) || 0;
  const total = parseInt(document.getElementById("grandTotal").innerText);
  document.getElementById("change").innerText = paid - total;
};

document.getElementById("payBtn").onclick = () => {
  if (cart.length === 0) return alert("Keranjang kosong");

  const sales = DataStore.getSales();
  sales.push({
    id: "S" + Date.now(),
    date: new Date().toISOString(),
    buyer: buyerSelect.value,
    items: cart,
    total: document.getElementById("grandTotal").innerText,
    payment: document.getElementById("paymentMethod").value
  });

  DataStore.saveSales(sales);
  alert("Penjualan tersimpan");
  location.reload();
};

/* logout */
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("user");
  window.location.href = "./login.html";
};
</script>

</body>
</html>
