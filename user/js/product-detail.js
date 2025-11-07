document.addEventListener("DOMContentLoaded", () => {
  // Hiển thị thông tin user nếu đã đăng nhập
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (currentUser) {
    userInfo.textContent = `Xin chào, ${currentUser.name}`;
    logoutBtn.style.display = "inline-block";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }

  // Lấy dữ liệu sản phẩm từ localStorage
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) {
    document.body.innerHTML = "<p style='text-align:center;color:red;'>❌ Không tìm thấy thông tin sản phẩm.</p>";
    return;
  }

  const { name, price, img, desc, rating, reviews, features, warranty, userReviews } = product;

  // Hiển thị thông tin sản phẩm
  document.getElementById("productImg").src = img;
  document.getElementById("productName").textContent = name;
  document.getElementById("productDesc").textContent = desc || "Không có mô tả chi tiết.";
  document.getElementById("productPrice").textContent = `💰 Giá: ${price}`;

  // Hiển thị đánh giá ⭐
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  document.getElementById("productRating").innerHTML = `
    <span class="stars">${"★".repeat(fullStars)}${"☆".repeat(emptyStars)}</span>
    <span class="rating-text">(${rating.toFixed(1)}/5 – ${reviews} đánh giá)</span>
  `;

  // Hiển thị đặc điểm nổi bật
  document.getElementById("productFeatures").innerHTML = features.map(f => `<li>${f}</li>`).join("");
  // Hiển thị cam kết bảo hành
  document.getElementById("productWarranty").innerHTML = warranty.map(w => `<li>${w}</li>`).join("");
  // Hiển thị đánh giá người dùng
  document.getElementById("productUserReviews").innerHTML = userReviews.map(u => `<li>⭐ ${u.rating} – “${u.comment}” – ${u.name}</li>`).join("");

  // Xử lý nút Mua ngay
  document.getElementById("buyNowBtn").addEventListener("click", () => {
    if (!currentUser) {
      alert("⚠️ Vui lòng đăng nhập để mua hàng!");
      window.location.href = "login.html";
      return;
    }
    localStorage.setItem("checkoutProduct", JSON.stringify(product));
    window.location.href = "checkout.html";
  });

  // Xử lý nút Thêm vào giỏ hàng
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    if (!currentUser) {
      alert("⚠️ Vui lòng đăng nhập để thêm vào giỏ hàng!");
      window.location.href = "login.html";
      return;
    }

    const cartKey = `cart_${currentUser.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, img, qty: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
  });
});


