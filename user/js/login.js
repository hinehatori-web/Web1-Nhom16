// ===============================
// 📜 login.js – Xử lý đăng nhập
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  if (!form) return; // Nếu không có form thì dừng (tránh lỗi trên trang khác)

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    // Lấy danh sách người dùng đã đăng ký trong localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm user có email & password khớp
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // ✅ Lưu thông tin người dùng đang đăng nhập
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      alert(`🎉 Xin chào ${user.name}! Đăng nhập thành công!`);
      window.location.href = "index.html"; // Quay về trang chủ sau khi đăng nhập
    } else {
      alert("⚠️ Sai email hoặc mật khẩu. Vui lòng thử lại!");
    }
  });
});

// ===============================
// 🧩 Hàm tiện ích kiểm tra đăng nhập
// ===============================
function requireLogin() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("⚠️ Vui lòng đăng nhập để tiếp tục!");
    window.location.href = "login.html";
    return false;
  }
  return true;
}



