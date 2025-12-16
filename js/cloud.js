/* =====================================
   CLOUD DATABASE — LEVEL 8
   FIRESTORE REALTIME
===================================== */

/* ====== FIREBASE CONFIG ====== */
const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "ISI.firebaseapp.com",
  projectId: "ISI",
  storageBucket: "ISI.appspot.com",
  messagingSenderId: "ISI",
  appId: "ISI"
};

/* ====== INIT ====== */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* =====================================
   CLOUD STORE API
===================================== */

const CloudStore = {

  /* ---------- ITEMS ---------- */
  async getItems() {
    const snap = await db.collection("items").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async saveItem(item) {
    await db.collection("items").doc(item.id).set(item);
  },

  async deleteItem(id) {
    await db.collection("items").doc(id).delete();
  },

  /* ---------- STOCK ---------- */
  async updateStock(itemId, qty) {
    const ref = db.collection("items").doc(itemId);
    await db.runTransaction(async tx => {
      const doc = await tx.get(ref);
      const stock = (doc.data().stock || 0) + qty;
      tx.update(ref, { stock });
    });
  },

  /* ---------- SALES ---------- */
  async saveSale(sale) {
    sale.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await db.collection("sales").add(sale);
  },

  async getSales() {
    const snap = await db.collection("sales")
      .orderBy("createdAt", "desc")
      .get();
    return snap.docs.map(d => d.data());
  },

  /* ---------- REALTIME LISTENER ---------- */
  onItemsChange(callback) {
    return db.collection("items").onSnapshot(snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(data);
    });
  },

  onSalesChange(callback) {
    return db.collection("sales").onSnapshot(snap => {
      const data = snap.docs.map(d => d.data());
      callback(data);
    });
  }
};
