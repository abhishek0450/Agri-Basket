import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      <header className="bg-green-100 text-center py-16">
        <h1 className="text-5xl font-extrabold text-green-900 mb-6">
          About Us
        </h1>
        <p className="text-xl text-green-700">
          Empowering Farmers and Businesses through Technology and Innovation
        </p>
      </header>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            About Agri Basket
          </h2>
          <p className="text-green-700 text-lg mb-6">
            Agri Basket is a digital B2B market solution that brings together farmers and industrial buyers. We drive agricultural transactions through our digital platform in combination with our service partnership network. Agri Basket accommodates online payment between buyer & seller, product quality check options, and end-to-end logistic services. Agri Basket is not just a broker; we empower farmers to effortlessly market their crops via our platform.
          </p>
          <p className="text-green-700 text-lg">
            From our agri-business experience, we understand small farm owners face challenges disproportionate to their size and resources. Technology providers mainly focus on the needs of large enterprises. At Agri Basket, we aim to level the playing field by creating a two-way channel for sellers and buyers to communicate and facilitate buying and selling of their products.
          </p>
        </div>
      </section>

      
      <section className="bg-green-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">
            Vision
          </h2>
          <p className="text-green-700 text-lg italic">
            “To empower FARMERS by delivering TRANSPARENCY and TRACEABILITY in the agri value chain through technology.”
          </p>
          <p className="text-green-700 text-lg mt-6">
            We aspire to become India’s largest E-Mandi and replicate it across global markets.
          </p>
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
          <p className="mb-4">© 2024 Agri Basket. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
