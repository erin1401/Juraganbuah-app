/* =====================================
   PERMISSIONS — LEVEL 8 FINAL
   ROLE: admin | kasir
===================================== */

const Permissions = {

  /**
   * Cek akses halaman
   * @param {Array} allowedRoles
   */
  requireRole(allowedRoles = []) {
    const user = Auth.getUser();

    if (!user) {
      window.location.href = "login.html";
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      alert("Anda tidak memiliki akses ke halaman ini");
      window.location.href = "dashboard.html";
    }
  },

  /**
   * Sembunyikan menu berdasarkan role
   * Elemen menu WAJIB punya atribut:
   * data-role="admin" atau data-role="kasir"
   */
  applyMenuVisibility() {
    const user = Auth.getUser();
    if (!user) return;

    document.querySelectorAll("[data-role]").forEach(el => {
      const allowed = el.dataset.role.split(",");
      if (!allowed.includes(user.role)) {
        el.style.display = "none";
      }
    });
  },

  /**
   * Tampilkan role di header
   */
  renderUserInfo() {
    const user = Auth.getUser();
    if (!user) return;

    const el = document.getElementById("currentUser");
    if (el) {
      el.innerText = `${user.username} (${user.role})`;
    }
  }
};

/* =====================================
   AUTO INIT — AMAN
===================================== */
document.addEventListener("DOMContentLoaded", () => {
  Permissions.applyMenuVisibility();
  Permissions.renderUserInfo();
});
