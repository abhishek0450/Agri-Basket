import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import { auth } from "../../firebase";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  if (cart.length === 0) return null;

  const updateCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const increaseQuantity = (id, step) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + step } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id, step) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id && item.quantity > step
          ? { ...item, quantity: item.quantity - step }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this item?");
    if (confirmed) {
      const updatedCart = cart.filter((item) => item.id !== id);
      updateCart(updatedCart);
      toast.success("Item removed from cart");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.wholesalePrice,
    0
  );

  return (
    <div className="w-80 bg-white shadow-md rounded-lg p-6 h-fit sticky top-28 self-start border border-green-200">
      <h2 className="text-xl font-bold mb-4 text-green-700">🛒 Cart</h2>

      <ul className="divide-y text-sm">
        {cart.map((item) => (
          <li key={item.id} className="py-2 space-y-1">
            <div className="flex justify-between items-start">
              <div className="font-medium">{item.name}</div>
              <div className="text-green-700 font-semibold">
                ₹{item.quantity * item.wholesalePrice}
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-700">
              <div>
                {item.quantity} × {item.unit}
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => decreaseQuantity(item.id, item.minOrder)}
                  className="px-2 py-0.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  −
                </button>
                <button
                  onClick={() => increaseQuantity(item.id, item.minOrder)}
                  className="px-2 py-0.5 bg-green-100 text-green-600 rounded hover:bg-green-200"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 ml-2 underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <hr className="my-4 border-t" />
<div className="text-right font-bold text-lg text-green-800">
  Total: ₹{total}
</div>

<button
  onClick={() => {
    if (!auth.currentUser) {
      toast.error("Please login to checkout");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  }}
  className="block w-full mt-4 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
>
  Proceed to Checkout
</button>

    </div>
  );
};

export default Cart;
