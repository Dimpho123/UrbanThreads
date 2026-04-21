
import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


//  SIGNUP FUNCTION
window.signup = async () => {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      name,
      email
    });

    alert("Account created!");
    showLogin(); 

  } catch (error) {
    alert(error.message);
  }
};


//  LOGIN FUNCTION
window.login = async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    const redirect = localStorage.getItem("redirectAfterLogin") || "shop.html";
    localStorage.removeItem("redirectAfterLogin");

    window.location.href = redirect;

  } catch (error) {
    alert(error.message);
  }
};



window.showSignup = () => {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("form-title").innerText = "Sign Up";
};

window.showLogin = () => {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("form-title").innerText = "Login";
};

