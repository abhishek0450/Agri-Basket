import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Products = () => {
  const [language, setLanguage] = useState("en");
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
  };

  const content = {
    en: {
      navbar: {
        home: "Home",
        about: "About",
        services: "Services",
        contact: "Contact",
        toggleLang: "हिंदी में पढ़ें",
      },
      header: {
        title: "Shop",
      },
      filter: {
        all: "All",
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
        buy: "Buy Now",
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
      },
      header: {
        title: "दुकान",
      },
      filter: {
        all: "सभी",
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
        buy: "अभी खरीदें",
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
    <div className="bg-green-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 shadow-md flex justify-center items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-green-200">{text.navbar.home}</Link>
          <Link to="/about" className="hover:text-green-200">{text.navbar.about}</Link>
          <Link to="/services" className="hover:text-green-200">{text.navbar.services}</Link>
          <Link to="/contactus" className="hover:text-green-200">{text.navbar.contact}</Link>
          <button
            onClick={toggleLanguage}
            className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition"
          >
            {text.navbar.toggleLang}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center text-center py-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {text.header.title}
          </h1>
          {/* Filter Options */}
          <div className="mb-6 w-48">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border rounded-md p-2 w-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="All">{text.filter.all}</option>
              <option value="Vegetables">{text.filter.vegetables}</option>
              <option value="Fruits">{text.filter.fruits}</option>
              <option value="Dairy">{text.filter.dairy}</option>
              <option value="Pulses">{text.filter.pulses}</option>
              <option value="Seeds">{text.filter.seeds}</option>
            </select>
          </div>
        </header>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col transition-transform transform hover:shadow-lg hover:-translate-y-1 border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image || "https://placehold.co/150"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4 transition-transform transform hover:scale-105"
                />
                {/* Category Badge */}
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {product.name}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="text-gray-900 font-medium">
                    {text.product.price}: <span className="text-green-600">₹{product.wholesalePrice}</span>
                  </p>
                  <p>
                    {text.product.per} {product.unit} (
                    <span className="font-medium">{text.product.minOrder}: {product.minOrder} {product.unit}</span>)
                  </p>
                  <p>
                    {text.product.freshness}: <span className="text-green-600">{product.freshness} {text.product.days}</span>
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition duration-300 shadow-sm">
                {text.product.buy}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <Link to="/" className="hover:text-green-300">{text.navbar.home}</Link>
            <Link to="/about" className="hover:text-green-300">{text.navbar.about}</Link>
            <Link to="/services" className="hover:text-green-300">{text.navbar.services}</Link>
            <Link to="/contactus" className="hover:text-green-300">{text.navbar.contact}</Link>
          </div>
          <p className="mb-4">{text.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default Products;