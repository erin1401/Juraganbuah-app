/* ============================================================
   UTILS.JS — FINAL LEVEL 4
   Fungsi-fungsi global pendukung aplikasi Juragan Buah
   ============================================================ */

function formatRupiah(value) {
    if (!value) return "Rp 0";
    let number = Number(value) || 0;
    return "Rp " + number.toLocaleString("id-ID");
}

function randomID() {
    return Date.now() + Math.floor(Math.random() * 10000);
}

function today() {
    return new Date().toISOString().split("T")[0];
}

function verifySession() {
    // Jika halaman login, jangan redirect otomatis
    if (window.__IS_LOGIN_PAGE) return;

    const user = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!user) {
        window.location.href = "../pages/login.html";
        return;
    }

    // Set nama user di header (jika ada elemen)
    const el = document.getElementById("currentUserName");
    if (el) el.innerText = user.name;
}

/* Jalankan otomatis jika bukan halaman login */
document.addEventListener("DOMContentLoaded", verifySession);
