/* ========================================================================
   data.js — Juragan Buah (LEVEL UI 4 FINAL)
   Sistem DataStore — menyimpan semua data aplikasi
   ======================================================================== */

(function () {
  // Helper
  function load(key, def) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? def;
    } catch (e) {
      return def;
    }
  }

  function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /* ========================================================================
     USERS (Akun Login)
     Default admin + kasir
     password disimpan dengan base64 (btoa)
  ======================================================================== */
  let users = load("users", [
    {
      id: 1,
      username: "admin",
      password: btoa("admin123"),
      role: "admin",
      name: "Administrator"
    },
    {
      id: 2,
      username: "kasir",
      password: btoa("kasir123"),
      role: "kasir",
      name: "Kasir Toko"
    }
  ]);
  save("users", users);

  /* ========================================================================
     LOGIN USER SESSION
  ======================================================================== */
  let loginUser = load("loginUser", null);

  function getLoginUser() {
    try {
      return JSON.parse(localStorage.getItem("loginUser"));
    } catch (e) {
      return null;
    }
  }

  function login(username, password) {
    const pass = btoa(password);
    const u = users.find(x => x.username === username && x.password === pass);
    if (!u) return false;

    save("loginUser", u);
    return true;
  }

  function logout() {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("loggedUser"); // legacy compatibility
    window.location.href = "login.html";
  }

  /* ========================================================================
     MASTER DATA
  ======================================================================== */

  // Master Item
  let items = load("items", [
    { id: 1, name: "Apel Fuji", cost: 12000, price: 18000, stock: 50, initialStock: 50 },
    { id: 2, name: "Jeruk Medan", cost: 8000, price: 12000, stock: 60, initialStock: 60 },
    { id: 3, name: "Pisang Cavendish", cost: 7000, price: 10000, stock: 40, initialStock: 40 }
  ]);
  save("items", items);

  // Pembeli
  let buyers = load("buyers", [
    { id: 1, name: "Umum", phone: "-", address: "-" },
    { id: 2, name: "Toko Hijau", phone: "08123456789", address: "Jl. Mawar No. 12" }
  ]);
  save("buyers", buyers);

  /* ========================================================================
     PERSEDIAAN
  ======================================================================== */

  // Item Masuk
  let stockIn = load("stockIn", []);

  // Item Keluar
  let stockOut = load("stockOut", []);

  // Stok Opname
  let opname = load("opname", []);

  /* ========================================================================
     PENJUALAN
  ======================================================================== */

  let sales = load("sales", [
    // Contoh data awal
    {
      id: 1,
      itemId: 1,
      buyerId: 1,
      qty: 5,
      price: 18000,
      total: 90000,
      date: "2025-01-10",
      payMethod: "Tunai"
    }
  ]);
  save("sales", sales);

  /* ========================================================================
     GLOBAL EXPORT
  ======================================================================== */

  window.DataStore = {
    // Users
    getUsers: () => users,
    getLoginUser,
    login,
    logout,

    // Master Item
    items,
    buyers,
    stockIn,
    stockOut,
    opname,
    sales,

    saveItems: () => save("items", items),
    saveBuyers: () => save("buyers", buyers),
    saveStockIn: () => save("stockIn", stockIn),
    saveStockOut: () => save("stockOut", stockOut),
    saveOpname: () => save("opname", opname),
    saveSales: () => save("sales", sales)
  };
})();
