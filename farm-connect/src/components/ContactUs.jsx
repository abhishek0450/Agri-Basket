import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"));
  };

  const content = {
    en: {
      title: "Contact Us",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      messageLabel: "Your Message",
      placeholderName: "Enter your name",
      placeholderEmail: "Enter your email",
      placeholderMessage: "Write your message here",
      submitButton: "Submit",
    },
    hi: {
      title: "संपर्क करें",
      nameLabel: "आपका नाम",
      emailLabel: "ईमेल पता",
      messageLabel: "आपका संदेश",
      placeholderName: "अपना नाम दर्ज करें",
      placeholderEmail: "अपना ईमेल दर्ज करें",
      placeholderMessage: "यहां अपना संदेश लिखें",
      submitButton: "प्रस्तुत करें",
    },
  };

  const text = content[language];

  return (
    <div className="bg-green-50 min-h-screen">
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

      {/* Contact Form */}
      <div className="flex items-center justify-center mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
            {text.title}
          </h1>
          <form className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {text.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                placeholder={text.placeholderName}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
      </div>
    </div>
  );
};

export default ContactUs;
