document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const orderList = document.getElementById("orderList");

  if (!currentUser) {
    alert("⚠️ Vui lòng đăng nhập để xem đơn hàng!");
    window.location.href = "login.html";
    return;
  }

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    orderList.innerHTML = "<p>📭 Bạn chưa có đơn hàng nào.</p>";
    return;
  }

  // Nếu đơn hàng chưa có trạng thái thì mặc định là "Đang xử lý"
  orders = orders.map(o => ({
    ...o,
    status: o.status || "processing"
  }));
  localStorage.setItem("orders", JSON.stringify(orders));

  // Hàm chuyển trạng thái thành chữ + emoji
  const getStatusText = status => {
    switch (status) {
      case "done": return "✅ Hoàn tất";
      case "cancel": return "❌ Đã hủy";
      default: return "🕓 Đang xử lý";
    }
  };

  // Hiển thị danh sách đơn hàng
  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.classList.add("order-item");

    div.innerHTML = `
      <h3>🧾 Đơn hàng #${index + 1}</h3>
      <p><b>Ngày đặt:</b> ${order.date}</p>
      <p><b>Tổng cộng:</b> ${order.total}</p>
      <p><b>Trạng thái:</b> <span class="status ${order.status}">${getStatusText(order.status)}</span></p>
      <button class="viewDetailBtn" data-index="${index}">Xem chi tiết</button>

      ${
        order.status === "processing"
          ? `<button class="cancelBtn" data-index="${index}">Hủy đơn</button>`
          : ""
      }
      <hr>
    `;
    orderList.appendChild(div);
  });

  // === POPUP CHI TIẾT ===
  const modal = document.getElementById("orderDetailModal");
  const closeModal = document.getElementById("closeModal");
  const orderDetail = document.getElementById("orderDetail");

  document.querySelectorAll(".viewDetailBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.index;
      const order = orders[idx];

      let itemsHTML = "";
      order.items.forEach(i => {
        itemsHTML += `
          <li>
            <img src="${i.img}" alt="${i.name}" width="60">
            ${i.name} × ${i.qty} - ${i.price}
          </li>`;
      });

      orderDetail.innerHTML = `
        <p><b>🧾 Ngày đặt:</b> ${order.date}</p>
        <p><b>👤 Người nhận:</b> ${order.customer.name}</p>
        <p><b>📞 SĐT:</b> ${order.customer.phone}</p>
        <p><b>📍 Địa chỉ:</b> ${order.customer.address}</p>
        <p><b>💳 Thanh toán:</b> ${
          order.customer.payment === "cod"
            ? "💵 Tiền mặt khi nhận hàng"
            : "🏦 Chuyển khoản"
        }</p>
        <h4>Sản phẩm:</h4>
        <ul>${itemsHTML}</ul>
        <p><b>Tổng cộng:</b> ${order.total}</p>
        <p><b>Trạng thái:</b> ${getStatusText(order.status)}</p>
      `;

      modal.style.display = "flex";
    });
  });

  // === NÚT HỦY ĐƠN ===
  document.querySelectorAll(".cancelBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.index;
      if (confirm("❌ Bạn có chắc muốn hủy đơn hàng này không?")) {
        orders[idx].status = "cancel";
        localStorage.setItem("orders", JSON.stringify(orders));
        alert("Đơn hàng đã được hủy.");
        location.reload();
      }
    });
  });

  // === ĐÓNG POPUP ===
  closeModal.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});


