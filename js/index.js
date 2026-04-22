// js/shop.js
import { db, auth } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const container = document.getElementById("products");

let allProducts = [];



// 📦 LOAD PRODUCTS
const loadProducts = async () => {
  container.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    if (querySnapshot.empty) {
      loadFallbackProducts();
      return;
    }

    allProducts = [];

    querySnapshot.forEach((doc) => {
      const p = { id: doc.id, ...doc.data() };
      allProducts.push(p);
    });

    displayProducts(allProducts);

  } catch (error) {
    console.error(error);
    loadFallbackProducts();
  }
};

// 🧪 FALLBACK PRODUCTS
const loadFallbackProducts = () => {
  allProducts = [
     {
      id: "1",
      name: "Street T-Shirt",
      price: 299,
      category: "T-shirts",
     image: "images/tshirts/tshirt2.jpg"
    },
    {
     id: "2",
      name: "Black Hoodie",
      price: 550,
      category: "T-shirts",
      image: "images/tshirts/tshirt1.jpg"
    },
    {
     id: "3",
      name: "Black Hoodie",
      price: 550,
      category: "T-shirts",
      image: "images/tshirts/tshirt3.jpg"
    },
    {
     id: "4",
      name: "Black Hoodie",
      price: 550,
      category: "T-shirts",
      image: "images/tshirts/tshirt4.jpg"
    },
    {
     id: "5",
      name: "Black Hoodie",
      price: 550,
      category: "T-shirts",
      image: "images/tshirts/tshirt5.jpg"
    },
    {
     id: "6",
      name: "Black Hoodie",
      price: 550,
      category: "T-shirts",
      image: "images/tshirts/tshirt6.jpg"
    },
    {
     id: "7",
      name: "Black Hoodie",
      price: 550,
      category: "T-shirts",
      image: "images/tshirts/tshirt7.jpg"
    },
    {
     id: "8",
      name: "Black Hoodie",
      price: 550,
      category: "T-shirts",
      image: "images/tshirts/tshirt8.jpg"
    },
    {
      id: "9",
      name: "RoseSeek Girl's Letter Graphic Hoodies",
      price: 443,
      category: "Hoodies",
      image: "images/hoodies/hoodie2.jpg"
    },
   
    {
      id: "10",
      name: "Nike Sneakers",
      price: 1299,
      category: "Sneakers",
      image: "images/Sneakers/sneaker1.jpg"
    },
    {
      id: "11",
      name: "Cap Hat",
      price: 199,
      category: "Accessories",
     image: "images/Accessories/Nike Beanie.jpg"
    },
     {
      id: "12",
      name: "Nude hoodie",
      price: 305,
      category: "Hoodies",
      image: "images/hoodies/hoodie1.jpg"
    },
     
    {
      id: "13",
      name: "Neck scarf for men",
      price: 165,
      category: "Accessories",
      image: "images/Accessories/Scarf.jpg"
    },
    {
     id: "14",
      name: "Blue Hoodie for men",
      price: 450,
      category: "Hoodies",
      image: "images/hoodies/hoodie3.jpg"
    },
    
    
    {
     id: "15",
      name: "Black Hoodie",
      price: 550,
      category: "Hoodies",
      image: "images/hoodies/hoodies4.jpg"
    },
    {
     id: "16",
      name: "Novelty Hoodies for Women Men Loose Fit Y2k Hooded Sweatshirt Casual Unisex",
      price: 600,
      category: "Hoodies",
      image: "images/hoodies/hoodie5.jpg"
    },
    {
     id: "17",
      name: "Grey Oversized Hoodie",
      price: 600,
      category: "Hoodies",
      image: "images/hoodies/hoodie6.jpg"
    },
    {
     id: "18",
      name: "Black Hoodie",
      price: 550,
      category: "Hoodies",
      image: "images/hoodies/hoodie7.jpg"
    },
    {
     id: "19",
      name: "Blue Samba Sneakers",
      price: 600,
      category: "Sneakers",
      image: "images/Sneakers/Sneaker2.jpg"
    },
    {
     id: "20",
      name: "Samba Sneakers",
      price: 600,
      category: "Sneakers",
      image: "images/Sneakers/Sneaker3.jpg"
    },
    {
     id: "21",
      name: "Jogging Blue Sneakers",
      price: 476,
      category: "Sneakers",
      image: "images/Sneakers/Sneaker4.jpg"
    },
    {
     id: "22",
      name: "Jogging White Sneakers",
      price: 476,
      category: "Sneakers",
      image: "images/Sneakers/Sneaker5.jpg"
    },
    {
     id: "23",
      name: "Guess Sneakers",
      price: 780,
      category: "Sneakers",
      image: "images/Sneakers/Sneaker6.jpg"
    },
    {
     id: "24",
      name: "White Reebok Sneakers",
      price: 780,
      category: "Sneakers",
      image: "images/Sneakers/Sneaker7.jpg"
    },
    {
     id: "25",
      name: "New Balance Sneakers",
      price: 2800,
      category: "Sneakers",
      image: "images/Sneakers/Sneaker8.jpg"
    },
    {
     id: "26",
      name: "Pink Bonnet",
      price: 140,
      category: "Accessories",
      image: "images/Accessories/Bonnet.jpg"
    },
    {
     id: "27",
      name: "Nike cap",
      price: 800,
      category: "Accessories",
      image: "images/Accessories/Cap.jpg"
    },
    {
     id: "28",
      name: "3 in one gold and silver earings",
      price: 400,
      category: "Accessories",
      image: "images/Accessories/Earing.jpg"
    },
    {
     id: "29",
      name: "oval shaped glasses for men",
      price: 250,
      category: "Accessories",
      image: "images/Accessories/glasses.jpg"
    },
    {
     id: "30",
      name: "Gold necklace",
      price: 1450,
      category: "Accessories",
      image: "images/Accessories/necklace.jpg"
    },
    {
     id: "31",
      name: "Women's shaper",
      price: 799,
      category: "Accessories",
      image: "images/Accessories/shaper.jpg"
    },
    {
     id: "32",
      name: "Women's Gold Watch",
      price: 870,
      category: "Accessories",
      image: "images/Accessories/watch.jpg"
    }
    ];

  displayProducts(allProducts);
};

// 🎨 DISPLAY PRODUCTS (GLOBAL ✅)
const displayProducts = (products) => {
  container.innerHTML = "";

  const empty = document.getElementById("empty");

  if (products.length === 0) {
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  products.forEach((p) => {
    container.innerHTML += `
      <div class="product">
       <img src="${p.image || p.imageURL}" />
        <h3>${p.name}</h3>
        <p class="price">R${p.price}</p>
        <button onclick="addToCart('${p.id}')">Add to Cart</button>
      </div>
    `;
  });
};

// 🔍 FILTER
window.filterCategory = (category) => {
  if (category === "All") {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    displayProducts(filtered);
  }
};

// 🛒 CART
window.addToCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = allProducts.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.imageURL,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
};

window.goToCategory = (category) => {
  localStorage.setItem("selectedCategory", category);
  window.location.href = "shop.html";
};

window.goToCart = () => {
  window.location.href = "cart.html";
};

window.goToLogin = () => {
  window.location.href = "login.html";
};

//  RUN
loadProducts();
window.goToCart = () => {
  window.location.href = "cart.html";
};

window.goToLogin = () => {
  window.location.href = "login.html";
};