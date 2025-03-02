import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const [language, setLanguage] = useState("en");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [productType, setProductType] = useState("");
  const navigate = useNavigate();

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
      form: {
        title: "Add Product",
        productName: "Product Name",
        price: "Price",
        quantity: "Quantity",
        minOrder: "Minimum Order",
        productType: "Product Type",
        selectType: "Select Product Type",
        imageUrl: "Image URL",
        submit: "Add Product",
        vegetables: "Vegetables",
        fruits: "Fruits",
        dairy: "Dairy",
        pulses: "Pulses",
        seeds: "Seeds",
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
      form: {
        title: "उत्पाद जोड़ें",
        productName: "उत्पाद का नाम",
        price: "मूल्य",
        quantity: "मात्रा",
        minOrder: "न्यूनतम ऑर्डर",
        productType: "उत्पाद प्रकार",
        selectType: "उत्पाद प्रकार चुनें",
        imageUrl: "छवि URL",
        submit: "उत्पाद जोड़ें",
        vegetables: "सब्जियाँ",
        fruits: "फल",
        dairy: "डेयरी",
        pulses: "दालें",
        seeds: "बीज",
      },
      footer: {
        copyright: "© 2024 एग्री-बास्केट। सर्वाधिकार सुरक्षित।",
      },
    },
  };

  const text = content[language];

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert(
        language === "en"
          ? "You must be logged in to add a product."
          : "उत्पाद जोड़ने के लिए आपको लॉग इन करना होगा।"
      );
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name,
        price,
        quantity,
        minOrder,
        image: imageUrl,
        type: productType,
        farmerId: user.uid,
      });

      alert(language === "en" ? "Product Added!" : "उत्पाद जोड़ा गया!");
      setName("");
      setPrice("");
      setQuantity("");
      setImageUrl("");
      setMinOrder("");
      setProductType("");
    } catch (error) {
      alert(
        language === "en"
          ? "Error adding product: " + error.message
          : "उत्पाद जोड़ने में त्रुटि: " + error.message
      );
    }
  };

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
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {text.form.title}
          </h2>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {text.form.productName}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={text.form.productName}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {text.form.price}
              </label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={text.form.price}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {text.form.quantity}
              </label>
              <input
                type="text"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={text.form.quantity}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="minOrder"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {text.form.minOrder}
              </label>
              <input
                type="text"
                id="minOrder"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                placeholder={text.form.minOrder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="productType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {text.form.productType}
              </label>
              <select
                id="productType"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="" disabled>
                  {text.form.selectType}
                </option>
                <option value="Vegetables">{text.form.vegetables}</option>
                <option value="Fruits">{text.form.fruits}</option>
                <option value="Dairy">{text.form.dairy}</option>
                <option value="Pulses">{text.form.pulses}</option>
                <option value="Seeds">{text.form.seeds}</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {text.form.imageUrl}
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder={text.form.imageUrl}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            {imageUrl && (
              <div className="mb-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out"
            >
              {text.form.submit}
            </button>
          </form>
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

export default AddProduct;