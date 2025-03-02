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
        title: "All Products",
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
        price: "Price",
        minOrder: "Min Order",
        buy: "Buy",
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
        title: "सभी उत्पाद",
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
        price: "मूल्य",
        minOrder: "न्यूनतम ऑर्डर",
        buy: "खरीदें",
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
    return product.type === filter;
  });

  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 shadow-md flex justify-center items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-green-200">
            {text.navbar.home}
          </Link>
          <Link to="/about" className="hover:text-green-200">
            {text.navbar.about}
          </Link>
          <Link to="/services" className="hover:text-green-200">
            {text.navbar.services}
          </Link>
          <Link to="/contactus" className="hover:text-green-200">
            {text.navbar.contact}
          </Link>
          <button
            onClick={toggleLanguage}
            className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition"
          >
            {text.navbar.toggleLang}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        <header className="flex flex-col items-center justify-center text-center py-16 px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 mb-4">
            {text.header.title}
          </h1>
        </header>

        {/* Filter Options */}
        <div className="mb-4 text-center">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          >
            <option value="All">{text.filter.all}</option>
            <option value="Vegetables">{text.filter.vegetables}</option>
            <option value="Fruits">{text.filter.fruits}</option>
            <option value="Dairy">{text.filter.dairy}</option>
            <option value="Pulses">{text.filter.pulses}</option>
            <option value="Seeds">{text.filter.seeds}</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap justify-center">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg m-4 p-4 w-48 text-center"
            >
              <img
                src={product.image || "https://placehold.co/150"}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700">
                {text.product.price}: ₹{product.price}
              </p>
              <p className="text-gray-700">
                {text.product.minOrder}: {product.minOrder}
              </p>
              <button className="mt-6 block text-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
                {text.product.buy}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white p-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">{text.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default Products;