import { useState, useEffect, useCallback } from "react";
import { useRazorpay } from "react-razorpay";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import toast from "react-hot-toast";

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
  const { Razorpay } = useRazorpay();

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

  const saveOrder = async (paymentId = null, paymentStatus = "Pending") => {
    try {
      const orderData = {
        userId: auth.currentUser?.uid || "guest",
        userEmail: auth.currentUser?.email || "guest",
        items: cart,
        totalAmount: total,
        shippingDetails: form,
        paymentMethod: paymentMethod,
        paymentId: paymentId,
        status: "Order Placed",
        paymentStatus: paymentStatus,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);
      return true;
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save order: " + error.message);
      return false;
    }
  };

  const handlePayment = useCallback(() => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, 
      amount: total * 100, 
      currency: "INR",
      name: "Agri-Basket",
      description: "Transaction",
      image: "https://example.com/your_logo",
      handler: async function (response) {
        const saved = await saveOrder(response.razorpay_payment_id, "Paid");
        if (saved) {
          toast.success("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          localStorage.removeItem("cart");
          setCart([]);
        }
      },
      prefill: {
        name: form.name,
        email: auth.currentUser?.email || "user@example.com",
        contact: form.phone,
      },
      notes: {
        address: "Agri-Basket Office",
      },
      theme: {
        color: "#166534",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      toast.error("Payment Failed: " + response.error.description);
    });
    rzp1.open();
  }, [Razorpay, total, form, cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).some((val) => val.trim() === "")) {
      toast.error("Please fill out all address fields.");
      return;
    }

    if (paymentMethod === "online") {
      handlePayment();
    } else {
      const saved = await saveOrder(null, "Pending (COD)");
      if (saved) {
        toast.success("Order placed successfully via Cash on Delivery!");
        localStorage.removeItem("cart");
        setCart([]);
      }
    }
  };

  return (
    <>
    <div className="bg-green-50 min-h-screen">
              
      {/* Checkout Content */}
      <div className="max-w-6xl mx-auto p-6 mt-8 bg-green-50 rounded-lg ">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          🧾 Checkout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded shadow-md border border-green-200"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                🏠 Shipping Address
              </h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-green-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-full p-3 border rounded mt-3 focus:ring-2 focus:ring-green-500"
              />
              <textarea
                name="address"
                placeholder="Full Address (House No, Street, Area)"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 border rounded mt-3 focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                💳 Payment Method
              </h3>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="form-radio text-green-600"
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="form-radio text-green-600"
                  />
                  <span>Online Payment (Razorpay)</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition"
            >
              {paymentMethod === "online" ? "Pay Now" : "Place Order"}
            </button>
          </form>

          <div className="bg-white p-6 rounded shadow-md border border-green-200 h-fit">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              🛒 Order Summary
            </h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between border-b pb-2"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span className="font-bold">
                      ₹{item.wholesalePrice * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 pt-4 border-t flex justify-between text-xl font-bold text-green-900">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
