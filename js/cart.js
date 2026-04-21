import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const cartContainer = document.getElementById("cart");
const totalEl = document.getElementById("total");

// fallback (for safety)
const fallbackProducts = [
  { id: "1", name: "Oversized Hoodie", price: 499 },
  { id: "2", name: "Street T-Shirt", price: 299 },
  { id: "3", name: "Nike Sneakers", price: 1299 },
  { id: "4", name: "Cap Hat", price: 199 }
];

const loadCart = () => {
  cartContainer.innerHTML = "";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty </p>";
    totalEl.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" style="width:80px; height:80px; object-fit:cover;" />
        <h3>${item.name}</h3>
        <p>Price: R${item.price}</p>

        <div class="cart-controls">
          <button onclick="decreaseQty('${item.id}')">-</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty('${item.id}')">+</button>
        </div>

        <p>Subtotal: R${itemTotal}</p>

        <button onclick="removeItem('${item.id}')">Remove</button>
      </div>
    `;
  });

  totalEl.innerText = "Total: R" + total;
};


window.increaseQty = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.map(item =>
    item.id === id ? { ...item, qty: item.qty + 1 } : item
  );

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
};

window.decreaseQty = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.map(item =>
    item.id === id ? { ...item, qty: item.qty - 1 } : item
  ).filter(item => item.qty > 0);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
};

window.removeItem = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
};

loadCart();


  let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

window.checkout = () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please login before checkout");

    localStorage.setItem("redirectAfterLogin", "cart.html");
    window.location.href = "login.html";
    return;
  }

  // ✅ Logged in
  alert("Order placed successfully 🎉");

  localStorage.removeItem("cart");
  loadCart();
};
  
  


window.goToCart = () => {
  window.location.href = "cart.html";
};

window.goToLogin = () => {
  window.location.href = "login.html";
};