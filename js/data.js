/* ============================================================
   JURAGAN BUAH — data.js FINAL LEVEL 4
   ============================================================ */

const DataStore = {
    // ----------------------------------------------------------
    // ========== USERS (untuk LOGIN) ===========================
    // ----------------------------------------------------------
    getUsers() {
        let users = JSON.parse(localStorage.getItem("jb_users"));
        if (!users) {
            users = [
                {
                    id: 1,
                    username: "admin",
                    password: "123",
                    role: "admin",
                    name: "Administrator"
                },
                {
                    id: 2,
                    username: "kasir",
                    password: "123",
                    role: "kasir",
                    name: "Kasir Toko"
                }
            ];
            localStorage.setItem("jb_users", JSON.stringify(users));
        }
        return users;
    },

    loginUser(username, password) {
        const users = this.getUsers();
        return users.find(
            u => u.username === username && u.password === password
        );
    },

    // ----------------------------------------------------------
    // ========== ITEMS (MASTER BARANG) =========================
    // ----------------------------------------------------------
    getItems() {
        let items = JSON.parse(localStorage.getItem("jb_items"));
        if (!items) {
            items = [
                { id: 1, name: "Apel", price: 20000, stock: 50 },
                { id: 2, name: "Jeruk", price: 15000, stock: 40 },
                { id: 3, name: "Pisang", price: 12000, stock: 70 }
            ];
            localStorage.setItem("jb_items", JSON.stringify(items));
        }
        return items;
    },

    saveItems(items) {
        localStorage.setItem("jb_items", JSON.stringify(items));
    },

    // ----------------------------------------------------------
    // ========== BUYERS (PEMBELI) ==============================
    // ----------------------------------------------------------
    getBuyers() {
        let buyers = JSON.parse(localStorage.getItem("jb_buyers"));
        if (!buyers) {
            buyers = [
                { id: 1, name: "Umum", phone: "-", address: "-" },
                { id: 2, name: "Siti", phone: "0812345", address: "Jakarta" },
                { id: 3, name: "Budi", phone: "0819876", address: "Bandung" }
            ];
            localStorage.setItem("jb_buyers", JSON.stringify(buyers));
        }
        return buyers;
    },

    saveBuyers(data) {
        localStorage.setItem("jb_buyers", JSON.stringify(data));
    },

    // ----------------------------------------------------------
    // ========== STOCK IN  =====================================
    // ----------------------------------------------------------
    getStockIn() {
        let data = JSON.parse(localStorage.getItem("jb_stock_in"));
        if (!data) {
            data = [];
            localStorage.setItem("jb_stock_in", JSON.stringify(data));
        }
        return data;
    },

    saveStockIn(data) {
        localStorage.setItem("jb_stock_in", JSON.stringify(data));
    },

    // ----------------------------------------------------------
    // ========== STOCK OUT  ====================================
    // ----------------------------------------------------------
    getStockOut() {
        let data = JSON.parse(localStorage.getItem("jb_stock_out"));
        if (!data) {
            data = [];
            localStorage.setItem("jb_stock_out", JSON.stringify(data));
        }
        return data;
    },

    saveStockOut(data) {
        localStorage.setItem("jb_stock_out", JSON.stringify(data));
    },

    // ----------------------------------------------------------
    // ========== SALES (SUPER KASIR) ===========================
    // ----------------------------------------------------------
    getSales() {
        let sales = JSON.parse(localStorage.getItem("jb_sales"));
        if (!sales) {
            sales = [];
            localStorage.setItem("jb_sales", JSON.stringify(sales));
        }
        return sales;
    },

    saveSales(data) {
        localStorage.setItem("jb_sales", JSON.stringify(data));
    },

    // ----------------------------------------------------------
    // ========== LAPORAN: LABA RUGI ============================
    // ----------------------------------------------------------
    getProfitReport() {
        const sales = this.getSales();
        const stockOut = this.getStockOut();

        const totalSales = sales.reduce((a, b) => a + b.total, 0);
        const totalCOGS = stockOut.reduce((a, b) => a + b.cost, 0);

        return {
            totalSales,
            totalCOGS,
            profit: totalSales - totalCOGS
        };
    }
};

// =============================================================
//  EXPORT (untuk halaman HTML memakai <script> biasa)
// =============================================================
window.DataStore = DataStore;
