/* ============================================================
   JURAGAN BUAH — login.js FINAL LEVEL 4
   Fix utama:
   ✔ Tidak reload sendiri
   ✔ Tidak infinite redirect
   ✔ Path dashboard benar
   ✔ Validasi user benar
   ✔ Error message tampil
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const err = document.getElementById("errorMsg");

    if (!form) {
        console.error("FORM LOGIN TIDAK DITEMUKAN!");
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // HENTIKAN RELOAD

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // AMBIL USER DARI DATASTORE
        const user = DataStore.loginUser(username, password);

        if (!user) {
            err.style.display = "block";
            err.innerText = "Username atau password salah!";
            return;
        }

        // SIMPAN USER YANG LOGIN
        localStorage.setItem("jb_logged_user", JSON.stringify(user));

        // REDIRECT BENAR KE DASHBOARD
        window.location.href = "dashboard.html";
    });
});
