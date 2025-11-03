// ==============================
// 📄 FILE: js/product-detail.js
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // --- Lấy dữ liệu sản phẩm từ localStorage ---
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) {
    document.body.innerHTML = "<p style='text-align:center;color:red;'>❌ Không tìm thấy thông tin sản phẩm.</p>";
    return;
  }

  const { name, price, img, desc, rating, reviews, features, warranty, userReviews } = product;

  // --- Hiển thị thông tin cơ bản ---
  document.getElementById("productImg").src = img;
  document.getElementById("productName").textContent = name;
  document.getElementById("productDesc").textContent = desc || "Không có mô tả chi tiết.";
  document.getElementById("productPrice").textContent = `💰 Giá: ${price}`;

  // --- Hiển thị đánh giá ⭐ ---
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  document.getElementById("productRating").innerHTML = `
    <span class="stars" style="color:#ffcc00; font-size:1.2em;">
      ${"★".repeat(fullStars)}${"☆".repeat(emptyStars)}
    </span>
    <span class="rating-text">(${rating.toFixed(1)}/5 – ${reviews} đánh giá)</span>
  `;

  // --- Hiển thị đặc điểm nổi bật ---
  const featureList = document.getElementById("productFeatures");
  featureList.innerHTML = features.map(f => `<li>${f}</li>`).join("");

  // --- Hiển thị cam kết bảo hành ---
  const warrantyList = document.getElementById("productWarranty");
  warrantyList.innerHTML = warranty.map(w => `<li>${w}</li>`).join("");

  // --- Hiển thị đánh giá người dùng ---
  const userList = document.getElementById("productUserReviews");
  userList.innerHTML = userReviews.map(u => `<li>⭐ ${u.rating} – “${u.comment}” – ${u.name}</li>`).join("");

  // --- Xử lý nút Mua ngay ---
  document.getElementById("buyNowBtn").addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!currentUser) {
      alert("⚠️ Vui lòng đăng nhập để mua hàng!");
      window.location.href = "login.html";
      return;
    }

    localStorage.setItem("checkoutProduct", JSON.stringify(product));
    window.location.href = "checkout.html";
  });

  // --- Xử lý nút Thêm vào giỏ hàng ---
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
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

