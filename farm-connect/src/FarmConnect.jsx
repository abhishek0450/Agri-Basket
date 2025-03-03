import { useState, useEffect } from "react";
import logo from "./assets/vegetables.png";
import { Languages, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const translations = {
  "Agri Basket": "फार्म कनेक्ट",
  "Home": "होम",
  "Services": "सेवाएं",
  "About": "हमारे बारे में",
  "About Us": "हमारे बारे में",
  "Contact": "संपर्क करें",
  "Shop Now": "अभी खरीदें",
  "Learn More": "और जानें",
  "Add Product": "उत्पाद जोड़ें",
  "Fresh Farm Produce Direct to Your Doorstep": "ताजा फार्म उत्पाद सीधे आपके दरवाजे पर",
  "Supporting Local Farmers, Delivering Quality Produce": "स्थानीय किसानों का समर्थन, गुणवत्ता उत्पाद वितरित करना",
  "Our Product Categories": "हमारी उत्पाद श्रेणियाँ",
  "Fresh Fruits": "ताजे फल",
  "Fresh Vegetables": "ताजी सब्जियां",
  "Farm Fresh Dairy": "फार्म ताजा डेयरी",
  "View Fruits": "फल देखें",
  "View Vegetables": "सब्जियां देखें",
  "View Dairy": "डेयरी देखें",
  "🍎 Fresh Apples - ₹120/kg": "🍎 ताजे सेब - ₹120/kg",
  "🍌 Ripe Bananas - ₹50/kg": "🍌 पके केले - ₹50/kg",
  "🍊 Juicy Oranges - ₹100/kg": "🍊 रसदार संतरे - ₹100/kg",
  "🥕 Crisp Carrots - ₹40/kg": "🥕 गाजर - ₹40/kg",
  "🥬 Fresh Spinach - ₹20/bundle": "🥬 ताजा पालक - ₹20/गुच्छा",
  "🍅 Ripe Tomatoes - ₹50/kg": "🍅 पके टमाटर - ₹50/kg",
  "🥛 Raw Milk - ₹40/liter": "🥛 कच्चा दूध - ₹40/लीटर",
  "🧀 Artisan Cheese - ₹30/pack": "🧀 पनीर - ₹30/पैक",
  "🥣 Fresh Yogurt - ₹40/jar": "🥣 ताजा दही - ₹40/जार",
  "© 2024 Agri Basket. All Rights Reserved.": "© 2024 फार्म कनेक्ट। सर्वाधिकार सुरक्षित।",
};

const FarmConnect = () => {
  const [isHindi, setIsHindi] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleTranslation = () => {
    const newLanguageState = !isHindi;
    setIsHindi(newLanguageState);
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-translate");
      el.textContent = newLanguageState ? (translations[key] || key) : key;
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const translate = (key) => (isHindi ? translations[key] || key : key);

  return (
    <div className="bg-green-50 min-h-screen">
      <nav className="bg-green-600 text-white p-4 shadow-md relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Farm Connect Logo" className="h-10 w-10 shadow-2xl rounded" />
            <span data-translate="Agri Basket" className="text-2xl font-bold">
              {translate("Agri Basket")}
            </span>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={handleTranslation}
              className="bg-white text-green-800 px-2 py-1 rounded shadow hover:bg-green-100 transition"
            >
              <Languages />
            </button>
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" data-translate="Home" className="hover:text-green-200">
              {translate("Home")}
            </Link>
            <Link to="/services" data-translate="Services" className="hover:text-green-200">
              {translate("Services")}
            </Link>
            <Link to="/about" data-translate="About" className="hover:text-green-200">
              {translate("About Us")}
            </Link>
            <Link to="/contactus" data-translate="Contact" className="hover:text-green-200">
              {translate("Contact")}
            </Link>
            <button
              onClick={handleTranslation}
              className="bg-white text-green-800 px-4 py-1 rounded shadow hover:bg-green-100 transition flex items-center space-x-2"
            >
              <Languages />
              <span>{isHindi ? "English" : "हिंदी"}</span>
            </button>
            {userRole !== null ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 border-2 border-white px-4 py-1 rounded shadow hover:bg-green-600 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-green-600 md:hidden z-50">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link to="/" data-translate="Home" className="hover:text-green-200" onClick={toggleMenu}>
                {translate("Home")}
              </Link>
              <Link to="/services" data-translate="Services" className="hover:text-green-200" onClick={toggleMenu}>
                {translate("Services")}
              </Link>
              <Link to="/about" data-translate="About Us" className="hover:text-green-200" onClick={toggleMenu}>
                {translate("About Us")}
              </Link>
              <Link to="/contactus" data-translate="Contact" className="hover:text-green-200" onClick={toggleMenu}>
                {translate("Contact")}
              </Link>
              {userRole !== null ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-1 rounded shadow hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-500 px-4 py-1 rounded shadow hover:bg-blue-600 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

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
          <h1
            className="text-5xl font-extrabold text-green-900 mb-6"
            data-translate="Fresh Farm Produce Direct to Your Doorstep"
          >
            {translate("Fresh Farm Produce Direct to Your Doorstep")}
          </h1>
          <p
            className="text-xl text-green-700 mb-8"
            data-translate="Supporting Local Farmers, Delivering Quality Produce"
          >
            {translate("Supporting Local Farmers, Delivering Quality Produce")}
          </p>
          <div className="space-x-4 flex justify-center flex-wrap">
            <Link
              to="/products"
              className="bg-green-600 m-2 border-2 border-green-900 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
              data-translate="Shop Now"
            >
              {translate("Shop Now")}
            </Link>
            <Link
              to="/LearnMore"
              className="bg-white m-2 text-green-600 px-8 py-3 rounded-full border-2 border-green-600 hover:bg-green-100 transition"
              data-translate="Learn More"
            >
              {translate("Learn More")}
            </Link>
            {userRole === "farmer" && (
              <Link
                to="/addproduct"
                className="bg-yellow-100 border-2 border-yellow-700 text-yellow-700 m-2 px-8 py-3 rounded-full hover:bg-yellow-200 transition"
                data-translate="Add Product"
              >
                {translate("Add Product")}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section id="/services" className="container mx-auto px-4 py-16">
        <h2
          className="text-3xl font-bold text-center mb-12 text-green-900"
          data-translate="Our Product Categories"
        >
          {translate("Our Product Categories")}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
    <img
      src="https://assets.cntraveller.in/photos/60ba23b90f3a5367ec9fe85b/16:9/w_960,c_limit/Farm-fresh-produce-1366x768.jpg"
      alt="Fresh Fruits"
      className="w-full h-64 object-cover"
    />
    <div className="p-6">
      <h3
        className="text-2xl font-bold text-green-800 mb-4"
        data-translate="Fresh Fruits"
      >
        {translate("Fresh Fruits")}
      </h3>
      <ul className="space-y-2 text-green-700">
        <li data-translate="🍎 Fresh Apples - ₹120/kg (min. 10 kg)">
          {translate("🍎 Fresh Apples - ₹120/kg (min. 10 kg)")}
        </li>
        <li data-translate="🍌 Ripe Bananas - ₹50/kg (min. 10 kg)">
          {translate("🍌 Ripe Bananas - ₹50/kg (min. 10 kg)")}
        </li>
        <li data-translate="🍊 Juicy Oranges - ₹100/kg (min. 10 kg)">
          {translate("🍊 Juicy Oranges - ₹100/kg (min. 10 kg)")}
        </li>
      </ul>
      <Link
        to="/fruits"
        className="mt-6 block text-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
        data-translate="View Fruits"
      >
        {translate("View Fruits")}
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
      <h3
        className="text-2xl font-bold text-green-800 mb-4"
        data-translate="Fresh Vegetables"
      >
        {translate("Fresh Vegetables")}
      </h3>
      <ul className="space-y-2 text-green-700">
        <li data-translate="🥕 Crisp Carrots - ₹40/kg (min. 10 kg)">
          {translate("🥕 Crisp Carrots - ₹40/kg (min. 10 kg)")}
        </li>
        <li data-translate="🥬 Fresh Spinach - ₹20/bundle (min. 20 bundles)">
          {translate("🥬 Fresh Spinach - ₹20/bundle (min. 20 bundles)")}
        </li>
        <li data-translate="🍅 Ripe Tomatoes - ₹50/kg (min. 10 kg)">
          {translate("🍅 Ripe Tomatoes - ₹50/kg (min. 10 kg)")}
        </li>
      </ul>
      <Link
        to="/vegetables"
        className="mt-6 block text-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
        data-translate="View Vegetables"
      >
        {translate("View Vegetables")}
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
      <h3
        className="text-2xl font-bold text-green-800 mb-4"
        data-translate="Farm Fresh Dairy"
      >
        {translate("Farm Fresh Dairy")}
      </h3>
      <ul className="space-y-2 text-green-700">
        <li data-translate="🥛 Raw Milk - ₹40/liter (min. 100 liters)">
          {translate("🥛 Raw Milk - ₹40/liter (min. 100 liters)")}
        </li>
        <li data-translate="🧀 Artisan Cheese - ₹30/pack (min. 20 packs)">
          {translate("🧀 Artisan Cheese - ₹30/pack (min. 20 packs)")}
        </li>
        <li data-translate="🥣 Fresh Yogurt - ₹40/jar (min. 20 jars)">
          {translate("🥣 Fresh Yogurt - ₹40/jar (min. 20 jars)")}
        </li>
      </ul>
      <Link
        to="/dairyproducts"
        className="mt-6 block text-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
        data-translate="View Dairy"
      >
        {translate("View Dairy")}
      </Link>
    </div>
  </div>
</div>
      </section>

      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#home" className="hover:text-green-300" data-translate="Home">
              {translate("Home")}
            </a>
            <a href="#/services" className="hover:text-green-300" data-translate="Services">
              {translate("Services")}
            </a>
            <a href="#about" className="hover:text-green-300" data-translate="About Us">
              {translate("About Us")}
            </a>
            <a href="#contact" className="hover:text-green-300" data-translate="Contact">
              {translate("Contact")}
            </a>
          </div>
          <p
            className="mb-4"
            data-translate="© 2024 Agri Basket. All Rights Reserved."
          >
            {translate("© 2024 Agri Basket. All Rights Reserved.")}
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-white hover:text-green-300" data-translate="Facebook">
              Facebook
            </a>
            <a href="#" className="text-white hover:text-green-300" data-translate="Instagram">
              Instagram
            </a>
            <a href="#" className="text-white hover:text-green-300" data-translate="Twitter">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FarmConnect;