/* ======================================================
   AUTH SYSTEM – LEVEL 8 (GITHUB PAGES SAFE)
====================================================== */

const Auth = {

  init() {
    if (!localStorage.getItem("users")) {
      const users = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "kasir", password: "kasir123", role: "kasir" }
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }
  },

  login(username, password) {
    this.init();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) return false;

    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  },

  getUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.replace("login.html");
    }
  },

  logout() {
    localStorage.removeItem("currentUser");
    window.location.replace("login.html");
  }
};
