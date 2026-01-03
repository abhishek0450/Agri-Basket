import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const FarmConnect = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          setUserRole(userDoc.exists() ? userDoc.data().role : "customer");
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("customer");
        }
      } else {
        setUserRole(null); // No redirect for guests
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-green-50 min-h-screen">

      <section id="home" className="relative bg-green-100 text-center py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://www.nicheagriculture.com/wp-content/uploads/2023/09/Are-agriculture-and-farming-the-same-Agriculture-vs-Farming-1024x680.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-green-100 opacity-75"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-green-900 mb-6">
            Fresh Farm Produce Direct to Your Doorstep
          </h1>
          <p className="text-xl text-green-700 mb-8">
            Supporting Local Farmers, Delivering Quality Produce
          </p>
          <div className="space-x-4 flex justify-center flex-wrap">
            <Link
              to="/products"
              className="bg-green-600 m-2 border-2 border-green-900 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/LearnMore"
              className="bg-white m-2 text-green-600 px-8 py-3 rounded-full border-2 border-green-600 hover:bg-green-100 transition"
            >
              Learn More
            </Link>
            {userRole === "farmer" && (
              <Link
                to="/addproduct"
                className="bg-yellow-100 border-2 border-yellow-700 text-yellow-700 m-2 px-8 py-3 rounded-full hover:bg-yellow-200 transition"
              >
                Add Product
              </Link>
            )}
          </div>
        </div>
      </section>

      <section id="/services" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900">
          Our Product Categories
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src="https://assets.cntraveller.in/photos/60ba23b90f3a5367ec9fe85b/16:9/w_960,c_limit/Farm-fresh-produce-1366x768.jpg"
              alt="Fresh Fruits"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Fresh Fruits
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>🍎 Fresh Apples - ₹120/kg (min. 10 kg)</li>
                <li>🍌 Ripe Bananas - ₹50/kg (min. 10 kg)</li>
                <li>🍊 Juicy Oranges - ₹100/kg (min. 10 kg)</li>
              </ul>
              <Link
                to="/fruits"
                className="mt-6 block text-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
              >
                View Fruits
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src="https://b3075642.smushcdn.com/3075642/wp-content/uploads/Canva-Farmer-in-sugar-beet-field-1-1536x1024.jpg?lossy=1&strip=1&webp=1"
              alt="Fresh Vegetables"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Fresh Vegetables
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>🥕 Crisp Carrots - ₹40/kg (min. 10 kg)</li>
                <li>🥬 Fresh Spinach - ₹20/bundle (min. 20 bundles)</li>
                <li>🍅 Ripe Tomatoes - ₹50/kg (min. 10 kg)</li>
              </ul>
              <Link
                to="/vegetables"
                className="mt-6 block text-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
              >
                View Vegetables
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src="https://media.istockphoto.com/id/652550482/photo/portrait-of-buffalo-shepherd.jpg?s=612x612&w=0&k=20&c=Rir8MHClROhkO9JhQ62BaBBtk7gf5Tv2eEltLApJWks="
              alt="Farm Fresh Dairy"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Farm Fresh Dairy
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>🥛 Raw Milk - ₹40/liter (min. 100 liters)</li>
                <li>🧀 Artisan Cheese - ₹30/pack (min. 20 packs)</li>
                <li>🥣 Fresh Yogurt - ₹40/jar (min. 20 jars)</li>
              </ul>
              <Link
                to="/dairyproducts"
                className="mt-6 block text-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
              >
                View Dairy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#home" className="hover:text-green-300">
              Home
            </a>
            <a href="#/services" className="hover:text-green-300">
              Services
            </a>
            <a href="#about" className="hover:text-green-300">
              About Us
            </a>
            <a href="#contact" className="hover:text-green-300">
              Contact
            </a>
          </div>
          <p className="mb-4">
            © 2024 Agri Basket. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-white hover:text-green-300">
              Facebook
            </a>
            <a href="#" className="text-white hover:text-green-300">
              Instagram
            </a>
            <a href="#" className="text-white hover:text-green-300">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FarmConnect;
