import { useState } from "react";

const services = [
  {
    nameKey: "loan",
    descriptionKey: "loanDesc",
    image: "https://www.tatacapital.com/blog/wp-content/uploads/2023/09/the-pros-and-cons-of-taking-a-loan-against-agricultural-land-in-india.jpg",
  },
  {
    nameKey: "insurance",
    descriptionKey: "insuranceDesc",
    image: "https://english.mathrubhumi.com/image/contentid/policy:1.7378113:1648261020/manuring%20farming%20worker%20(2).jpg?$p=725e92e&f=16x10&w=852&q=0.8",
  },
  {
    nameKey: "transport",
    descriptionKey: "transportDesc",
    image: "https://images.hive.blog/p/qjrE4yyfw5pEPvDbJDzhdNXM7mjt1tbr2kM3X28F6SraZjRCEPBgzBEoYeV6NLotPGn1UvMqng9ochAdUjTgWmituVdDbYZLhQcNKFvjKZaUDhcDm8i4zanS?format=match&mode=fit",
  },
  {
    nameKey: "leasing",
    descriptionKey: "leasingDesc",
    image: "https://www.elease.com/wp-content/uploads/2020/05/agricultural-equipment-financing.jpg.webp",
  },
];

const Services = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
  };

  const content = {
    en: {
      title: "Our Services",
      loan: "Loan Services",
      loanDesc: "Get easy and quick loans with low interest rates to support your farming needs.",
      insurance: "Insurance Services",
      insuranceDesc: "Protect your crops and livestock with our comprehensive insurance plans.",
      transport: "Transport Services",
      transportDesc: "Efficient and reliable transport services to deliver your produce to the market.",
      leasing: "Asset Leasing",
      leasingDesc: "Lease farming equipment and machinery at affordable rates.",
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
    hi: {
      title: "हमारी सेवाएं",
      loan: "ऋण सेवाएं",
      loanDesc: "अपने कृषि आवश्यकताओं को पूरा करने के लिए कम ब्याज दरों के साथ आसान और त्वरित ऋण प्राप्त करें।",
      insurance: "बीमा सेवाएं",
      insuranceDesc: "हमारी व्यापक बीमा योजनाओं के साथ अपनी फसलों और पशुधन की सुरक्षा करें।",
      transport: "परिवहन सेवाएं",
      transportDesc: "अपने उत्पाद को बाजार तक पहुंचाने के लिए कुशल और विश्वसनीय परिवहन सेवाएं।",
      leasing: "संपत्ति पट्टे पर देना",
      leasingDesc: "किफायती दरों पर कृषि उपकरण और मशीनरी पट्टे पर लें।",
      home: "होम",
      about: "हमारे बारे में",
      services: "सेवाएं",
      contact: "संपर्क करें",
    },
  };

  const text = content[language];

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 shadow-md flex justify-center items-center">
        <div className="flex items-center space-x-6">
          <a href="/" className="hover:text-green-200">{text.home}</a>
          <a href="/about" className="hover:text-green-200">{text.about}</a>
          <a href="/services" className="hover:text-green-200">{text.services}</a>
          <a href="/contactus" className="hover:text-green-200">{text.contact}</a>
          <button
            onClick={toggleLanguage}
            className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition"
          >
            {language === "en" ? "हिंदी में पढ़ें" : "Read in English"}
          </button>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900">{text.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={service.image} 
                alt={text[service.nameKey]}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-4">{text[service.nameKey]}</h3>
                <p className="text-green-700">{text[service.descriptionKey]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="/" className="hover:text-green-300">{text.home}</a>
            <a href="/about" className="hover:text-green-300">{text.about}</a>
            <a href="/services" className="hover:text-green-300">{text.services}</a>
            <a href="/contactus" className="hover:text-green-300">{text.contact}</a>
          </div>
          <p className="mb-4">© 2024 Agri Basket. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;