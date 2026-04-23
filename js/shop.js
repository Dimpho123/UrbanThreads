// js/shop.js
import { db, auth } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const container = document.getElementById("products");

let allProducts = [];

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const modalTitle = document.getElementById("modalTitle");
const modalConfirm = document.getElementById("modalConfirm");
const modalCancel = document.getElementById("modalCancel");

const showModal = ({
  title = "Message",
  message = "",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm = null,
  onCancel = null,
  showCancel = false
}) => {
  modalTitle.innerText = title;
  modalMessage.innerText = message;

  modalConfirm.innerText = confirmText;
  modalCancel.innerText = cancelText;

  modalCancel.style.display = showCancel ? "block" : "none";

  modal.classList.add("show");

  modalConfirm.onclick = () => {
    modal.classList.remove("show");
    if (onConfirm) onConfirm();
  };

  modalCancel.onclick = () => {
    modal.classList.remove("show");
    if (onCancel) onCancel();
  };
};

//  LOAD PRODUCTS
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

    //APPLY CATEGORY AFTER LOAD
    applySavedCategory();

  } catch (error) {
    console.error(error);
    loadFallbackProducts();
  }
};


//  DISPLAY PRODUCTS 
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
        <img src="${p.image}" />
        <h3>${p.name}</h3>
        <p class="price">R${p.price}</p>
        <button onclick="addToCart('${p.id}')">Add to Cart</button>
      </div>
    `;
  });
};

// FILTER
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
  console.log("Clicked ID:", id);
  console.log("All products:", allProducts);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = allProducts.find(p => String(p.id) === String(id));

  
  if (!product) {
    console.error("Product NOT FOUND:", id);

    showModal({
      title: "Error",
      message: "Product failed to load. Try again.",
      confirmText: "OK"
    });

    return;
  }

  const existing = cart.find(item => item.id === product.id);

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

  showModal({
    title: "Added to Cart",
    message: `${product.name} added successfully`,
    confirmText: "OK"
  });
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
