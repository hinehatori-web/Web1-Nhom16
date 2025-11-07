document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileForm = document.getElementById("profileForm");
  const orderHistoryDiv = document.getElementById("orderHistory");

  let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!currentUser) {
    alert("⚠️ Bạn cần đăng nhập để xem trang cá nhân!");
    window.location.href = "login.html";
    return;
  }

  // Hiển thị user info
  userInfo.textContent = `Xin chào, ${currentUser.name}`;
  logoutBtn.style.display = "inline-block";
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

  // Điền form với thông tin hiện tại
  document.getElementById("name").value = currentUser.name || "";
  document.getElementById("email").value = currentUser.email || "";
  document.getElementById("phone").value = currentUser.phone || "";

  // ===================== Form cập nhật =====================
  profileForm.addEventListener("submit", e => {
    e.preventDefault();

    const newName = document.getElementById("name").value.trim();
    const newEmail = document.getElementById("email").value.trim();
    const newPhone = document.getElementById("phone").value.trim();
    const newPassword = document.getElementById("password").value.trim();

    if (!newName || !newEmail || !newPhone) {
      alert("⚠️ Nhập đầy đủ thông tin!");
      return;
    }

    // Kiểm tra email cơ bản
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      alert("⚠️ Email không hợp lệ!");
      return;
    }

    // Kiểm tra số điện thoại VN
    if (!/^0\d{9}$/.test(newPhone)) {
      alert("⚠️ Số điện thoại phải gồm 10 số, bắt đầu bằng 0!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (newEmail !== currentUser.email && users.find(u => u.email === newEmail)) {
      alert("⚠️ Email đã tồn tại!");
      return;
    }

    const oldEmail = currentUser.email;
    currentUser.name = newName;
    currentUser.email = newEmail;
    currentUser.phone = newPhone;
    if (newPassword) currentUser.password = newPassword;

    // Lưu vào localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
    users = users.map(u => (u.email === oldEmail ? currentUser : u));
    localStorage.setItem("users", JSON.stringify(users));

    // Di chuyển đơn hàng cũ nếu đổi email
    if (newEmail !== oldEmail) {
      const oldOrders = JSON.parse(localStorage.getItem(`orders_${oldEmail}`)) || [];
      localStorage.setItem(`orders_${newEmail}`, JSON.stringify(oldOrders));
      localStorage.removeItem(`orders_${oldEmail}`);
    }

    alert("✅ Cập nhật thông tin thành công!");
    document.getElementById("password").value = ""; // Xóa mật khẩu
    renderOrders(); // Cập nhật lịch sử đơn hàng
  });

  // ===================== Hiển thị lịch sử đơn hàng =====================
  function renderOrders() {
    const orderKey = `orders_${currentUser.email}`;
    const orders = JSON.parse(localStorage.getItem(orderKey)) || [];

    orderHistoryDiv.innerHTML = "";
    if (orders.length === 0) {
      orderHistoryDiv.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
      return;
    }

    orders.slice().reverse().forEach((order, idx) => {
      const div = document.createElement("div");
      div.className = "order-card";
      div.innerHTML = `
        <p><strong>Ngày đặt:</strong> ${order.date}</p>
        <p><strong>Thanh toán:</strong> ${order.customer.payment}</p>
        <button class="toggleDetailBtn" data-idx="${idx}">Xem chi tiết</button>
        <div class="order-detail" style="display:none;">
          <ul>
            ${order.items.map(i => `<li>${i.name} x${i.qty} - ${i.price}</li>`).join('')}
          </ul>
          <p><strong>Tổng:</strong> ${order.total}</p>
        </div>
        <hr>
      `;
      orderHistoryDiv.appendChild(div);
    });

    // Toggle chi tiết đơn hàng
    document.querySelectorAll(".toggleDetailBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const detailDiv = btn.nextElementSibling;
        detailDiv.style.display = detailDiv.style.display === "none" ? "block" : "none";
      });
    });
  }

  renderOrders();
});

