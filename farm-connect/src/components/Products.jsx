import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Cart from "../components/Cart";
import logo from "../assets/vegetables.png";
import { Languages} from "lucide-react";

const Products = () => {
  const [language, setLanguage] = useState("en");
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
  };

  const toggleMobileCart = () => {
    setShowMobileCart(!showMobileCart);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const addToCart = (product) => {
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

  const content = {
    en: {
      navbar: {
        home: "Home",
        about: "About",
        services: "Services",
        contact: "Contact",
        toggleLang: "हिंदी में पढ़ें",
        viewCart: "View Cart",
      },
      header: {
        title: "Fresh Products",
        subtitle: "Premium quality agricultural products at wholesale prices",
      },
      filter: {
        all: "All Products",
        vegetables: "Vegetables",
        fruits: "Fruits",
        dairy: "Dairy",
        pulses: "Pulses",
        seeds: "Seeds",
      },
      product: {
        price: "Wholesale Price",
        minOrder: "Min. Order",
        freshness: "Freshness",
        available: "Available",
        buy: "Add to Cart",
        per: "per",
        days: "days",
      },
      footer: {
        copyright: "© 2024 Agri-Basket. All Rights Reserved.",
      },
    },
    hi: {
      navbar: {
        home: "होम",
        about: "हमारे बारे में",
        services: "सेवाएं",
        contact: "संपर्क करें",
        toggleLang: "Read in English",
        viewCart: "कार्ट देखें",
      },
      header: {
        title: "ताज़े उत्पाद",
        subtitle: "थोक मूल्य पर प्रीमियम गुणवत्ता के कृषि उत्पाद",
      },
      filter: {
        all: "सभी उत्पाद",
        vegetables: "सब्जियाँ",
        fruits: "फल",
        dairy: "डेयरी",
        pulses: "दालें",
        seeds: "बीज",
      },
      product: {
        price: "थोक मूल्य",
        minOrder: "न्यूनतम ऑर्डर",
        freshness: "ताजगी",
        available: "उपलब्ध",
        buy: "कार्ट में जोड़ें",
        per: "प्रति",
        days: "दिन",
      },
      footer: {
        copyright: "© 2024 एग्री-बास्केट। सर्वाधिकार सुरक्षित।",
      },
    },
  };

  const text = content[language];

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
      {/* Enhanced Navbar */}
      <nav className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg border-b-2 border-green-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo / Brand */}
            <Link to="/" className="text-white text-2xl font-bold flex items-center space-x-2 hover:text-green-100 transition-colors">
              <img src={logo} alt="Farm Connect Logo" className="h-10 w-10 shadow-2xl rounded" />
              <span>AgriBasket</span>
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-8 text-white font-medium">
              <Link to="/" className="hover:text-green-200 transition-colors duration-200 border-b-2 border-transparent hover:border-green-200 pb-1">
                {text.navbar.home}
              </Link>
              <Link to="/about" className="hover:text-green-200 transition-colors duration-200 border-b-2 border-transparent hover:border-green-200 pb-1">
                {text.navbar.about}
              </Link>
              <Link to="/services" className="hover:text-green-200 transition-colors duration-200 border-b-2 border-transparent hover:border-green-200 pb-1">
                {text.navbar.services}
              </Link>
              <Link to="/contactus" className="hover:text-green-200 transition-colors duration-200 border-b-2 border-transparent hover:border-green-200 pb-1">
                {text.navbar.contact}
              </Link>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button
              onClick={toggleLanguage}
              className="bg-white text-green-800 px-2 py-1 rounded shadow hover:bg-green-100 transition"
            >
              <Languages />
            </button>
              

              {/* Mobile Cart Button */}
              <button
                onClick={toggleMobileCart}
                className="relative md:hidden text-white hover:text-green-200 transition-colors p-2"
              >
                <span className="text-2xl">🛒</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-white hover:text-green-200 transition-colors p-2"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className={`w-full h-0.5 bg-current transform transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                  <div className={`w-full h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-full h-0.5 bg-current transform transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-green-700 border-t border-green-600 py-4">
              <div className="flex flex-col space-y-3 px-4">
                <Link to="/" className="text-white hover:text-green-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                  {text.navbar.home}
                </Link>
                <Link to="/about" className="text-white hover:text-green-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                  {text.navbar.about}
                </Link>
                <Link to="/services" className="text-white hover:text-green-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                  {text.navbar.services}
                </Link>
                <Link to="/contactus" className="text-white hover:text-green-200 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                  {text.navbar.contact}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        
        <header className="text-center py-12 mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            {text.header.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {text.header.subtitle}
          </p>

          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="appearance-none border-2 border-green-300 rounded-full px-6 py-3 pr-10 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 text-gray-700 font-medium cursor-pointer transition-all duration-200"
              >
                <option value="All">{text.filter.all}</option>
                <option value="Vegetables">{text.filter.vegetables}</option>
                <option value="Fruits">{text.filter.fruits}</option>
                <option value="Dairy">{text.filter.dairy}</option>
                <option value="Pulses">{text.filter.pulses}</option>
                <option value="Seeds">{text.filter.seeds}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        
        <div className="flex gap-8">
         
          <div className={`grid gap-6 flex-grow ${cart.length > 0 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={product.image || "https://placehold.co/300x200"}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {product.category}
                  </span>
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-green-600 text-xs font-bold px-2 py-1 rounded-full">
                    🌱 Fresh
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between items-center bg-green-50 rounded-lg p-2">
                      <span className="font-medium">{text.product.price}:</span>
                      <span className="text-green-700 font-bold text-lg">₹{product.wholesalePrice}</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                      <span>{text.product.per} {product.unit}</span>
                      <span className="font-medium text-gray-700">
                        {text.product.minOrder}: {product.minOrder} {product.unit}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-blue-50 rounded-lg p-2">
                      <span>{text.product.freshness}:</span>
                      <span className="text-blue-600 font-medium">
                        {product.freshness} {text.product.days}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  onClick={() => addToCart(product)}
                >
                  {text.product.buy}
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Cart Sidebar */}
          <div className="hidden lg:block">
            {cart.length > 0 && (
              <div className="sticky top-24">
                <Cart cart={cart} setCart={setCart} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Cart Modal */}
      {showMobileCart && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="text-3xl mr-2">🛒</span>
                Your Cart
              </h2>
              <button
                onClick={toggleMobileCart}
                className="text-red-500 hover:text-red-700 font-bold text-xl bg-red-50 hover:bg-red-100 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              >
                ✕
              </button>
            </div>
            <Cart cart={cart} setCart={setCart} />
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center space-x-8 mb-8">
              <Link to="/" className="hover:text-green-300 transition-colors duration-200 flex items-center space-x-1">
                <span>🏠</span>
                <span>{text.navbar.home}</span>
              </Link>
              <Link to="/about" className="hover:text-green-300 transition-colors duration-200 flex items-center space-x-1">
                <span>👥</span>
                <span>{text.navbar.about}</span>
              </Link>
              <Link to="/services" className="hover:text-green-300 transition-colors duration-200 flex items-center space-x-1">
                <span>🔧</span>
                <span>{text.navbar.services}</span>
              </Link>
              <Link to="/contactus" className="hover:text-green-300 transition-colors duration-200 flex items-center space-x-1">
                <span>📞</span>
                <span>{text.navbar.contact}</span>
              </Link>
            </div>
            <div className="border-t border-green-700 pt-6">
              <p className="text-green-200 text-lg">{text.footer.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;