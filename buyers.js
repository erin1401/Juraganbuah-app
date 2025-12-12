/* ==========================================================
   buyers.js — Juragan Buah (Level 4)
   Mengelola data pembeli (add / edit / delete)
   ========================================================== */

console.log("Buyers JS Loaded ✔");

// ------------------------
// CEK LOGIN
// ------------------------
function checkLogin() {
    const u = localStorage.getItem("loggedUser");
    if (!u) location.href = "login.html";
}
checkLogin();

// ------------------------
// RENDER TABLE
// ------------------------
function loadBuyers() {
    let tbody = document.getElementById("buyersTable");
    tbody.innerHTML = "";

    buyers.forEach((buyer, i) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${buyer.name}</td>
            <td>${buyer.phone}</td>
            <td>${buyer.address}</td>
            <td>
                <button class="btn-small btn-edit" onclick="openEditBuyer(${i})">Edit</button>
                <button class="btn-small btn-del" onclick="deleteBuyer(${i})">Hapus</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", loadBuyers);

// ------------------------
// MODAL TEMPLATE
// ------------------------
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

// ------------------------
// TAMBAH PEMBELI
// ------------------------
function openAddBuyer() {
    showModal(`
        <h3>Tambah Pembeli</h3>

        <div class="modal-input">
            <label>Nama</label>
            <input id="bName">
        </div>

        <div class="modal-input">
            <label>No HP</label>
            <input id="bPhone">
        </div>

        <div class="modal-input">
            <label>Alamat</label>
            <textarea id="bAddress"></textarea>
        </div>

        <div class="modal-actions">
            <button class="btn-cancel" onclick="closeModal()">Batal</button>
            <button class="btn-save" onclick="saveNewBuyer()">Simpan</button>
        </div>
    `);
}

function saveNewBuyer() {
    let name = document.getElementById("bName").value;
    let phone = document.getElementById("bPhone").value;
    let address = document.getElementById("bAddress").value;

    if (!name.trim()) return alert("Nama harus diisi.");

    buyers.push({ name, phone, address });
    localStorage.setItem("buyers", JSON.stringify(buyers));

    closeModal();
    loadBuyers();
}

// ------------------------
// EDIT PEMBELI
// ------------------------
function openEditBuyer(i) {
    let b = buyers[i];

    showModal(`
        <h3>Edit Pembeli</h3>

        <div class="modal-input">
            <label>Nama</label>
            <input id="eName" value="${b.name}">
        </div>

        <div class="modal-input">
            <label>No HP</label>
            <input id="ePhone" value="${b.phone}">
        </div>

        <div class="modal-input">
            <label>Alamat</label>
            <textarea id="eAddress">${b.address}</textarea>
        </div>

        <div class="modal-actions">
            <button class="btn-cancel" onclick="closeModal()">Batal</button>
            <button class="btn-save" onclick="saveEditBuyer(${i})">Update</button>
        </div>
    `);
}

function saveEditBuyer(i) {
    buyers[i].name = document.getElementById("eName").value;
    buyers[i].phone = document.getElementById("ePhone").value;
    buyers[i].address = document.getElementById("eAddress").value;

    localStorage.setItem("buyers", JSON.stringify(buyers));

    closeModal();
    loadBuyers();
}

// ------------------------
// HAPUS PEMBELI
// ------------------------
function deleteBuyer(i) {
    if (!confirm("Hapus pembeli ini?")) return;

    buyers.splice(i, 1);
    localStorage.setItem("buyers", JSON.stringify(buyers));

    loadBuyers();
}
