import  { useState } from "react";

const AboutUs = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
  };

  const content = {
    en: {
      title: "About Us",
      tagline: "Empowering Farmers and Businesses through Technology and Innovation",
      aboutTitle: "About Farm Connect",
      aboutText1:
        "Farm Connect is a digital B2B market solution that brings together farmers and industrial buyers. We drive agricultural transactions through our digital platform in combination with our service partnership network. Farm Connect accommodates online payment between buyer & seller, product quality check options, and end-to-end logistic services. Farm Connect is not just a broker; we empower farmers to effortlessly market their crops via our platform.",
      aboutText2:
        "From our agri-business experience, we understand small farm owners face challenges disproportionate to their size and resources. Technology providers mainly focus on the needs of large enterprises. At Farm Connect, we aim to level the playing field by creating a two-way channel for sellers and buyers to communicate and facilitate buying and selling of their products.",
      visionTitle: "Vision",
      visionText:
        "“To empower FARMERS by delivering TRANSPARENCY and TRACEABILITY in the agri value chain through technology.”",
      visionGoal:
        "We aspire to become India’s largest E-Mandi and replicate it across global markets.",
    },
    hi: {
      title: "हमारे बारे में",
      tagline: "किसानों और व्यवसायों को प्रौद्योगिकी और नवाचार के माध्यम से सशक्त बनाना",
      aboutTitle: "एग्री बास्केट  के बारे में",
      aboutText1:
        "एग्री बास्केट  एक डिजिटल B2B बाजार समाधान है जो किसानों और औद्योगिक खरीदारों को एक साथ लाता है। हम अपने सेवा साझेदारी नेटवर्क के संयोजन में अपने डिजिटल प्लेटफॉर्म के माध्यम से कृषि लेनदेन को बढ़ावा देते हैं। एग्री बास्केट  खरीदार और विक्रेता के बीच ऑनलाइन भुगतान, उत्पाद गुणवत्ता जांच विकल्प और एंड-टू-एंड लॉजिस्टिक सेवाएं प्रदान करता है। एग्री बास्केट  सिर्फ एक ब्रोकर नहीं है; हम किसानों को अपने प्लेटफॉर्म के माध्यम से अपने उत्पादों का आसानी से विपणन करने का अधिकार देते हैं।",
      aboutText2:
        "हमारे कृषि व्यवसाय अनुभव से, हम समझते हैं कि छोटे किसानों को उनके आकार और संसाधनों के अनुपात में चुनौतियों का सामना करना पड़ता है। प्रौद्योगिकी प्रदाता मुख्य रूप से बड़े उद्यमों की जरूरतों पर ध्यान केंद्रित करते हैं। एग्री बास्केट  में, हम विक्रेताओं और खरीदारों के लिए एक दो-तरफा चैनल बनाकर समान अवसर प्रदान करने का लक्ष्य रखते हैं।",
      visionTitle: "दृष्टि",
      visionText:
        "“किसानों को पारदर्शिता और ट्रेसबिलिटी प्रदान करके सशक्त बनाना।”",
      visionGoal:
        "हम भारत के सबसे बड़े ई-मार्केट बनने की आकांक्षा रखते हैं और इसे वैश्विक बाजारों में दोहराने की योजना बनाते हैं।",
    },
  };

  const text = content[language];

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 shadow-md flex justify-center items-center">
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-green-200">
            Home
          </a>
          <a href="#" className="hover:text-green-200">
            About
          </a>
          <a href="#" className="hover:text-green-200">
            Services
          </a>
          <a href="#" className="hover:text-green-200">
            Contact
          </a>
          <button
            onClick={toggleLanguage}
            className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition"
          >
            {language === "en" ? "हिंदी में पढ़ें" : "Read in English"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-green-100 text-center py-16">
        <h1 className="text-5xl font-extrabold text-green-900 mb-6">
          {text.title}
        </h1>
        <p className="text-xl text-green-700">{text.tagline}</p>
      </header>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            {text.aboutTitle}
          </h2>
          <p className="text-green-700 text-lg mb-6">{text.aboutText1}</p>
          <p className="text-green-700 text-lg">{text.aboutText2}</p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-green-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">
            {text.visionTitle}
          </h2>
          <p className="text-green-700 text-lg italic">{text.visionText}</p>
          <p className="text-green-700 text-lg mt-6">{text.visionGoal}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="hover:text-green-300">
              Home
            </a>
            <a href="#" className="hover:text-green-300">
              About
            </a>
            <a href="#" className="hover:text-green-300">
              Services
            </a>
            <a href="#" className="hover:text-green-300">
              Contact
            </a>
          </div>
          <p className="mb-4">© 2024 Farm Connect. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
