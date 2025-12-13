/* ==========================================================
   items.js — Juragan Buah (Level 4)
   Mengelola master item: tambah, edit, hapus
   ========================================================== */

console.log("Items JS Loaded ✔");

// -------------------------------------------------------------
// CEK LOGIN
// -------------------------------------------------------------
function checkLogin() {
    const u = localStorage.getItem("loggedUser");
    if (!u) location.href = ""./login.html"";
}
checkLogin();

// -------------------------------------------------------------
// RENDER TABEL
// -------------------------------------------------------------
function loadItems() {
    let tbody = document.getElementById("itemsTable");
    tbody.innerHTML = "";

    items.forEach((item, i) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${formatRupiah(item.price)}</td>
            <td>${item.unit}</td>
            <td>
                <button class="btn-small btn-edit" onclick="openEditItem(${i})">Edit</button>
                <button class="btn-small btn-del" onclick="deleteItem(${i})">Hapus</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", loadItems);

// -------------------------------------------------------------
// MODAL HANDLER
// -------------------------------------------------------------
function showModal(html) {
    document.getElementById("modalContainer").innerHTML = `
        <div class="modal-bg">
            <div class="modal-box">
                ${html}
            </div>
        </div>
    `;
}

function closeModal() {
    document.getElementById("modalContainer").innerHTML = "";
}

// -------------------------------------------------------------
// TAMBAH ITEM
// -------------------------------------------------------------
function openAddItem() {
    showModal(`
        <h3>Tambah Item</h3>
        <div class="modal-input">
            <label>Kode</label>
            <input id="cKode">
        </div>
        <div class="modal-input">
            <label>Nama Item</label>
            <input id="cNama">
        </div>
        <div class="modal-input">
            <label>Harga</label>
            <input id="cHarga" type="number">
        </div>
        <div class="modal-input">
            <label>Satuan</label>
            <input id="cUnit">
        </div>

        <div class="modal-actions">
            <button class="btn-cancel" onclick="closeModal()">Batal</button>
            <button class="btn-save" onclick="saveNewItem()">Simpan</button>
        </div>
    `);
}

function saveNewItem() {
    let code = document.getElementById("cKode").value;
    let name = document.getElementById("cNama").value;
    let price = parseInt(document.getElementById("cHarga").value);
    let unit = document.getElementById("cUnit").value;

    if (!code || !name || !price || !unit) {
        alert("Semua field harus diisi.");
        return;
    }

    items.push({ code, name, price, unit });
    localStorage.setItem("items", JSON.stringify(items));

    closeModal();
    loadItems();
}

// -------------------------------------------------------------
// EDIT ITEM
// -------------------------------------------------------------
function openEditItem(i) {
    let it = items[i];

    showModal(`
        <h3>Edit Item</h3>
        <div class="modal-input">
            <label>Kode</label>
            <input id="eKode" value="${it.code}">
        </div>
        <div class="modal-input">
            <label>Nama Item</label>
            <input id="eNama" value="${it.name}">
        </div>
        <div class="modal-input">
            <label>Harga</label>
            <input id="eHarga" type="number" value="${it.price}">
        </div>
        <div class="modal-input">
            <label>Satuan</label>
            <input id="eUnit" value="${it.unit}">
        </div>

        <div class="modal-actions">
            <button class="btn-cancel" onclick="closeModal()">Batal</button>
            <button class="btn-save" onclick="saveEditItem(${i})">Update</button>
        </div>
    `);
}

function saveEditItem(i) {
    items[i].code  = document.getElementById("eKode").value;
    items[i].name  = document.getElementById("eNama").value;
    items[i].price = parseInt(document.getElementById("eHarga").value);
    items[i].unit  = document.getElementById("eUnit").value;

    localStorage.setItem("items", JSON.stringify(items));

    closeModal();
    loadItems();
}

// -------------------------------------------------------------
// HAPUS ITEM
// -------------------------------------------------------------
function deleteItem(i) {
    if (!confirm("Hapus item ini?")) return;

    items.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(items));

    loadItems();
}

