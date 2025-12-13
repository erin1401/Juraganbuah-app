document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");
  const error = document.getElementById("errorMsg");

  btn.addEventListener("click", () => {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();

    if (!u || !p) {
      error.innerText = "Lengkapi username & password";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(x => x.username === u && x.password === p);

    if (!found) {
      error.innerText = "Login gagal";
      return;
    }

    localStorage.setItem("user", JSON.stringify(found));

    // 🔥 PATH ABSOLUTE — AMAN HP
    window.location.href = "../pages/dashboard.html";
  });
});
