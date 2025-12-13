const Auth = {
  getUser() {
    return JSON.parse(localStorage.getItem("authUser"));
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
    if (!this.getUser()) {
      window.location.replace("../pages/login.html");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop();
  if (page !== "login.html" && page !== "index.html") {
    Auth.protect();
  }
});

function logout() {
  Auth.logout();
}
