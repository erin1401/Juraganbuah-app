/* ============================================================
   DATASTORE FINAL LEVEL 4
   CRUD lengkap untuk:
   - Items
   - Buyers
   - Stock In
   - Stock Out
   - Stock Opname
   - Sales
   ============================================================ */

const DataStore = {
  // ===========================
  // GENERATOR ID
  // ===========================
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
  },

  // ===========================
  // GENERIC HELPER
  // ===========================
  get(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  },

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  // ============================================================
  // ITEMS
  // ============================================================
  getItems() {
    return this.get("items");
  },

  saveItems(list) {
    this.save("items", list);
  },

  addItem(data) {
    const list = this.getItems();
    list.push({ id: this.uid(), stock: 0, ...data });
    this.saveItems(list);
  },

  updateItem(id, data) {
    const list = this.getItems();
    const item = list.find(i => i.id === id);
    if (item) Object.assign(item, data);
    this.saveItems(list);
  },

  deleteItem(id) {
    let list = this.getItems().filter(i => i.id !== id);
    this.saveItems(list);
  },

  // ============================================================
  // BUYERS
  // ============================================================
  getBuyers() {
    return this.get("buyers");
  },

  saveBuyers(list) {
    this.save("buyers", list);
  },

  addBuyer(data) {
    const list = this.getBuyers();
    list.push({ id: this.uid(), ...data });
    this.saveBuyers(list);
  },

  updateBuyer(id, data) {
    const list = this.getBuyers();
    const buyer = list.find(b => b.id === id);
    if (buyer) Object.assign(buyer, data);
    this.saveBuyers(list);
  },

  deleteBuyer(id) {
    let list = this.getBuyers().filter(b => b.id !== id);
    this.saveBuyers(list);
  },

  // ============================================================
  // STOCK IN
  // ============================================================
  getStockIn() {
    return this.get("stockIn");
  },

  saveStockIn(list) {
    this.save("stockIn", list);
  },

  addStockIn(data) {
    const list = this.getStockIn();
    const newData = { id: this.uid(), ...data };
    list.push(newData);
    this.saveStockIn(list);

    // update stock item
    const items = this.getItems();
    const item = items.find(i => i.id === data.itemId);
    if (item) item.stock = (item.stock || 0) + data.qty;
    this.saveItems(items);
  },

  updateStockIn(id, data) {
    const list = this.getStockIn();
    const stock = list.find(s => s.id === id);

    if (stock) {
      // kembalikan stok lama
      const items = this.getItems();
      const itemOld = items.find(i => i.id === stock.itemId);
      if (itemOld) itemOld.stock -= Number(stock.qty);

      // update
      Object.assign(stock, data);

      // apply stok baru
      const itemNew = items.find(i => i.id === data.itemId);
      if (itemNew) itemNew.stock += Number(data.qty);

      this.saveItems(items);
      this.saveStockIn(list);
    }
  },

  deleteStockIn(id) {
    const list = this.getStockIn();
    const removed = list.find(s => s.id === id);

    if (removed) {
      // kembalikan stok
      const items = this.getItems();
      const item = items.find(i => i.id === removed.itemId);
      if (item) item.stock -= Number(removed.qty);
      this.saveItems(items);

      // hapus
      const filtered = list.filter(s => s.id !== id);
      this.saveStockIn(filtered);
    }
  },

  // ============================================================
  // STOCK OUT
  // ============================================================
  getStockOut() {
    return this.get("stockOut");
  },

  saveStockOut(list) {
    this.save("stockOut", list);
  },

  addStockOut(data) {
    const items = this.getItems();
    const item = items.find(i => i.id === data.itemId);

    if (!item || item.stock < data.qty) return false;

    // kurangi stok
    item.stock -= data.qty;
    this.saveItems(items);

    const list = this.getStockOut();
    list.push({ id: this.uid(), ...data });
    this.saveStockOut(list);

    return true;
  },

  updateStockOut(id, data) {
    const list = this.getStockOut();
    const old = list.find(s => s.id === id);

    if (!old) return false;

    const items = this.getItems();

    const oldItem = items.find(i => i.id === old.itemId);
    const newItem = items.find(i => i.id === data.itemId);

    // kembalikan stok lama
    if (oldItem) oldItem.stock += old.qty;

    // cek stok baru cukup?
    if (newItem && newItem.stock < data.qty) return false;

    // apply stok baru
    if (newItem) newItem.stock -= data.qty;

    // update record
    Object.assign(old, data);

    this.saveItems(items);
    this.saveStockOut(list);

    return true;
  },

  deleteStockOut(id) {
    const list = this.getStockOut();
    const removed = list.find(s => s.id === id);

    if (!removed) return;

    // kembalikan stok
    const items = this.getItems();
    const item = items.find(i => i.id === removed.itemId);
    if (item) item.stock += removed.qty;

    this.saveItems(items);

    const filtered = list.filter(s => s.id !== id);
    this.saveStockOut(filtered);
  },

  // ============================================================
  // STOCK OPNAME
  // ============================================================
  getOpname() {
    return this.get("opname");
  },

  saveOpname(list) {
    this.save("opname", list);
  },

  addOpname(data) {
    const list = this.getOpname();
    list.push({ id: this.uid(), ...data });
    this.saveOpname(list);

    // update stok sesuai hasil opname
    const items = this.getItems();
    const item = items.find(i => i.id === data.itemId);
    if (item) item.stock = data.newStock;
    this.saveItems(items);
  },

  deleteOpname(id) {
    const filtered = this.getOpname().filter(o => o.id !== id);
    this.saveOpname(filtered);
  },

  // ============================================================
  // SALES (Penjualan)
  // ============================================================
  getSales() {
    return this.get("sales");
  },

  saveSales(list) {
    this.save("sales", list);
  },

  addSale(data) {
    const list = this.getSales();
    list.push({ id: this.uid(), ...data });
    this.saveSales(list);
  },

  deleteSale(id) {
    const filtered = this.getSales().filter(s => s.id !== id);
    this.saveSales(filtered);
  }
};

console.log("DataStore Level 4 Loaded");

// Data default
let users = [
  { id:"1", username:"admin", password:"admin123", role:"admin" }
];


