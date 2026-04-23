// js/shop.js
import { db, auth } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const container = document.getElementById("products");

let allProducts = [];



//LOAD PRODUCTS
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


// DISPLAYING OF PRODUCTS 
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

//FILTER
window.filterCategory = (category) => {
  if (category === "All") {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    displayProducts(filtered);
  }
};

// CART
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
const applySavedCategory = () => {
  const selectedCategory = localStorage.getItem("selectedCategory");

  if (selectedCategory) {
    if (selectedCategory === "All") {
      displayProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        p => p.category === selectedCategory
      );
      displayProducts(filtered);
    }

    localStorage.removeItem("selectedCategory");
  }
};
//  RUN
loadProducts();

