import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./index.css";

import FarmConnect from "./FarmConnect";
import AboutUs from "./components/AboutUs";
import LearnMore from "./components/LearnMore";
import ContactUs from "./components/ContactUs";
import Vegetables from "./components/Vegetables";
import Fruits from "./components/Fruits";
import Dairy from "./components/Dairy";
import Shop from "./components/Shop";
import Services from "./components/Services";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import Checkout from "./components/Checkout";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-green-600">Loading, please wait...</p>
      </div>
    </div>
  );
};

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setUserRole(userDoc.exists() ? userDoc.data().role : "customer");
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FarmConnect />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/LearnMore" element={<LearnMore />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/dairyproducts" element={<Dairy />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        {user && userRole === "farmer" && (
          <Route path="/addproduct" element={<AddProduct />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;