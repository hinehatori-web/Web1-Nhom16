document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Hiển thị header
  function updateHeader() {
    if (loggedInUser) {
      userInfo.textContent = `Xin chào, ${loggedInUser.name || loggedInUser.email}`;
      logoutBtn.style.display = "inline-block";
    } else {
      userInfo.textContent = "";
      logoutBtn.style.display = "none";
    }
  }
  updateHeader();

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Bạn có chắc muốn đăng xuất không?")) {
        localStorage.removeItem("loggedInUser");
        loggedInUser = null;
        updateHeader();
        alert("✅ Đăng xuất thành công!");
        window.location.href = "index.html";
      }
    });
  }

  // Register
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();
      const phone = document.getElementById("regPhone").value.trim();
      if (!name || !email || !password || !phone) return alert("⚠️ Nhập đầy đủ thông tin!");

      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.find(u => u.email === email)) return alert("⚠️ Email đã tồn tại!");

      users.push({ name, email, password, phone });
      localStorage.setItem("users", JSON.stringify(users));
      alert("🎉 Đăng ký thành công! Hãy đăng nhập.");
      registerForm.reset();
      window.location.href = "login.html";
    });
  }

  // Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        loggedInUser = user;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("✅ Đăng nhập thành công!");
        updateHeader();
        window.location.href = "index.html";
      } else alert("⚠️ Sai email hoặc mật khẩu!");
    });
  }

  // Profile update
  const profileForm = document.getElementById("profileForm");
  if (profileForm && loggedInUser) {
    document.getElementById("name").value = loggedInUser.name || "";
    document.getElementById("email").value = loggedInUser.email || "";
    document.getElementById("phone").value = loggedInUser.phone || "";

    profileForm.addEventListener("submit", e => {
      e.preventDefault();
      const newName = document.getElementById("name").value.trim();
      const newEmail = document.getElementById("email").value.trim();
      const newPhone = document.getElementById("phone").value.trim();
      const newPassword = document.getElementById("password").value.trim();
      if (!newName || !newEmail || !newPhone) return alert("⚠️ Nhập đầy đủ thông tin!");

      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (newEmail !== loggedInUser.email && users.find(u => u.email === newEmail))
        return alert("⚠️ Email đã tồn tại!");

      const oldEmail = loggedInUser.email;
      loggedInUser.name = newName;
      loggedInUser.email = newEmail;
      loggedInUser.phone = newPhone;
      if (newPassword) loggedInUser.password = newPassword;

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      users = users.map(u => (u.email === oldEmail ? loggedInUser : u));
      localStorage.setItem("users", JSON.stringify(users));
      alert("✅ Cập nhật thông tin thành công!");
      updateHeader();
    });
  }
});



