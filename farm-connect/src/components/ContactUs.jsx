import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert("Form submission functionality to be implemented");
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">

      {/* Contact Page Content */}
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-6 h-full">
          <div className="grid md:grid-cols-2 gap-8 h-full">
            {/* Contact Form */}
            <div className="bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
              <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
                Contact Us
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Write your message here"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-green-600 text-white shadow-lg rounded-lg p-6 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Contact Information
              </h2>
              <div className="flex items-center space-x-4">
                <Phone className="w-8 h-8 text-green-200" />
                <div>
                  <p className="font-semibold">Phone Number</p>
                  <p>+91 8899099790</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-8 h-8 text-green-200" />
                <div>
                  <p className="font-semibold">Email Address</p>
                  <p>agribasket.ab@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-8 h-8 text-green-200" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p>123 Green Street, Eco City, Nature State 12345</p>
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
