import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/vegetables.png";
import { Languages, Menu, X } from "lucide-react";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [userRole, setUserRole] = useState(null);
  const [isHindi, setIsHindi] = useState(false);

  const translations = {
    Checkout: "चेकआउट",
    "Shipping Address": "शिपिंग पता",
    "Payment Method": "भुगतान विधि",
    "Order Summary": "ऑर्डर सारांश",
    Total: "कुल:",
    "Pay & Place Order": "भुगतान करें और ऑर्डर करें",
  };

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
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.wholesalePrice,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((val) => val.trim() === "")) {
      alert("Please fill out all address fields.");
      return;
    }
    alert("✅ Order placed successfully!");
    localStorage.removeItem("cart");
    setCart([]);
  };

  const translate = (key) => (isHindi ? translations[key] || key : key);

  return (
    <>
    <div className="bg-green-50">
      {/* Navbar */}
      <nav className="bg-green-600 text-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 w-10 rounded-full shadow"
              />
              <Link to="/" className="text-2xl font-bold text-white">
                AgriBasket
              </Link>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <Link to="/" className="hover:text-green-200">
                Home
              </Link>
              <Link to="/services" className="hover:text-green-200">
                Services
              </Link>
              <Link to="/about" className="hover:text-green-200">
                About
              </Link>
              <Link to="/contactus" className="hover:text-green-200">
                Contact
              </Link>
              <button
                onClick={() => setIsHindi(!isHindi)}
                className="bg-white text-green-800 px-3 py-1 rounded hover:bg-green-100"
              >
                <Languages className="inline mr-1" /> {isHindi ? "English" : "हिंदी"}
              </button>
              {userRole !== null ? (
                <button
                  onClick={async () => {
                    await signOut(auth);
                    window.location.reload();
                  }}
                  className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-500 px-4 py-1 rounded hover:bg-green-600"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
              
      {/* Checkout Content */}
      <div className="max-w-6xl mx-auto p-6 mt-8 bg-green-50 rounded-lg ">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          🧾 {translate("Checkout")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded shadow-md border border-green-200"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                🏠 {translate("Shipping Address")}
              </h3>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border rounded mb-3"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded mb-3"
              />
              <div className="flex gap-4 mb-3">
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border rounded mb-3"
              />
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full Address"
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                💳 {translate("Payment Method")}
              </h3>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
            >
              {translate("Pay & Place Order")}
            </button>
          </form>

          <div className="bg-white p-6 rounded shadow border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🛒 {translate("Order Summary")}
            </h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="divide-y text-sm mb-4">
                {cart.map((item) => (
                  <li key={item.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-green-900">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.quantity} × ₹{item.wholesalePrice}
                        </div>
                      </div>
                      <div className="font-semibold text-green-700">
                        ₹{item.quantity * item.wholesalePrice}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <hr className="my-4" />
            <div className="text-right font-bold text-lg text-green-800">
              {translate("Total:")} ₹{total}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Checkout;
