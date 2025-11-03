document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!currentUser) {
    alert("⚠️ Bạn cần đăng nhập để sử dụng giỏ hàng!");
    window.location.href = "login.html";
    return;
  }

  const cartContainer = document.getElementById("cartItems");
  const totalDisplay = document.getElementById("totalAmount");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const cartKey = `cart_${currentUser.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  function renderCart() {
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>🛒 Giỏ hàng trống</p>";
      totalDisplay.textContent = "";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const numPrice = parseInt(item.price.replace(/[^\d]/g, ""));
      total += numPrice * item.qty;

      const div = document.createElement("div");
      div.className = "checkout-item";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" width="60">
        <span>${item.name}</span>
        <div class="qty-controls">
          <button class="dec" data-index="${index}">-</button>
          <span>${item.qty}</span>
          <button class="inc" data-index="${index}">+</button>
        </div>
        <strong>${item.price}</strong>
        <button class="remove" data-index="${index}">🗑️</button>
      `;
      cartContainer.appendChild(div);
    });

    totalDisplay.textContent = "💵 Tổng: " + total.toLocaleString("vi-VN") + "₫";

    // Tăng / giảm / xóa
    document.querySelectorAll(".inc").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        cart[i].qty++;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll(".dec").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        if (cart[i].qty > 1) cart[i].qty--;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        cart.splice(i, 1);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
      });
    });
  }

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return alert("🛒 Giỏ hàng trống!");
    window.location.href = "checkout.html";
  });

  renderCart();
});




