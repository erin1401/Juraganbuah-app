/* ================================
   AUTH MODULE — FINAL FIX TOTAL
   GITHUB PAGES SAFE
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
    window.location.href = "login.html";
  },

  protect() {
    if (!this.getUser()) {
      window.location.href = "login.html";
    }
  }
};

// ❌ TIDAK ADA auto protect di sini
// ❌ Tidak DOMContentLoaded
// ❌ Tidak cek pathname

function logout() {
  Auth.logout();
}
