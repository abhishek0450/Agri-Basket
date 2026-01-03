import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Cart from "../components/Cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showMobileCart, setShowMobileCart] = useState(false);

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const toggleMobileCart = () => {
    setShowMobileCart(!showMobileCart);
  };

  const navigate = useNavigate();

  const addToCart = (product) => {

    if (!auth.currentUser) {
    toast.error("Please login to add items to cart");
    navigate("/login");
    return; 
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.minOrder }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: product.minOrder }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (filter === "All") return true;
    return product.category === filter;
  });

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 min-h-screen flex flex-col">

      {/* Mobile Cart Button (Floating) */}
      <button
        onClick={toggleMobileCart}
        className="fixed bottom-4 right-4 md:hidden z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
      >
        <span className="text-2xl">🛒</span>
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
            {cart.length}
          </span>
        )}
      </button>

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row container mx-auto px-4 py-8 gap-8">
        {/* Product List Section */}
        <div className="w-full md:w-3/4">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-emerald-600 mb-4 drop-shadow-sm">
              Fresh Products
            </h1>
            <p className="text-lg text-green-700 font-medium">
              Premium quality agricultural products at wholesale prices
            </p>
          </header>

          {/* Filter Section */}
          <div className="flex justify-center mb-8">
            <div className="relative inline-block w-64">
              <select
                onChange={handleFilterChange}
                value={filter}
                className="block appearance-none w-full bg-white border border-green-300 hover:border-green-400 px-4 py-3 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline text-green-800 font-medium transition-all duration-200 cursor-pointer"
              >
                <option value="All">All Products</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Pulses">Pulses</option>
                <option value="Seeds">Seeds</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    {product.category}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
                  {product.name}
                </h3>

                <div className="space-y-2 mb-4 flex-grow">
                  <p className="text-gray-600 flex justify-between items-center">
                    <span className="font-medium">Wholesale Price:</span>
                    <span className="text-green-700 font-bold text-lg">
                      ₹{product.wholesalePrice} <span className="text-sm font-normal text-gray-500">per {product.unit}</span>
                    </span>
                  </p>
                  <p className="text-gray-600 flex justify-between text-sm">
                    <span>Min. Order:</span>
                    <span className="font-medium">{product.minOrder} {product.unit}</span>
                  </p>
                  <p className="text-gray-600 flex justify-between text-sm">
                    <span>Freshness:</span>
                    <span className="font-medium">{product.freshness} days</span>
                  </p>
                  <p className="text-gray-600 flex justify-between text-sm">
                    <span>Available:</span>
                    <span className="font-medium">{product.quantity} {product.unit}</span>
                  </p>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Add to Cart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section (Desktop) */}
        <div className="hidden md:block w-1/4">
          <div className="sticky top-24">
            <Cart cart={cart} setCart={setCart} />
          </div>
        </div>
      </div>

      {/* Mobile Cart Overlay */}
      {showMobileCart && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={toggleMobileCart}></div>
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="p-4">
              <button onClick={toggleMobileCart} className="mb-4 text-gray-500 hover:text-gray-800 float-right">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Cart cart={cart} setCart={setCart} />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">© 2024 Agri-Basket. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Products;
