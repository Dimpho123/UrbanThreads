import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const cartContainer = document.getElementById("cart");
const totalEl = document.getElementById("total");

const userSummaryEl = document.getElementById("userSummary");

const displayUserInfo = async (user) => {
  if (!user) {
    userSummaryEl.innerHTML = "<p></p>";
    return;
  }

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    let name = user.email; // fallback

    if (docSnap.exists()) {
      name = docSnap.data().name || user.email;
    }

    userSummaryEl.innerHTML = `
      <div class="user-card">
        <h3><span class="material-symbols-outlined user-icon">person</span> ${name}</h3>
        <p>${user.email}</p>
      </div>
    `;

  } catch (error) {
    console.error(error);
  }
};



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

        <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
      </div>
    `;
  });

  totalEl.innerHTML = `
  <div class="order-summary">
    <h2>Order Summary</h2>
    <p>Total Items: ${cart.length}</p>
    <h3>Total: R${total}</h3>
    <button onclick="checkout()">Checkout</button>
  </div>
`;
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
let authReady = false;

// Runs once when page loads
onAuthStateChanged(auth, (user) => {
  console.log("Auth state:", user)
  currentUser = user;
  authReady = true;

  displayUserInfo(user);
});

window.checkout = () => {
  
  if (!authReady) {
    alert("Loading... try again");
    return;
  }

  // not logged in
  if (!currentUser) {
    localStorage.setItem("redirectAfterLogin", "cart.html");
    localStorage.setItem("redirectAction", "checkout");
    alert("Please login before checkout");

    localStorage.setItem("redirectAfterLogin", "cart.html");
    window.location.href = "login.html";
    return;
  }
completeCheckout();
};

   
 const completeCheckout = () => {
  alert("Order placed successfully");
  
  localStorage.removeItem("cart");
  loadCart();
  
const redirectAction = localStorage.getItem("redirectAction");
if (redirectAction === "checkout") {
localStorage.removeItem("redirectAction");

setTimeout(() => {
  checkout();
}, 500);
}


 }
  window.logout = async () => {
    try {
    await signOut(auth);
    localStorage.setItem("authMessage", "Logged out successfully");
    window.location.href = "index.html";
    alert("Logged out");
    } catch (error) {
      console.error(error);
    }
  };
window.goBack = () => {
  window.history.back();
};


window.goToCart = () => {
  window.location.href = "cart.html";
};

window.goToLogin = () => {
  window.location.href = "login.html";
};