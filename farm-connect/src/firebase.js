// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC59Xcpe_XORFKD7qndgVT7HBdP-CYI0xQ",
//   authDomain: "agri-basket.firebaseapp.com",
//   projectId: "agri-basket",
//   storageBucket: "agri-basket.firebasestorage.app",
//   messagingSenderId: "569589970363",
//   appId: "1:569589970363:web:eb0206a39c082bd781009e"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
import { getAuth } from "firebase/auth"; // Import getAuth


const firebaseConfig = {
    apiKey: "AIzaSyC59Xcpe_XORFKD7qndgVT7HBdP-CYI0xQ",
    authDomain: "agri-basket.firebaseapp.com",
    projectId: "agri-basket",
    storageBucket: "agri-basket.firebasestorage.app",
    messagingSenderId: "569589970363",
    appId: "1:569589970363:web:eb0206a39c082bd781009e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
