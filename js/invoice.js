/* =====================================================
   JURAGAN BUAH - INVOICE MODULE LEVEL 6
   PRINT & PDF SAFE (HP & DESKTOP)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const sales = DataStore.getSales();
  if (!sales.length) return;

  const last = sales[sales.length - 1];

  document.getElementById("invDate").innerText =
    new Date(last.date).toLocaleString();

  document.getElementById("invPayment").innerText =
    last.payment;

  const body = document.getElementById("invItems");
  let total = 0;

  last.items.forEach(i => {
    const sub = i.qty * i.price;
    total += sub;

    body.innerHTML += `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.price}</td>
        <td>${sub}</td>
      </tr>
    `;
  });

  document.getElementById("invTotal").innerText = total;
});

function printInvoice() {
  setTimeout(() => window.print(), 300);
}
