/* ==========================================================
   opname.js — Juragan Buah (Level 4)
   Logic Stok Opname
   ========================================================== */

console.log("Opname JS Loaded ✔");

// -------------------------------------------------------------
// CEK LOGIN
// -------------------------------------------------------------
function checkLogin() {
    const u = localStorage.getItem("loggedUser");
    if (!u) location.href = "login.html";
}
checkLogin();

// -------------------------------------------------------------
// RENDER TABLE
// -------------------------------------------------------------
function loadOpnameTable() {
    let tbody = document.getElementById("opnameTable");
    tbody.innerHTML = "";

    items.forEach((it, i) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${it.code}</td>
            <td>${it.name}</td>
            <td>${it.stock}</td>

            <td>
                <input type="number" id="hit${i}" min="0" 
                       oninput="calcDiff(${i})"
                       style="width:80px; padding:4px;">
            </td>

            <td id="selisih${i}">-</td>

            <td>
                <button class="btn-small btn-save" onclick="saveOpname(${i})">Update</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// -------------------------------------------------------------
// MULAI OPNAME
// -------------------------------------------------------------
function startOpname() {
    loadOpnameTable();
    alert("Stok Opname dimulai! Silakan isi kolom stok hitung.");
}

// -------------------------------------------------------------
// HITUNG SELISIH
// -------------------------------------------------------------
function calcDiff(i) {
    let hit = parseInt(document.getElementById("hit" + i).value);
    let sys = items[i].stock;

    if (isNaN(hit)) {
        document.getElementById("selisih" + i).innerHTML = "-";
        return;
    }

    let diff = hit - sys;

    let el = document.getElementById("selisih" + i);
    el.innerHTML = diff;

    el.style.color =
        diff === 0 ? "#2a7" :
        diff > 0 ? "#007BFF" :
        "#d00";
}

// -------------------------------------------------------------
// SIMPAN HASIL OPNAME
// -------------------------------------------------------------
function saveOpname(i) {
    let hit = parseInt(document.getElementById("hit" + i).value);

    if (isNaN(hit)) return alert("Isi dulu stok hitung!");

    let sys = items[i].stock;
    let diff = hit - sys;

    // Update stok item
    items[i].stock = hit;
    localStorage.setItem("items", JSON.stringify(items));

    // Simpan riwayat opname
    opname.push({
        date: new Date().toISOString().slice(0, 10),
        code: items[i].code,
        before: sys,
        after: hit,
        diff
    });

    localStorage.setItem("opname", JSON.stringify(opname));

    alert("Stok item diperbarui ✔");
    loadOpnameTable();
}

// -------------------------------------------------------------
// INIT
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", loadOpnameTable);
