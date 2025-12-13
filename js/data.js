/* =====================================================
   JURAGAN BUAH - DATA STORE LEVEL 5 (FINAL)
   HP & DESKTOP SAFE | GITHUB PAGES FRIENDLY
===================================================== */

/* ================= USERS ================= */
(function initUsers() {
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users || users.length === 0) {
    localStorage.setItem("users", JSON.stringify([
      { id: 1, username: "admin", password: "admin", role: "admin" },
      { id: 2, username: "kasir", password: "kasir", role: "kasir" }
    ]));
  }
})();

/* ================= INIT HELPER ================= */
function init(key, value) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/* ================= MASTER DATA ================= */
init("items", [
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

init("buyers", [
  { id: "B001", name: "Umum" }
]);

init("sales", []);
init("stockIn", []);
init("stockOut", []);

/* ================= DATA STORE API ================= */
const DataStore = {

  /* USERS */
  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  },

  /* ITEMS */
  getItems() {
    return JSON.parse(localStorage.getItem("items")) || [];
  },
  saveItems(data) {
    localStorage.setItem("items", JSON.stringify(data));
  },

  /* BUYERS */
  getBuyers() {
    return JSON.parse(localStorage.getItem("buyers")) || [];
  },
  saveBuyers(data) {
    localStorage.setItem("buyers", JSON.stringify(data));
  },

  /* SALES */
  getSales() {
    return JSON.parse(localStorage.getItem("sales")) || [];
  },
  saveSales(data) {
    localStorage.setItem("sales", JSON.stringify(data));
  },

  /* STOCK IN */
  getStockIn() {
    return JSON.parse(localStorage.getItem("stockIn")) || [];
  },
  saveStockIn(data) {
    localStorage.setItem("stockIn", JSON.stringify(data));
  },

  /* STOCK OUT */
  getStockOut() {
    return JSON.parse(localStorage.getItem("stockOut")) || [];
  },
  saveStockOut(data) {
    localStorage.setItem("stockOut", JSON.stringify(data));
  }
};

/* ================= UTIL PROFIT ================= */
function calculateProfit() {
  const sales = DataStore.getSales();
  const items = DataStore.getItems();

  let revenue = 0;
  let cost = 0;

  sales.forEach(s => {
    s.items.forEach(i => {
      revenue += i.qty * i.price;
      const item = items.find(x => x.name === i.name);
      if (item) cost += i.qty * item.cost;
    });
  });

  return {
    revenue,
    cost,
    profit: revenue - cost
  };
}
