/* ===============================
   JURAGAN BUAH - DATA STORE FINAL
   HP & DESKTOP SAFE
================================ */

// ================= INIT USERS =================
(function initUsers() {
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users || users.length === 0) {
    localStorage.setItem("users", JSON.stringify([
      { id: 1, username: "admin", password: "admin", role: "admin" },
      { id: 2, username: "kasir", password: "kasir", role: "kasir" }
    ]));
  }
})();

// ================= INIT DATA =================
function initIfEmpty(key, value) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

initIfEmpty("items", [
  {
    id: "I001",
    name: "Apel Merah",
    barcode: "111111",
    unit: "kg",
    price: 20000,
    cost: 15000,
    stock: 20,
    image: ""
  }
]);

initIfEmpty("buyers", [
  { id: "B001", name: "Umum" }
]);

initIfEmpty("sales", []);
initIfEmpty("stockIn", []);
initIfEmpty("stockOut", []);

// ================= DATA STORE =================
const DataStore = {

  /* -------- USERS -------- */
  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  },

  /* -------- ITEMS -------- */
  getItems() {
    return JSON.parse(localStorage.getItem("items")) || [];
  },

  saveItems(data) {
    localStorage.setItem("items", JSON.stringify(data));
  },

  /* -------- BUYERS -------- */
  getBuyers() {
    return JSON.parse(localStorage.getItem("buyers")) || [];
  },

  saveBuyers(data) {
    localStorage.setItem("buyers", JSON.stringify(data));
  },

  /* -------- SALES -------- */
  getSales() {
    return JSON.parse(localStorage.getItem("sales")) || [];
  },

  saveSales(data) {
    localStorage.setItem("sales", JSON.stringify(data));
  },

  /* -------- STOCK IN -------- */
  getStockIn() {
    return JSON.parse(localStorage.getItem("stockIn")) || [];
  },

  saveStockIn(data) {
    localStorage.setItem("stockIn", JSON.stringify(data));
  },

  /* -------- STOCK OUT -------- */
  getStockOut() {
    return JSON.parse(localStorage.getItem("stockOut")) || [];
  },

  saveStockOut(data) {
    localStorage.setItem("stockOut", JSON.stringify(data));
  }
};

// ================= AUTH GUARD (OPTIONAL) =================
// Pakai ini di dashboard & page lain jika mau


