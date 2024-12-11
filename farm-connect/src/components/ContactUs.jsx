import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
  };

  const content = {
    en: {
      title: "Contact Us",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      messageLabel: "Your Message",
      placeholderName: "Enter your name",
      placeholderEmail: "Enter your email",
      placeholderPhone: "Enter your phone number",
      placeholderMessage: "Write your message here",
      submitButton: "Submit",
      contactInfo: "Contact Information",
      phoneNumber: "+91 8899099790",
      emailAddress: "agribasket.ab@gmail.com",
      address: "123 Green Street, Eco City, Nature State 12345"
    },
    hi: {
      title: "संपर्क करें",
      nameLabel: "आपका नाम",
      emailLabel: "ईमेल पता",
      phoneLabel: "फोन नंबर",
      messageLabel: "आपका संदेश",
      placeholderName: "अपना नाम दर्ज करें",
      placeholderEmail: "अपना ईमेल दर्ज करें",
      placeholderPhone: "अपना फोन नंबर दर्ज करें",
      placeholderMessage: "यहां अपना संदेश लिखें",
      submitButton: "प्रस्तुत करें",
      contactInfo: "संपर्क जानकारी",
      phoneNumber: "+91 (555) 123-4567",
      emailAddress: "समर्थन@उदाहरण.कॉम",
      address: "123 हरी सड़क, पर्यावरण शहर, प्रकृति राज्य 12345"
    }
  };

  const text = content[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert("Form submission functionality to be implemented");
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 shadow-md flex justify-center items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-green-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-200">
            About
          </Link>
          <Link to="/services" className="hover:text-green-200">
            Services
          </Link>
          <Link to="/contactus" className="hover:text-green-200">
            Contact
          </Link>
          <button
            onClick={toggleLanguage}
            className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition"
          >
            {language === "en" ? "हिंदी में पढ़ें" : "Read in English"}
          </button>
        </div>
      </nav>

      {/* Contact Page Content */}
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-6 h-full">
          <div className="grid md:grid-cols-2 gap-8 h-full">
            {/* Contact Form */}
            <div className="bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
              <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                {text.title}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {text.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder={text.placeholderName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {text.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder={text.placeholderEmail}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {text.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder={text.placeholderPhone}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    {text.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder={text.placeholderMessage}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-medium py-2 rounded-lg shadow-md hover:bg-green-700 transition"
                  >
                    {text.submitButton}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                {text.contactInfo}
              </h2>
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <Phone className="text-green-600 flex-shrink-0" />
                  <a 
                    href={`tel:${text.phoneNumber.replace(/\s+/g, '')}`} 
                    className="text-gray-700 hover:text-green-600 transition truncate"
                  >
                    {text.phoneNumber}
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <Mail className="text-green-600 flex-shrink-0" />
                  <a 
                    href={`mailto:${text.emailAddress}`} 
                    className="text-gray-700 hover:text-green-600 transition truncate"
                  >
                    {text.emailAddress}
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-4">
                  <MapPin className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 truncate">{text.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;