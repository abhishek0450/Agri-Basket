import { useState } from 'react';
import { Home, ShoppingCart, Truck } from 'lucide-react';

const translations = {
  "Farm Connect": "फार्म कनेक्ट",
  "Home": "होम",
  "Products": "उत्पाद",
  "About": "हमारे बारे में",
  "Contact": "संपर्क करें",
  "Fresh Farm Produce Direct to Your Doorstep": "ताजा फार्म उत्पाद सीधे आपके दरवाजे पर",
  "Supporting Local Farmers, Delivering Quality Produce": "स्थानीय किसानों का समर्थन, गुणवत्ता उत्पाद वितरित करना",
  "Quality Guaranteed": "गुणवत्ता की गारंटी",
  "Fair Prices": "उचित मूल्य",
  "Direct Connection": "प्रत्यक्ष संबंध",
  "Freshest produce directly from local farms": "स्थानीय खेतों से सीधे ताजा उत्पाद",
  "Competitive pricing supporting local farmers": "स्थानीय किसानों का समर्थन करने वाली प्रतिस्पर्धात्मक मूल्य निर्धारण",
  "Connect directly with local agricultural producers": "स्थानीय कृषि उत्पादकों से सीधे जुड़ें",
  "Our Product Categories": "हमारी उत्पाद श्रेणियाँ",
  "Fresh Fruits": "ताजे फल",
  "Fresh Vegetables": "ताजी सब्जियां",
  "Farm Fresh Dairy": "फार्म ताजा डेयरी",
  "View Fruits": "फल देखें",
  "View Vegetables": "सब्जियां देखें",
  "View Dairy": "डेयरी देखें",
  "© 2024 Farm Connect. All Rights Reserved.": "© 2024 फार्म कनेक्ट। सर्वाधिकार सुरक्षित।",
};

const FarmConnect = () => {
  const [isHindi, setIsHindi] = useState(false);

  const handleTranslation = () => {
    setIsHindi(!isHindi);
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-translate');
      el.textContent = isHindi ? key : translations[key] || key;
    });
  };

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Translation Button */}
      <button
        onClick={handleTranslation}
        className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
      >
        {isHindi ? "Translate to English" : "Translate to Hindi"}
      </button>

      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <Home color="white" size={24} />
          <h1 className="text-2xl font-bold" data-translate="Farm Connect">Farm Connect</h1>
        </div>
        <div className="space-x-6">
          <a href="#home" className="hover:text-green-200" data-translate="Home">Home</a>
          <a href="#products" className="hover:text-green-200" data-translate="Products">Products</a>
          <a href="#about" className="hover:text-green-200" data-translate="About">About</a>
          <a href="#contact" className="hover:text-green-200" data-translate="Contact">Contact</a>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingCart color="white" size={24} />
          <Truck color="white" size={24} />
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-green-100 text-center py-16">
        <h1 className="text-5xl font-extrabold text-green-900 mb-6" data-translate="Fresh Farm Produce Direct to Your Doorstep">
          Fresh Farm Produce Direct to Your Doorstep
        </h1>
        <p className="text-xl text-green-700 mb-8" data-translate="Supporting Local Farmers, Delivering Quality Produce">
          Supporting Local Farmers, Delivering Quality Produce
        </p>
        <div className="space-x-4">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition" data-translate="Shop Now">
            Shop Now
          </button>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full border-2 border-green-600 hover:bg-green-100 transition" data-translate="Learn More">
            Learn More
          </button>
        </div>
      </section>

      {/* Product Categories */}
      <section id="products" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900" data-translate="Our Product Categories">
          Our Product Categories
        </h2>

        <div className="grid grid-cols-3 gap-8">
          {/* Fruits Category */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img 
              src="/api/placeholder/400/300" 
              alt="Fresh Fruits" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4" data-translate="Fresh Fruits">Fresh Fruits</h3>
              <ul className="space-y-2 text-green-700">
                <li data-translate="🍎 Fresh Apples - $2.50/kg">🍎 Fresh Apples - $2.50/kg</li>
                <li data-translate="🍌 Ripe Bananas - $1.80/kg">🍌 Ripe Bananas - $1.80/kg</li>
                <li data-translate="🍊 Juicy Oranges - $3.20/kg">🍊 Juicy Oranges - $3.20/kg</li>
              </ul>
              <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition" data-translate="View Fruits">
                View Fruits
              </button>
            </div>
          </div>

          {/* Vegetables Category */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img 
              src="/api/placeholder/400/300" 
              alt="Fresh Vegetables" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4" data-translate="Fresh Vegetables">Fresh Vegetables</h3>
              <ul className="space-y-2 text-green-700">
                <li data-translate="🥕 Crisp Carrots - $1.80/kg">🥕 Crisp Carrots - $1.80/kg</li>
                <li data-translate="🥬 Fresh Spinach - $2.00/bundle">🥬 Fresh Spinach - $2.00/bundle</li>
                <li data-translate="🍅 Ripe Tomatoes - $1.50/kg">🍅 Ripe Tomatoes - $1.50/kg</li>
              </ul>
              <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition" data-translate="View Vegetables">
                View Vegetables
              </button>
            </div>
          </div>

          {/* Dairy Category */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img 
              src="/api/placeholder/400/300" 
              alt="Farm Fresh Dairy" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4" data-translate="Farm Fresh Dairy">Farm Fresh Dairy</h3>
              <ul className="space-y-2 text-green-700">
                <li data-translate="🥛 Raw Milk - $4.00/liter">🥛 Raw Milk - $4.00/liter</li>
                <li data-translate="🧀 Artisan Cheese - $6.50/pack">🧀 Artisan Cheese - $6.50/pack</li>
                <li data-translate="🥣 Fresh Yogurt - $3.20/jar">🥣 Fresh Yogurt - $3.20/jar</li>
              </ul>
              <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition" data-translate="View Dairy">
                View Dairy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#home" className="hover:text-green-300" data-translate="Home">Home</a>
            <a href="#products" className="hover:text-green-300" data-translate="Products">Products</a>
            <a href="#about" className="hover:text-green-300" data-translate="About Us">About Us</a>
            <a href="#contact" className="hover:text-green-300" data-translate="Contact">Contact</a>
          </div>
          <p className="mb-4" data-translate="© 2024 Farm Connect. All Rights Reserved.">© 2024 Farm Connect. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-white hover:text-green-300" data-translate="Facebook">Facebook</a>
            <a href="#" className="text-white hover:text-green-300" data-translate="Instagram">Instagram</a>
            <a href="#" className="text-white hover:text-green-300" data-translate="Twitter">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FarmConnect;
