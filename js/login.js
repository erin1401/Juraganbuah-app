/* ============================================================
   LOGIN.JS — FINAL LEVEL 4
   Juragan Buah
   Aman, stabil, tidak auto-refresh
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const msg = document.getElementById("loginMsg");

    if (!form) {
        console.error("FORM LOGIN tidak ditemukan!");
        return;
    }

    // Tanda bahwa event listener aktif
    form._hasLoginHandler = true;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            showMsg("Username & password wajib diisi", "err");
            return;
        }

        let users = DataStore.getUsers();
        let user = users.find(u => u.username === username);

        if (!user) {
            showMsg("Pengguna tidak ditemukan", "err");
            return;
        }

        // Password disimpan dalam base64 (btoa)
        if (user.password !== btoa(password)) {
            showMsg("Password salah", "err");
            return;
        }

        // Simpan sesi login
        localStorage.setItem("currentUser", JSON.stringify({
            id: user.id,
            name: user.name,
            role: user.role
        }));

        showMsg("Login berhasil! Mengalihkan...", "ok");

        setTimeout(() => {
            window.location.href = "../pages/dashboard.html";
        }, 800);
    });

    function showMsg(text, type) {
        msg.innerText = text;
        msg.className = type;
        msg.style.display = "block";
    }
});
