// Kiểm tra đăng nhập
function requireLogin() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); // luôn lấy mới nhất
  if (!loggedInUser) {
    alert("⚠️ Vui lòng đăng nhập để mua hàng!");
    window.location.href = "login.html";
    return false;
  }
  return true;
}



document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // DỮ LIỆU SẢN PHẨM
  // =============================
  const products = {
        lienquan: [
      { name: "Acc Rank Kim Cương", price: "250.000₫", img: "assets/images/lienquan/lienquan1.jpg", desc: "Tài khoản Liên Quân Rank Kim Cương – sở hữu nhiều tướng và skin hot, có thể leo rank tốt. Đăng nhập bằng Garena, bảo hành 3 ngày.", rating: 4.8, reviews: 210, features: ["Tướng hot", "Skin đẹp", "Leo rank tốt"], warranty: ["Giao đúng mô tả", "Bảo hành 3 ngày", "Hỗ trợ đổi nếu lỗi"], userReviews: [{name:"Nguyễn Văn A", rating:5, comment:"Acc tốt, rất uy tín!"},{name:"Trần Thị B", rating:4, comment:"Leo rank mượt, ổn."}]},
      { name: "Acc Rank Tinh Anh", price: "180.000₫", img: "assets/images/lienquan/lienquan2.jpg", desc: "Acc Tinh Anh chất lượng, tướng đầy đủ, phù hợp cho người mới bắt đầu chơi hoặc leo rank nhanh chóng.", rating: 4.5, reviews: 132, features: ["Tướng đầy đủ", "Phù hợp newbie"], warranty: ["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn C", rating:5, comment:"Rất ok cho người mới"},{name:"Trần Thị D", rating:4, comment:"Leo rank mượt"}]},
      { name: "Acc Rank Đồng I", price: "100.000₫", img: "assets/images/lienquan/lienquan3.jpg", desc: "Acc giá rẻ Rank Đồng I, có vài tướng cơ bản, thích hợp để thử game hoặc luyện tướng.", rating: 4.2, reviews: 98, features: ["Giá rẻ", "Vài tướng cơ bản"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn E", rating:4, comment:"Thử game khá ổn"}]},
      { name: "Acc Rank Bạch Kim", price: "220.000₫", img: "assets/images/lienquan/lienquan4.jpg", desc: "Acc Bạch Kim có nhiều tướng và skin, tài khoản sạch, chưa đổi tên. Giao ngay sau khi thanh toán.", rating: 4.7, reviews: 156, features:["Tướng nhiều","Skin đẹp"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn F", rating:5, comment:"Giao nhanh, đẹp"}]},
      { name: "Acc Rank Cao Thủ", price: "350.000₫", img: "assets/images/lienquan/lienquan5.jpg", desc: "Tài khoản Rank Cao Thủ cực mạnh, có khung đẹp, tướng meta đầy đủ, sẵn sàng leo top.", rating: 4.9, reviews: 78, features:["Khung đẹp","Meta đầy đủ"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn G", rating:5, comment:"Acc mạnh, leo top dễ"}]},
      { name: "Acc Siêu Hiếm", price: "800.000₫", img: "assets/images/lienquan/lienquan6.jpg", desc: "Acc Liên Quân siêu hiếm, nhiều tướng giới hạn, skin sự kiện đặc biệt, cực kỳ đáng sưu tầm.", rating: 5, reviews: 54, features:["Hiếm","Skin sự kiện"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn H", rating:5, comment:"Rất đáng sưu tầm"}]},
      { name: "Acc Rank Vàng", price: "150.000₫", img: "assets/images/lienquan/lienquan7.jpg", desc: "Acc Rank Vàng ổn định, đủ tướng leo rank, bảo hành 3 ngày, giá phù hợp sinh viên.", rating: 4.3, reviews: 67, features:["Đủ tướng","Giá phù hợp"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn I", rating:4, comment:"Ổn cho sinh viên"}]},
      { name: "Acc Rank Bạc", price: "120.000₫", img: "assets/images/lienquan/lienquan8.jpg", desc: "Acc Rank Bạc, tài khoản cơ bản, tướng đầy đủ cho người mới tập chơi.", rating: 4.0, reviews: 40, features:["Cơ bản","Đủ tướng"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn J", rating:4, comment:"Ok cho người mới"}]},
      { name: "Acc Rank Đại Cao Thủ", price: "500.000₫", img: "assets/images/lienquan/lienquan9.jpg", desc: "Acc Đại Cao Thủ cực hiếm, có khung danh hiệu và điểm uy tín cao, dành cho người muốn trải nghiệm top rank.", rating: 4.9, reviews: 88, features:["Khung danh hiệu","Top rank"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn K", rating:5, comment:"Rất hiếm, đáng mua"}]}
    ],

    lienminh: [
      { name: "Acc Rank Bạch Kim", price: "400.000₫", img: "assets/images/lienminh/lienminh1.jpg", desc: "Acc Liên Minh Rank Bạch Kim, nhiều tướng và skin, chưa đổi tên, đăng nhập Riot, chơi mượt.", rating: 4.6, reviews: 143, features:["Tướng nhiều","Chơi mượt"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn L", rating:5, comment:"Chơi mượt, đẹp"}]},
      { name: "Acc Rank Lục Bảo", price: "550.000₫", img: "assets/images/lienminh/lienminh2.jpg", desc: "Acc Rank Lục Bảo – full tướng, có skin di sản, cực hiếm và ổn định.", rating: 4.8, reviews: 87, features:["Full tướng","Skin di sản"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn M", rating:5, comment:"Acc hiếm, tốt"}]},
      { name: "Acc Rank Vàng", price: "220.000₫", img: "assets/images/lienminh/lienminh3.jpg", desc: "Acc Vàng có đủ tướng leo rank, tài khoản sạch, chưa nạp RP, đăng nhập bằng Riot ID.", rating: 4.4, reviews: 98, features:["Đủ tướng","Sạch"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn N", rating:4, comment:"Ổn để leo rank"}]},
      { name: "Acc Rank Sắt", price: "100.000₫", img: "assets/images/lienminh/lienminh4.jpg", desc: "Acc giá rẻ Rank Sắt, dành cho người chơi mới, có sẵn vài tướng khởi đầu.", rating: 4.1, reviews: 50, features:["Giá rẻ","Dành cho newbie"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn O", rating:4, comment:"Ok cho newbie"}]},
      { name: "Acc Rank Kim Cương", price: "1.200.000₫", img: "assets/images/lienminh/lienminh5.jpg", desc: "Acc Kim Cương cực VIP, nhiều tướng hiếm, skin sự kiện, chưa bị cấm chat, leo rank cực nhanh.", rating: 5, reviews: 60, features:["VIP","Skin sự kiện"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn P", rating:5, comment:"Cực VIP, đáng mua"}]},
      { name: "Acc Full Skin", price: "900.000₫", img: "assets/images/lienminh/lienminh6.jpg", desc: "Acc Liên Minh full skin gần 100%, tướng đầy đủ, cực hiếm, đăng nhập bằng Riot.", rating: 4.9, reviews: 72, features:["Full skin","Hiếm"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn Q", rating:5, comment:"Rất hiếm, đáng sưu tầm"}]},
      { name: "Acc Rank Đồng", price: "150.000₫", img: "assets/images/lienminh/lienminh7.jpg", desc: "Acc Đồng giá rẻ, tài khoản sạch, dùng để luyện tay hoặc thử meta mới.", rating: 4.2, reviews: 38, features:["Giá rẻ","Sạch"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn R", rating:4, comment:"Dùng thử ổn"}]},
      { name: "Acc Rank Bạc", price: "180.000₫", img: "assets/images/lienminh/lienminh8.jpg", desc: "Acc Bạc có đủ tướng, vài skin, đăng nhập bằng Riot ID, bảo hành 3 ngày.", rating: 4.3, reviews: 44, features:["Đủ tướng","Vài skin"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn S", rating:4, comment:"Ổn, đáng thử"}]},
      { name: "Acc Rank Lục Bảo - Khung Lục Bảo", price: "850.000₫", img: "assets/images/lienminh/lienminh9.jpg", desc: "Acc Lục Bảo có khung danh hiệu cực hiếm, nhiều skin giới hạn và tướng hiếm.", rating: 4.9, reviews: 132, features:["Khung Lục Bảo","Hiếm"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn T", rating:5, comment:"Rất hiếm, đáng sưu tầm"}]}
    ],

    freefire: [
      { name: "Acc Skin Súng VIP", price: "400.000₫", img: "assets/images/freefire/freefire1.jpg", desc: "Acc Free Fire có full skin súng VIP, nhiều pet và trang phục hiếm. Bảo hành 3 ngày.", rating: 4.7, reviews: 120, features:["Full skin súng","Pet hiếm"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn U", rating:5, comment:"Rất đẹp"}]},
      { name: "Acc Rank Huyền Thoại", price: "1.000.000₫", img: "assets/images/freefire/freefire2.jpg", desc: "Acc Rank Huyền Thoại siêu hiếm, điểm cao, nhiều skin độc quyền, đã xác minh.", rating: 4.9, reviews: 98, features:["Top rank","Skin độc quyền"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn V", rating:5, comment:"Acc VIP, top server"}]},
      { name: "Acc Rank Bạch Kim", price: "350.000₫", img: "assets/images/freefire/freefire3.jpg", desc: "Acc Rank Bạch Kim – đủ skin và súng cơ bản, thích hợp chơi leo rank hàng ngày.", rating: 4.5, reviews: 111, features:["Skin cơ bản","Súng cơ bản"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn W", rating:5, comment:"Ổn định"}]},
      { name: "Acc Rank Vàng", price: "420.000₫", img: "assets/images/freefire/freefire4.jpg", desc: "Acc Rank Vàng Free Fire, đầy đủ skin và vật phẩm. Phù hợp cho người mới.", rating: 4.3, reviews: 66, features:["Skin đầy đủ","Vật phẩm cơ bản"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn X", rating:4, comment:"Ok newbie"}]},
      { name: "Acc Rank Kim Cương", price: "600.000₫", img: "assets/images/freefire/freefire5.jpg", desc: "Acc Rank Kim Cương với nhiều vật phẩm VIP, trang phục sự kiện, đáng sưu tầm.", rating: 4.8, reviews: 72, features:["VIP","Skin sự kiện"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn Y", rating:5, comment:"Rất đẹp"}]},
      { name: "Acc Rank Thách Đấu", price: "700.000₫", img: "assets/images/freefire/freefire6.jpg", desc: "Acc Free Fire Rank Thách Đấu – điểm cao, đồ hiếm, tài khoản sạch, không bị report.", rating: 4.9, reviews: 48, features:["Điểm cao","Đồ hiếm"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn Z", rating:5, comment:"Top server"}]},
      { name: "Acc Rank Bạc", price: "380.000₫", img: "assets/images/freefire/freefire7.jpg", desc: "Acc Rank Bạc ổn định, trang phục cơ bản, chơi tốt, bảo hành 3 ngày.", rating: 4.4, reviews: 55, features:["Trang phục cơ bản","Ổn định"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn AA", rating:4, comment:"Ổn định"}]},
      { name: "Acc Rank Sắt", price: "480.000₫", img: "assets/images/freefire/freefire8.jpg", desc: "Acc Rank Sắt giá rẻ, có vài skin cơ bản, dùng để luyện kỹ năng hoặc làm phụ.", rating: 4.1, reviews: 32, features:["Giá rẻ","Vài skin"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn BB", rating:4, comment:"Tập luyện ok"}]},
      { name: "Acc Rank Cao Thủ", price: "800.000₫", img: "assets/images/freefire/freefire9.jpg", desc: "Acc Free Fire Rank Cao Thủ, nhiều vật phẩm hiếm, khung danh hiệu đẹp, giao nhanh.", rating: 4.8, reviews: 64, features:["Vật phẩm hiếm","Khung đẹp"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn CC", rating:5, comment:"Giao nhanh, đẹp"}]},
      { name: "Acc Rank Đại Cao Thủ", price: "1.000.000₫", img: "assets/images/freefire/freefire10.jpg", desc: "Acc Đại Cao Thủ cực hiếm, top server, sở hữu skin hiếm và nhiều nhân vật full level.", rating: 5, reviews: 20, features:["Top server","Full nhân vật"], warranty:["Giao đúng mô tả","Bảo hành 3 ngày"], userReviews:[{name:"Nguyễn Văn DD", rating:5, comment:"Cực VIP, đáng mua"}]}
    ]
  };



  window.products = products;

  // =============================
  // DOM ELEMENTS
  // =============================
  
  const container = document.getElementById("productContainer");
  const categorySelect = document.getElementById("categorySelect");
  const searchName = document.getElementById("searchName") || { value: "" };
  const minPrice = document.getElementById("minPrice") || { value: 0 };
  const maxPrice = document.getElementById("maxPrice") || { value: 2000000 };
  const searchBtn = document.getElementById("searchBtn") || { addEventListener: () => {} };
  const pagination = document.getElementById("pagination");

  const itemsPerPage = 4;
  let currentPage = 1;
  let filteredList = [];

  // Chuyển "250.000₫" -> 250000
  function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/[^\d]/g, ""), 10);
  }

  function filterProducts() {
    const category = categorySelect.value;
    const nameQuery = searchName.value.trim().toLowerCase();
    let min = parseInt(minPrice.value) || 0;
    let max = parseInt(maxPrice.value) || 2000000;
    if (max > 2000000) max = 2000000;

    let list = category === "all" ? Object.values(products).flat() : products[category] || [];
    if (nameQuery) list = list.filter(p => p.name.toLowerCase().includes(nameQuery));
    list = list.filter(p => {
      const priceValue = parsePrice(p.price);
      return priceValue >= min && priceValue <= max;
    });

    filteredList = list;
    currentPage = 1;
    renderProducts();
  }

  function renderProducts() {
    container.innerHTML = "";
    if (!filteredList.length) {
      container.innerHTML = "<p>Không có sản phẩm nào phù hợp.</p>";
      pagination.innerHTML = "";
      return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredList.slice(start, end);

    pageItems.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <div class="rating">⭐ ${product.rating} (${product.reviews} đánh giá)</div>
        <p class="desc">${product.desc}</p>
        <div class="product-actions">
          <button class="btn-detail">Xem chi tiết</button>
        </div>
      `;

      // Nút mua ngay
      const buyBtn = document.createElement("button");
      buyBtn.className = "btn-buy";
      buyBtn.textContent = "Mua ngay";
      buyBtn.addEventListener("click", () => {
        if (!requireLogin()) return;
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "checkout.html";
      });

      card.querySelector(".product-actions").appendChild(buyBtn);
      container.appendChild(card);

      // Nút xem chi tiết
      card.querySelector(".btn-detail").addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product-detail.html";
      });
    });

    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === currentPage ? "active" : "";
      btn.addEventListener("click", () => {
        currentPage = i;
        renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      pagination.appendChild(btn);
    }
  }

  categorySelect.addEventListener("change", filterProducts);
  searchBtn.addEventListener("click", filterProducts);
  searchName.addEventListener("input", filterProducts);

  // Init
  filteredList = Object.values(products).flat();
  renderProducts();



  // =============================
  // PHÂN TRANG
  // =============================
  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = i === currentPage ? "active" : "";
      btn.addEventListener("click", () => {
        currentPage = i;
        renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      pagination.appendChild(btn);
    }
  }

  // =============================
  // SỰ KIỆN NGƯỜI DÙNG
  // =============================
  categorySelect.addEventListener("change", filterProducts);
  searchBtn.addEventListener("click", filterProducts);
  searchName.addEventListener("input", filterProducts);

  // =============================
  // KHỞI TẠO
  // =============================
  filteredList = Object.values(products).flat();
  renderProducts();
});