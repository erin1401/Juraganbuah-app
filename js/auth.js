/* ===============================
   AUTH MODULE — FINAL STABLE
================================ */

const Auth = {
  getUser() {
    try {
      return JSON.parse(localStorage.getItem("authUser"));
    } catch {
      return null;
    }
  },

  login(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
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

  logout() {
    localStorage.removeItem("authUser");
    location.href = "../pages/login.html";
  },

  requireAuth() {
    const user = this.getUser();
    if (!user) {
      location.replace("../pages/login.html");
    }
  }
};

/* AUTO PROTECT PAGE (KECUALI LOGIN) */
if (
  !location.pathname.endsWith("login.html") &&
  !location.pathname.endsWith("index.html")
) {
  document.addEventListener("DOMContentLoaded", () => {
    Auth.requireAuth();
  });
}

function logout() {
  Auth.logout();
}
