document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  const form = document.getElementById("checkoutForm");
  const orderItems = document.getElementById("orderItems");
  const orderTotal = document.getElementById("orderTotal");
  const successModal = document.getElementById("successModal");
  const closeModalBtn = document.getElementById("closeSuccess");
  const recentOrderDiv = document.getElementById("recentOrder"); // Hiển thị đơn hàng vừa đặt

  // ===== Kiểm tra đăng nhập =====
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!currentUser) {
    alert("⚠️ Vui lòng đăng nhập trước khi thanh toán!");
    window.location.href = "login.html";
    return;
  }

  // Hiển thị thông tin user
  userInfo.textContent = `Xin chào, ${currentUser.name}`;
  logoutBtn.style.display = "inline-block";
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

  // ===== Lấy giỏ hàng =====
  const cartKey = `cart_${currentUser.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const checkoutProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  // Nếu mua ngay, thêm vào giỏ
  if (checkoutProduct) {
    const existIndex = cart.findIndex(item => item.id === checkoutProduct.id);
    if (existIndex >= 0) {
      cart[existIndex].qty += 1;
    } else {
      cart.push({ ...checkoutProduct, qty: 1 });
    }
  }

  // ===== Hàm render giỏ hàng =====
  function renderCart() {
    orderItems.innerHTML = "";
    if (cart.length === 0) {
      orderItems.innerHTML = "<p>🛒 Giỏ hàng trống</p>";
      orderTotal.textContent = "";
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
      orderItems.appendChild(div);
    });

    orderTotal.textContent = "💵 Tổng: " + total.toLocaleString("vi-VN") + "₫";

    // Tăng giảm số lượng
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

    // Xóa sản phẩm
    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        cart.splice(i, 1);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();

  // ===== Xử lý submit form =====
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value || "Tiền mặt";

    if (!name || !phone || !address) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (cart.length === 0) {
      alert("🛒 Giỏ hàng trống!");
      return;
    }

    const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/[^\d]/g, "")) * item.qty, 0);

    const order = {
      date: new Date().toLocaleString("vi-VN"),
      items: cart,
      total: total.toLocaleString("vi-VN") + "₫",
      customer: { name, phone, address, payment }
    };

    // Lưu đơn hàng vào localStorage theo user
    const orderKey = `orders_${currentUser.email}`;
    const orders = JSON.parse(localStorage.getItem(orderKey)) || [];
    orders.push(order);
    localStorage.setItem(orderKey, JSON.stringify(orders));

    // Xóa giỏ hàng đã đặt
    localStorage.removeItem(cartKey);
    localStorage.removeItem("selectedProduct");

    // Hiển thị popup và đơn hàng vừa đặt
    recentOrderDiv.innerHTML = `
      <p>Ngày: ${order.date}</p>
      <p>Thanh toán: ${order.customer.payment}</p>
      <ul>
        ${order.items.map(i => `<li>${i.name} x${i.qty} - ${i.price}</li>`).join('')}
      </ul>
      <strong>Tổng: ${order.total}</strong>
    `;
    successModal.style.display = "flex";
  });

  // ===== Đóng popup =====
  closeModalBtn.addEventListener("click", () => {
    successModal.style.display = "none";
    window.location.href = "profile.html";
  });

  window.addEventListener("click", e => {
    if (e.target.id === "successModal") successModal.style.display = "none";
  });
});




