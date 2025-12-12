/* ============================================================
   DATA.JS — FINAL LEVEL 4
   Juragan Buah  
   Mengelola seluruh data aplikasi via localStorage
   ============================================================ */

const DataStore = {
    
    load(key) {
        return JSON.parse(localStorage.getItem(key) || "[]");
    },

    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    /* ---------------- Users ---------------- */
    getUsers() {
        let data = this.load("users");

        if (data.length === 0) {
            data = [
                { id: 1, username: "admin", password: btoa("admin123"), role: "admin", name: "Administrator" },
                { id: 2, username: "kasir", password: btoa("kasir123"), role: "kasir", name: "Kasir Utama" }
            ];
            this.save("users", data);
        }
        return data;
    },

    /* ---------------- Items ---------------- */
    getItems() { return this.load("items"); },
    saveItems(d) { this.save("items", d); },

    /* ---------------- Buyers ---------------- */
    getBuyers() { return this.load("buyers"); },
    saveBuyers(d) { this.save("buyers", d); },

    /* ---------------- Stock In ---------------- */
    getStockIn() { return this.load("stockIn"); },
    saveStockIn(d) { this.save("stockIn", d); },

    /* ---------------- Stock Out ---------------- */
    getStockOut() { return this.load("stockOut"); },
    saveStockOut(d) { this.save("stockOut", d); },

    /* ---------------- Opname ---------------- */
    getOpname() { return this.load("opname"); },
    saveOpname(d) { this.save("opname", d); },

    /* ---------------- Sales ---------------- */
    getSales() { return this.load("sales"); },
    saveSales(d) { this.save("sales", d); }
};

/* ============================================================
   SESSION UTILITIES
   ============================================================ */

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../pages/login.html";
}
