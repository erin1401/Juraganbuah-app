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
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // 🔥 INI KUNCI ANTI REFRESH

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = DataStore.getUsers();
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      errorMsg.innerText = "❌ Username atau password salah";
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    // 🔥 Redirect STABIL (HP AMAN)
    window.location.replace("dashboard.html");
  });
});
