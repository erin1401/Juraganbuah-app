/* =====================================
   AUTH LEVEL 8 — ROLE BASED
===================================== */

const Auth = {
  login(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [
      { username: "admin", password: "admin", role: "admin" },
      { username: "kasir", password: "kasir", role: "kasir" }
    ];

    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) return false;

    localStorage.setItem("authUser", JSON.stringify({
      username: user.username,
      role: user.role
    }));

    return true;
  },

  getUser() {
    return JSON.parse(localStorage.getItem("authUser"));
  },

  requireLogin() {
    if (!this.getUser()) {
      window.location.href = "login.html";
    }
  },

  logout() {
    localStorage.removeItem("authUser");
    window.location.href = "login.html";
  }
};
