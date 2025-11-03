document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // ===== Kiểm tra đăng nhập =====
  if (!currentUser) {
    alert("⚠️ Bạn cần đăng nhập để xem trang cá nhân!");
    window.location.href = "login.html";
    return;
  }

  // Hiển thị user
  userInfo.textContent = `Xin chào, ${currentUser.name}`;
  logoutBtn.style.display = "inline-block";
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

  // ===== Form cập nhật thông tin =====
  const profileForm = document.getElementById("profileForm");
  document.getElementById("name").value = currentUser.name || "";
  document.getElementById("email").value = currentUser.email || "";
  document.getElementById("phone").value = currentUser.phone || "";

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

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (newEmail !== currentUser.email && users.find(u => u.email === newEmail)) {
      return alert("⚠️ Email đã tồn tại!");
    }

    const oldEmail = currentUser.email;
    currentUser.name = newName;
    currentUser.email = newEmail;
    currentUser.phone = newPhone;
    if (newPassword) currentUser.password = newPassword;

    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
    users = users.map(u => (u.email === oldEmail ? currentUser : u));
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Cập nhật thông tin thành công!");
  });

  // ===== Hiển thị lịch sử đơn hàng =====
  const orderHistoryDiv = document.getElementById("orderHistory");
  const orderKey = `orders_${currentUser.email}`;
  const orders = JSON.parse(localStorage.getItem(orderKey)) || [];

  if (orders.length === 0) {
    orderHistoryDiv.innerHTML = "<p>Chưa có đơn hàng nào.</p>";
  } else {
    orderHistoryDiv.innerHTML = "";
    orders.reverse().forEach(order => {
      const div = document.createElement("div");
      div.className = "order-card";
      div.innerHTML = `
        <p><strong>Ngày đặt:</strong> ${order.date}</p>
        <p><strong>Thanh toán:</strong> ${order.customer.payment}</p>
        <ul>
          ${order.items.map(i => `<li>${i.name} x${i.qty} - ${i.price}</li>`).join('')}
        </ul>
        <p><strong>Tổng:</strong> ${order.total}</p>
        <hr>
      `;
      orderHistoryDiv.appendChild(div);
    });
  }
});
