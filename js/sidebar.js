/* =========================================
   SIDEBAR CONTROLLER – FINAL LEVEL 8
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.querySelector(".sidebar");
  const toggle  = document.getElementById("sidebarToggle");

  if (!sidebar) return;

  // Toggle sidebar (mobile)
  if (toggle) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Auto close sidebar when click link (mobile)
  sidebar.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });

});
