/* ============================================================
   JURAGAN BUAH — login.js FINAL LEVEL 4
   Fix utama:
   ✔ Tidak reload sendirip
   ✔ Tidak infinite redirect
   ✔ Path dashboard benar
   ✔ Validasi user benar
   ✔ Error message tampil
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");
  const errorMsg = document.getElementById("errorMsg");

  btn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      errorMsg.innerText = "❌ Lengkapi username & password";
      return;
    }

    const users = DataStore.getUsers();
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      errorMsg.innerText = "❌ Username atau password salah";
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    // 🔥 REDIRECT AMAN HP
    window.location.href = "dashboard.html";
  });
});




