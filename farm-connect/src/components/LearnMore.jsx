import React, { useState } from "react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  const [language, setLanguage] = useState("en");

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
      welcome: {
        title: "Welcome to Agri-Basket",
        tagline: "Buy and sell your Agri produce online (Buyers meet Farmers) – Sell your produce directly to buyers without middlemen and make more money from your farm produce.",
        description: "It’s evident that India has one of the largest agricultural markets around the world, which is why it becomes important to have a service, which can connect the farmers all over the country and provide them with a platform to sell their produce directly to the buyers.",
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
      welcome: {
        title: "एग्री-बास्केट में आपका स्वागत है",
        tagline: "अपनी कृषि उपज ऑनलाइन खरीदें और बेचें (खरीदार किसान से मिलते हैं) – अपनी उपज सीधे खरीदारों को बेचें और अपनी कृषि उपज से अधिक पैसा कमाएं।",
        description: "यह स्पष्ट है कि भारत दुनिया के सबसे बड़े कृषि बाजारों में से एक है, यही कारण है कि एक सेवा होना महत्वपूर्ण हो जाता है, जो पूरे देश के किसानों को जोड़ सके और उन्हें खरीदारों को सीधे अपनी उपज बेचने के लिए एक मंच प्रदान कर सके।",
      },
    },
  };

  const text = content[language];

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
          <Link to="#" className="hover:text-green-200">
            {text.navbar.services}
          </Link>
          <Link to="#" className="hover:text-green-200">
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
            {text.welcome.title}
          </h1>
          <p className="text-lg md:text-xl text-green-700 font-medium mb-6 max-w-3xl">
            {text.welcome.tagline}
          </p>
          <p className="text-base md:text-lg text-green-600 max-w-3xl leading-relaxed">
            {text.welcome.description}
          </p>
        </header>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white p-8 ">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Agri-Basket. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;