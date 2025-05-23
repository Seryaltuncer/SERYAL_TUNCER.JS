(function () {
    if (window.location.pathname !== "/") return;
  
    function getFavorites() {
      return JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    }
  
    function toggleFavorite(productId) {
      let favorites = getFavorites();
      favorites = favorites.includes(productId)
        ? favorites.filter(id => id !== productId)
        : [...favorites, productId];
      localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
    }
  
    function getProductData(callback) {
      const stored = localStorage.getItem("carouselProducts");
      stored ? callback(JSON.parse(stored)) : console.error("Veri bulunamadı.");
    }
  
    function createCarouselContainer() {
      const mainContent = document.querySelector("main") || document.body;
  
      const wrapper = document.createElement("section");
      wrapper.style.position = "relative";
      wrapper.style.padding = "0";
      wrapper.style.margin = "40px auto";
      wrapper.style.maxWidth = "1200px";
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.alignItems = "flex-start";
      wrapper.style.backgroundColor = "#fff";
  
      const title = document.createElement("h2");
      title.textContent = "Beğenebileceğiniz Ürünler";
      title.style.fontSize = "24px";
      title.style.fontWeight = "700";
      title.style.fontFamily = "'Open Sans', sans-serif";
      title.style.color = "#333";
      title.style.margin = "0 0 20px 20px";
      title.style.padding = "0";
      title.style.width = "100%";
      wrapper.appendChild(title);
  
      const carouselWrapper = document.createElement("div");
      carouselWrapper.style.position = "relative";
      carouselWrapper.style.width = "100%";
      carouselWrapper.style.overflow = "hidden";
      carouselWrapper.style.padding = "0 60px";
  
      const container = document.createElement("div");
      container.id = "product-carousel";
      container.style.display = "flex";
      container.style.gap = "20px";
      container.style.transition = "transform 0.5s ease";
      container.style.willChange = "transform";
      container.style.overflow = "visible";
      container.style.width = "max-content";
      carouselWrapper.appendChild(container);
  
      let currentIndex = 0;
      const visibleItems = 4;
  
      const scrollToIndex = (index) => {
        const itemWidth = container.firstChild?.offsetWidth + 20;
        const offset = index * itemWidth;
        container.style.transform = `translateX(-${offset}px)`;
      };
  
      const createArrowButton = (direction) => {
        const button = document.createElement("button");
        button.innerHTML = direction === "left"
          ? "<svg width='24' height='24' viewBox='0 0 24 24'><path d='M15 18L9 12L15 6' stroke='#333' stroke-width='2'/></svg>"
          : "<svg width='24' height='24' viewBox='0 0 24 24'><path d='M9 18L15 12L9 6' stroke='#333' stroke-width='2'/></svg>";
  
        Object.assign(button.style, {
          position: "absolute",
          [direction]: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "all 0.3s"
        });
  
        button.onmouseenter = () => {
          button.style.backgroundColor = "#f8f8f8";
          button.style.borderColor = "#bbb";
        };
        button.onmouseleave = () => {
          button.style.backgroundColor = "#fff";
          button.style.borderColor = "#ddd";
        };
  
        button.onclick = () => {
          if (direction === "left" && currentIndex > 0) currentIndex--;
          if (direction === "right" && currentIndex < container.childElementCount - visibleItems) currentIndex++;
          scrollToIndex(currentIndex);
        };
        return button;
      };
  
      carouselWrapper.appendChild(createArrowButton("left"));
      carouselWrapper.appendChild(createArrowButton("right"));
  
      wrapper.appendChild(carouselWrapper);
      mainContent.insertBefore(wrapper, mainContent.firstChild);
      return container;
    }
  
    function renderProducts(products, container) {
      const favorites = getFavorites();
  
      products.forEach(product => {
        const card = document.createElement("div");
        Object.assign(card.style, {
          minWidth: "285px",
          maxWidth: "285px",
          background: "#fff",
          borderRadius: "8px",
          padding: "15px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.3s",
          boxSizing: "border-box",
          border: "1px solid #eee"
        });
  
        card.onmouseenter = () => {
          card.style.boxShadow = "0 0 0 2px #f27a1a inset";
          card.style.borderColor = "#f27a1a";
        };
        card.onmouseleave = () => {
          card.style.boxShadow = "none";
          card.style.borderColor = "#eee";
        };
  
        const img = document.createElement("img");
        img.src = product.img || product.image;
        img.alt = product.name;
        Object.assign(img.style, {
          width: "100%",
          height: "220px",
          objectFit: "contain",
          marginBottom: "12px"
        });
        card.appendChild(img);
  
        const name = document.createElement("p");
        name.textContent = product.name;
        Object.assign(name.style, {
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "1.4",
          color: "#333",
          marginBottom: "8px",
          height: "40px",
          overflow: "hidden"
        });
        card.appendChild(name);
  
        // Rating yıldızları
        const rating = document.createElement("div");
        rating.style.display = "flex";
        rating.style.alignItems = "center";
        rating.style.marginBottom = "8px";
        
        const stars = document.createElement("span");
        stars.innerHTML = "★★★★★";
        stars.style.color = "#ffb400";
        stars.style.fontSize = "16px";
        rating.appendChild(stars);
        
        const reviewCount = document.createElement("span");
        reviewCount.textContent = ` (${product.reviewCount || 0})`;
        reviewCount.style.color = "#999";
        reviewCount.style.fontSize = "12px";
        reviewCount.style.marginLeft = "5px";
        rating.appendChild(reviewCount);
        card.appendChild(rating);
  
        // İndirim bilgisi
        if (product.discount) {
          const discountBadge = document.createElement("div");
          discountBadge.textContent = `%${product.discount} 😊️`;
          discountBadge.style.color = "#d32f2f";
          discountBadge.style.fontSize = "14px";
          discountBadge.style.fontWeight = "600";
          discountBadge.style.marginBottom = "4px";
          card.appendChild(discountBadge);
        }
  
        // Orijinal fiyat
        if (product.original_price) {
          const originalPrice = document.createElement("div");
          originalPrice.textContent = `${product.original_price.toFixed(2).replace('.', ',')} TL`;
          originalPrice.style.textDecoration = "line-through";
          originalPrice.style.color = "#999";
          originalPrice.style.fontSize = "14px";
          originalPrice.style.marginBottom = "2px";
          card.appendChild(originalPrice);
        }
  
        // İndirimli fiyat
        const price = document.createElement("div");
        price.textContent = `${product.price.toFixed(2).replace('.', ',')} TL`;
        price.style.color = "#d32f2f";
        price.style.fontWeight = "700";
        price.style.fontSize = "18px";
        price.style.marginBottom = "12px";
        card.appendChild(price);
  
        const btn = document.createElement("button");
        btn.textContent = "Sepete Ekle";
        Object.assign(btn.style, {
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#ff6f00",
          color: "#fff",
          fontWeight: "600",
          fontSize: "14px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          width: "100%"
        });
  
        btn.onmouseenter = () => {
          btn.style.backgroundColor = "#e66500";
        };
        btn.onmouseleave = () => {
          btn.style.backgroundColor = "#ff6f00";
        };
        card.appendChild(btn);
  
        const heart = document.createElement("span");
        heart.innerHTML = `<svg width='20' height='20' fill='none' stroke='#ccc' stroke-width='2' viewBox='0 0 24 24'><path d='M20.8 4.6c-1.6-1.6-4.1-1.6-5.7 0L12 7.7l-3.1-3.1c-1.6-1.6-4.1-1.6-5.7 0s-1.6 4.1 0 5.7l8.8 8.8 8.8-8.8c1.6-1.6 1.6-4.1 0-5.7z'/></svg>`;
        heart.style.position = "absolute";
        heart.style.top = "15px";
        heart.style.right = "15px";
        heart.style.cursor = "pointer";
        heart.style.backgroundColor = "rgba(255,255,255,0.7)";
        heart.style.borderRadius = "50%";
        heart.style.padding = "5px";
        heart.onclick = () => toggleFavorite(product.id);
        card.appendChild(heart);
  
        container.appendChild(card);
      });
    }
  
    getProductData((products) => {
      const container = createCarouselContainer();
      if (container) renderProducts(products, container);
    });
  })();