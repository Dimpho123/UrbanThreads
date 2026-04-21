// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbJFkHUsaQlSVp2VJzcUNt_SoFOZHKZvU",
    authDomain: "urbanthreadsstore-7252c.firebaseapp.com",
    projectId: "urbanthreadsstore-7252c",
    storageBucket: "urbanthreadsstore-7252c.firebasestorage.app",
    messagingSenderId: "604527317544",
    appId: "1:604527317544:web:5a3f75553e110923c79b1d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);