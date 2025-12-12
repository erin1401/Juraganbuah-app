/* ============================================================
   sales.js — Juragan Buah
   Level 4 — Kasir Modern
============================================================ */

let cart = [];

/* --------------------------
   LOAD ITEMS & BUYERS
---------------------------*/
window.onload = () => {
  loadItems();
  loadBuyers();
  updateCartUI();
  updateTotal();
};

/* --------------------------
   Load Items
---------------------------*/
function loadItems() {
  const sel = document.getElementById("saleItem");
  sel.innerHTML = "";

  items.forEach(it => {
    sel.innerHTML += `
      <option value="${it.id}">
        ${it.name} — Rp ${it.price.toLocaleString()}
      </option>
    `;
  });
}

/* --------------------------
   Load Pembeli
---------------------------*/
function loadBuyers() {
  const sel = document.getElementById("buyerSelect");
  sel.innerHTML = `<option value="">Pilih Pembeli</option>`;

  buyers.forEach(b => {
    sel.innerHTML += `<option value="${b.id}">${b.name}</option>`;
  });
}

/* --------------------------
   Tambah ke Keranjang
---------------------------*/
function addToCart() {
  const itemId = document.getElementById("saleItem").value;
  const qty = parseInt(document.getElementById("saleQty").value);

  if (!itemId || !qty || qty <= 0) {
    showAlert("Masukkan jumlah item!", "error");
    return;
  }

  const item = items.find(i => i.id == itemId);

  const exist = cart.find(c => c.id == itemId);
  if (exist) exist.qty += qty;
  else cart.push({ id: itemId, name: item.name, price: item.price, qty });

  updateCartUI();
  updateTotal();
}

/* --------------------------
   SCAN BARCODE
---------------------------*/
document.getElementById("barcodeInput").addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const code = e.target.value.trim();
    scanBarcode(code);
    e.target.value = "";
  }
});

function scanBarcode(code) {
  const item = items.find(i => i.barcode == code);

  if (!item) {
    showAlert("Barcode tidak ditemukan!", "error");
    return;
  }

  const exist = cart.find(c => c.id == item.id);
  if (exist) exist.qty++;
  else cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });

  updateCartUI();
  updateTotal();
}

/* --------------------------
   Render Keranjang
---------------------------*/
function updateCartUI() {
  const tbody = document.getElementById("cartTable");
  tbody.innerHTML = "";

  cart.forEach((c, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>${c.qty}</td>
        <td>Rp ${ (c.qty * c.price).toLocaleString() }</td>
        <td>
          <button class="btn-del" onclick="removeItem(${i})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartUI();
  updateTotal();
}

/* --------------------------
   TOTAL
---------------------------*/
function updateTotal() {
  const total = cart.reduce((a,b)=> a + (b.qty * b.price), 0);
  document.getElementById("totalDisplay").innerText = "Rp " + total.toLocaleString();

  const bayar = parseInt(document.getElementById("payInput").value || 0);
  const kembali = bayar - total;

  document.getElementById("changeDisplay").innerText =
    "Rp " + (kembali > 0 ? kembali.toLocaleString() : "0");
}

/* Auto update kembalian */
document.getElementById("payInput").addEventListener("input", updateTotal);

/* --------------------------
   Selesaikan Transaksi
---------------------------*/
function finishSale() {
  if (cart.length === 0) {
    showAlert("Keranjang kosong!", "error");
    return;
  }

  const buyerId = document.getElementById("buyerSelect").value;
  const method = document.getElementById("paymentMethod").value;
  const bayar = parseInt(document.getElementById("payInput").value || 0);
  const total = cart.reduce((a,b)=> a + (b.qty * b.price), 0);

  if (!buyerId) {
    showAlert("Pilih pembeli!", "error");
    return;
  }
  if (bayar < total && method === "tunai") {
    showAlert("Pembayaran kurang!", "error");
    return;
  }

  const idNota = "TRX" + Date.now();

  // Simpan transaksi
  sales.push({
    id: idNota,
    buyerId,
    items: cart,
    total,
    bayar,
    metode: method,
    tanggal: new Date().toLocaleString("id-ID")
  });
  saveData();

  // Kurangi stok
  cart.forEach(c => {
    const it = items.find(i => i.id == c.id);
    if (it) it.stock -= c.qty;
  });
  saveData();

  // Cetak struk
  printReceipt(idNota);

  showAlert("Transaksi berhasil!", "success");

  // Reset UI
  cart = [];
  updateCartUI();
  updateTotal();
  document.getElementById("payInput").value = "";
}

/* --------------------------
   CETAK STRUK
---------------------------*/
function printReceipt(idNota) {
  const trx = sales.find(s => s.id == idNota);
  const frame = document.getElementById("printFrame").contentWindow;

  let html = `
    <h3>Juragan Buah</h3>
    <p>Nota: ${trx.id}</p>
    <p>Tanggal: ${trx.tanggal}</p>
    <hr>
    <table style="width:100%;font-size:14px;">
  `;

  trx.items.forEach(i=>{
    html += `
      <tr>
        <td>${i.name} (${i.qty}x)</td>
        <td style="text-align:right">Rp ${(i.qty*i.price).toLocaleString()}</td>
      </tr>
    `;
  });

  html += `
    </table>
    <hr>
    <p>Total: <b>Rp ${trx.total.toLocaleString()}</b></p>
    <p>Metode: ${trx.metode.toUpperCase()}</p>
    <p>Bayar: Rp ${trx.bayar.toLocaleString()}</p>
    <p>Kembali: Rp ${(trx.bayar - trx.total).toLocaleString()}</p>
    <script>window.print()<\/script>
  `;

  frame.document.body.innerHTML = html;
}

