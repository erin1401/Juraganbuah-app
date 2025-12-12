/* ==========================================================
   stock-in.js — Juragan Buah (Level 4)
   Logic Item Masuk (Restock / Pembelian)
   ========================================================== */

console.log("Stock-In JS Loaded ✔");

// -------------------------------------------------------------
// CEK LOGIN
// -------------------------------------------------------------
function checkLogin() {
    const u = localStorage.getItem("loggedUser");
    if (!u) location.href = "login.html";
}
checkLogin();

// -------------------------------------------------------------
// LOAD TABLE
// -------------------------------------------------------------
function loadStockIn() {
    let tbody = document.getElementById("stockInTable");
    tbody.innerHTML = "";

    stockIn.forEach((ent, i) => {
        let item = items.find(a => a.code === ent.code);

        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${ent.date}</td>
            <td>${item ? item.name : ent.code}</td>
            <td>${ent.qty}</td>
            <td>${formatRupiah(ent.price)}</td>
            <td>${ent.supplier || "-"}</td>
            <td>
                <button class="btn-small btn-del" onclick="deleteStockIn(${i})">Hapus</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", loadStockIn);

// -------------------------------------------------------------
// MODAL HANDLER
// -------------------------------------------------------------
function showModal(html) {
    document.getElementById("modalContainer").innerHTML = `
        <div class="modal-bg">
          <div class="modal-box">${html}</div>
        </div>
    `;
}

function closeModal() {
    document.getElementById("modalContainer").innerHTML = "";
}

// -------------------------------------------------------------
// TAMBAH STOK MASUK
// -------------------------------------------------------------
function openAddStockIn() {
    let itemOptions = items
        .map(i => `<option value="${i.code}">${i.code} — ${i.name}</option>`)
        .join("");

    showModal(`
        <h3>Tambah Item Masuk</h3>

        <div class="modal-input">
            <label>Pilih Item</label>
            <select id="inItem">${itemOptions}</select>
        </div>

        <div class="modal-input">
            <label>Jumlah Masuk</label>
            <input id="inQty" type="number" min="1">
        </div>

        <div class="modal-input">
            <label>Harga Modal</label>
            <input id="inPrice" type="number" min="1">
        </div>

        <div class="modal-input">
            <label>Pemasok</label>
            <input id="inSupplier" placeholder="Opsional">
        </div>

        <div class="modal-actions">
            <button class="btn-cancel" onclick="closeModal()">Batal</button>
            <button class="btn-save" onclick="saveStockIn()">Simpan</button>
        </div>
    `);
}

function saveStockIn() {
    let code = document.getElementById("inItem").value;
    let qty = parseInt(document.getElementById("inQty").value);
    let price = parseInt(document.getElementById("inPrice").value);
    let supplier = document.getElementById("inSupplier").value;

    if (!qty || qty <= 0) return alert("Jumlah masuk tidak valid.");
    if (!price || price <= 0) return alert("Harga modal tidak valid.");

    let date = new Date().toISOString().slice(0, 10);

    stockIn.push({ date, code, qty, price, supplier });
    localStorage.setItem("stockIn", JSON.stringify(stockIn));

    // Update stok item
    let it = items.find(i => i.code === code);
    if (it) {
        it.stock = (it.stock || 0) + qty;
        localStorage.setItem("items", JSON.stringify(items));
    }

    closeModal();
    loadStockIn();
}

// -------------------------------------------------------------
// HAPUS ITEM MASUK
// -------------------------------------------------------------
function deleteStockIn(i) {
    if (!confirm("Hapus entri ini?")) return;

    let ent = stockIn[i];

    // kembalikan stok
    let it = items.find(a => a.code === ent.code);
    if (it) {
        it.stock = (it.stock || 0) - ent.qty;
        if (it.stock < 0) it.stock = 0;
        localStorage.setItem("items", JSON.stringify(items));
    }

    stockIn.splice(i, 1);
    localStorage.setItem("stockIn", JSON.stringify(stockIn));
    loadStockIn();
}
