/* =================================
   AUTH MODULE — LEVEL 6 FINAL
   STABLE DESKTOP & MOBILE
================================= */

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
    window.location.href = "../pages/login.html";
  },

  protect() {
    const user = this.getUser();
    if (!user) {
      window.location.replace("../pages/login.html");
    }
  }
};

/* AUTO PROTECT (TIDAK AGRESIF) */
document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop();
  if (page !== "login.html" && page !== "index.html") {
    Auth.protect();
  }
});

function logout() {
  Auth.logout();
}
