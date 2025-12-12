/* ==========================================================
   stock-out.js — Juragan Buah (Level 4)
   Logic Item Keluar (Pemakaian / Waste / Retur / Rusak)
   ========================================================== */

console.log("Stock-Out JS Loaded ✔");

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
function loadStockOut() {
    let tbody = document.getElementById("stockOutTable");
    tbody.innerHTML = "";

    stockOut.forEach((ent, i) => {
        let item = items.find(a => a.code === ent.code);

        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${ent.date}</td>
            <td>${item ? item.name : ent.code}</td>
            <td>${ent.qty}</td>
            <td>${ent.note || "-"}</td>
            <td>
                <button class="btn-small btn-del" onclick="deleteStockOut(${i})">Hapus</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", loadStockOut);

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
// TAMBAH ITEM KELUAR
// -------------------------------------------------------------
function openAddStockOut() {
    let itemOptions = items
        .map(i => `<option value="${i.code}">${i.code} — ${i.name} (stok: ${i.stock})</option>`)
        .join("");

    showModal(`
        <h3>Tambah Item Keluar</h3>

        <div class="modal-input">
            <label>Pilih Item</label>
            <select id="outItem">${itemOptions}</select>
        </div>

        <div class="modal-input">
            <label>Jumlah Keluar</label>
            <input id="outQty" type="number" min="1">
        </div>

        <div class="modal-input">
            <label>Keterangan</label>
            <input id="outNote" placeholder="Rusak / Retur / Pemakaian">
        </div>

        <div class="modal-actions">
            <button class="btn-cancel" onclick="closeModal()">Batal</button>
            <button class="btn-save" onclick="saveStockOut()">Simpan</button>
        </div>
    `);
}

function saveStockOut() {
    let code = document.getElementById("outItem").value;
    let qty = parseInt(document.getElementById("outQty").value);
    let note = document.getElementById("outNote").value;

    if (!qty || qty <= 0) return alert("Jumlah keluar tidak valid.");

    let it = items.find(i => i.code === code);

    if (!it) return alert("Item tidak ditemukan.");

    if (qty > it.stock) {
        return alert("Jumlah keluar melebihi stok yang tersedia.");
    }

    let date = new Date().toISOString().slice(0, 10);

    stockOut.push({ date, code, qty, note });
    localStorage.setItem("stockOut", JSON.stringify(stockOut));

    // Kurangi stok item
    it.stock = (it.stock || 0) - qty;
    localStorage.setItem("items", JSON.stringify(items));

    closeModal();
    loadStockOut();
}

// -------------------------------------------------------------
// DELETE ITEM KELUAR
// -------------------------------------------------------------
function deleteStockOut(i) {
    if (!confirm("Hapus entri ini?")) return;

    let ent = stockOut[i];

    // Tambahkan kembali stok
    let it = items.find(a => a.code === ent.code);
    if (it) {
        it.stock = (it.stock || 0) + ent.qty;
        localStorage.setItem("items", JSON.stringify(items));
    }

    stockOut.splice(i, 1);
    localStorage.setItem("stockOut", JSON.stringify(stockOut));
    loadStockOut();
}
