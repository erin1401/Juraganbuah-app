/* =========================================================================
   login.js — Juragan Buah (Level 4) — FINAL
   - Menggunakan DataStore API jika tersedia
   - Menulis session ke localStorage.loggedUser (legacy) & DataStore loginUser
   - Validasi, pesan, dan redirect aman
   ========================================================================= */
// FIX: Anti refresh loop di halaman login
(function(){
  const page = location.pathname.split("/").pop();
  const user = JSON.parse(localStorage.getItem("loggedUser") || "null");

  // Jangan redirect otomatis ketika user sedang proses login
  if (page === "login.html") {
    return; // <-- STOP redirect apapun
  }
})();

(function () {
  // Helper kecil
  function el(id){ return document.getElementById(id); }
  function showMsg(msg, type = "err") {
    const box = el("loginMsg");
    if (!box) return;
    box.textContent = msg;
    box.style.display = "block";
    box.style.color = type === "ok" ? "#cdeccd" : "#ffdede";
  }
  function hideMsg() {
    const box = el("loginMsg");
    if (!box) return;
    box.style.display = "none";
  }

  // Pastikan DOM siap
  document.addEventListener("DOMContentLoaded", () => {
    // jika DataStore belum ada, beri fallback ringan (agar script tidak error)
    if (typeof window.DataStore === "undefined") {
      console.warn("DataStore tidak ditemukan — login akan fallback ke localStorage.");
      // fallback shim (minimal) agar login() dapat dipanggil
      window.DataStore = {
        getLoginUser() {
          try { return JSON.parse(localStorage.getItem("loginUser") || "null"); } catch(e){ return null; }
        },
        getUsers() {
          try { return JSON.parse(localStorage.getItem("users") || "null"); }
          catch(e){ return null; }
        },
        login(username, password) {
          try {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const hash = btoa(password);
            const u = users.find(x => x.username === username && x.password === hash);
            if (!u) return false;
            localStorage.setItem("loginUser", JSON.stringify(u));
            return true;
          } catch (e) { return false; }
        }
      };
    }

    // Jika sudah login (DataStore atau legacy), langsung ke dashboard
    const logged = DataStore.getLoginUser ? DataStore.getLoginUser() : null;
    const legacy = (function(){ try{ return JSON.parse(localStorage.getItem("loggedUser")||"null"); }catch(e){ return null; }})();
    if (logged || legacy) {
      // sedikit grace (jika user buka login sementara sudah aktif), redirect
      setTimeout(() => { window.location.href = "dashboard.html"; }, 200);
      return;
    }

    // ambil elemen form / input
    const form = document.getElementById("loginForm");
    const inputUser = el("username");
    const inputPass = el("password");
    const btn = form ? form.querySelector("button[type='submit']") : null;

    hideMsg();

    // Jika form tidak ada — safe exit
    if (!form || !inputUser || !inputPass) {
      console.warn("Form login tidak ditemukan pada halaman.");
      return;
    }

    // submit handler
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      hideMsg();

      const username = inputUser.value.trim();
      const password = inputPass.value;

      if (!username || !password) {
        showMsg("Isi username & password terlebih dahulu.");
        return;
      }

      // disable UI sementara
      if (btn) { btn.disabled = true; btn.textContent = "Memeriksa..."; }

      // coba login via DataStore.login()
      let ok = false;
      try {
        if (typeof DataStore.login === "function") {
          ok = DataStore.login(username, password);
        } else {
          // fallback: manual check against users[] in localStorage
          const users = DataStore.getUsers ? DataStore.getUsers() : (JSON.parse(localStorage.getItem("users")||"[]"));
          const ph = btoa(password);
          ok = (users || []).some(u => u.username === username && u.password === ph);
          if (ok) {
            // ambil user object
            const userObj = (users || []).find(u => u.username === username);
            try { localStorage.setItem("loginUser", JSON.stringify(userObj)); } catch(e) {}
          }
        }
      } catch (err) {
        console.error("Error saat memanggil DataStore.login():", err);
        ok = false;
      }

      if (!ok) {
        showMsg("Username atau password salah.");
        if (btn) { btn.disabled = false; btn.textContent = "Masuk"; }
        return;
      }

      // Ambil user detail (prefer DataStore.getLoginUser)
      let user = null;
      try {
        user = (typeof DataStore.getLoginUser === "function") ? DataStore.getLoginUser() : JSON.parse(localStorage.getItem("loginUser") || "null");
      } catch (e) {
        user = null;
      }

      // Jika belum ada objek user (beberapa fallback), cari dari users[]
      if (!user) {
        try {
          const users = DataStore.getUsers ? DataStore.getUsers() : JSON.parse(localStorage.getItem("users") || "[]");
          user = (users || []).find(u => u.username === username) || { username };
        } catch (e) {
          user = { username };
        }
      }

      // Simpan juga legacy key 'loggedUser' yang dipakai banyak halaman lama
      try {
        localStorage.setItem("loggedUser", JSON.stringify({ username: user.username, role: user.role || "kasir" }));
      } catch (e) {
        console.warn("Gagal set localStorage.loggedUser:", e);
      }

      // Ensure DataStore also has loginUser key (some DataStore.login implementations already do this)
      try {
        if (typeof DataStore.getLoginUser === "function" && !DataStore.getLoginUser()) {
          // if DataStore has setter method, try to set loginUser explicitly
          try { localStorage.setItem("loginUser", JSON.stringify(user)); } catch(e){}
        }
      } catch(e){}

      // short delay supaya storage settle (browsers biasanya OK but safer)
      setTimeout(() => {
       window.location.href = "dashboard.html";
       }, 200);
    });

    // optional: Enter handling already done by form submit
  });
})();

