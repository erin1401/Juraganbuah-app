document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");
  const error = document.getElementById("errorMsg");

  btn.onclick = function () {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(x => x.username === u && x.password === p);

    if (!user) {
      error.innerText = "Login gagal";
      return;
    }

    // SIMPAN LOGIN
    localStorage.setItem("user", JSON.stringify(user));

    // 🔥 REDIRECT PALING AMAN
    window.location.assign("./dashboard.html");
  };
});
