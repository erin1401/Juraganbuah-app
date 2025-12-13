<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Master Item | Juragan Buah</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="../css/styles.css">
</head>

<body>

<!-- ===== HEADER ===== -->
<header class="topbar">
  <div class="logo">
    <img src="../assets/logo.png">
    <span>Juragan Buah</span>
  </div>
  <nav class="nav">
    <a href="./dashboard.html">Dashboard</a>
    <a href="./items.html" class="active">Master Item</a>
    <a href="./buyers.html">Pembeli</a>
    <a href="./sales.html">Kasir</a>
    <a href="./report-stock.html">Stok</a>
    <button id="logoutBtn" class="btn btn-red btn-sm">Logout</button>
  </nav>
</header>

<!-- ===== MAIN ===== -->
<main class="container">

<h2>📦 Master Item</h2>

<!-- Add Item -->
<section class="card">
  <h3>Tambah Item</h3>

  <input id="name" placeholder="Nama Item">
  <input id="barcode" placeholder="Barcode">
  <input id="unit" placeholder="Satuan (kg, pcs, dll)">
  <input id="price" type="number" placeholder="Harga Jual">
  <input id="cost" type="number" placeholder="Harga Modal">

  <input id="image" type="file" accept="image/*">

  <button id="addBtn" class="btn btn-green">Tambah</button>
</section>

<!-- Item Table -->
<section class="card">
  <h3>Daftar Item</h3>
  <table class="table">
    <thead>
      <tr>
        <th>Gambar</th>
        <th>Nama</th>
        <th>Barcode</th>
        <th>Stok</th>
        <th>Harga</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="itemBody"></tbody>
  </table>
</section>

</main>

<!-- ===== SCRIPT ===== -->
<script src="../js/data.js"></script>
<script src="../js/auth.js"></script>

<script>
/* ===============================
   MASTER ITEM LOGIC
================================ */

let items = DataStore.getItems();
const body = document.getElementById("itemBody");

/* render */
function render() {
  body.innerHTML = "";
  items.forEach((i, idx) => {
    body.innerHTML += `
      <tr>
        <td>${i.image ? `<img src="${i.image}" class="thumb">` : "-"}</td>
        <td>${i.name}</td>
        <td>${i.barcode}</td>
        <td>${i.stock || 0}</td>
        <td>Rp${i.price}</td>
        <td><button onclick="removeItem(${idx})">🗑</button></td>
      </tr>`;
  });
}
render();

/* add */
document.getElementById("addBtn").onclick = () => {
  const name = document.getElementById("name").value;
  const barcode = document.getElementById("barcode").value;
  const unit = document.getElementById("unit").value;
  const price = +document.getElementById("price").value;
  const cost = +document.getElementById("cost").value;
  const file = document.getElementById("image").files[0];

  if (!name || !price) return alert("Lengkapi data");

  const saveItem = (img="") => {
    items.push({
      id: "I" + Date.now(),
      name, barcode, unit,
      price, cost,
      stock: 0,
      image: img
    });
    DataStore.saveItems(items);
    render();
  };

  if (file) {
    const r = new FileReader();
    r.onload = e => saveItem(e.target.result);
    r.readAsDataURL(file);
  } else saveItem();
};

/* delete */
window.removeItem = (i) => {
  if (!confirm("Hapus item?")) return;
  items.splice(i, 1);
  DataStore.saveItems(items);
  render();
};

/* logout */
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("user");
  location.href = "./login.html";
};
</script>

</body>
</html>
