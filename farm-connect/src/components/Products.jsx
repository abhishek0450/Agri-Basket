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
        minOrder: "min. order",
        freshness: "Freshness",
        available: "Available",
        buy: "Buy",
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
        buy: "खरीदें",
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
              className="border rounded-md p-2 w-full"
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col"
            >
              <div className="flex-grow mb-3">
                <img
                  src={product.image || "https://placehold.co/150"}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-center mb-2">{product.name}</h3>
                <div className="text-sm text-center">
                  <p className="mb-1 text-gray-700">
                    {text.product.price}: ₹{product.wholesalePrice}
                  </p>
                  <p className="mb-1 text-gray-600">
                    {text.product.per} {product.unit} ({text.product.minOrder}: {product.minOrder} {product.unit})
                  </p>
                  <p className="text-gray-600">
                    {text.product.freshness}: {product.freshness} {text.product.days}
                  </p>
                </div>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition duration-200">
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