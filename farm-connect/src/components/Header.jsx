import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import logo from "../assets/vegetables.png";

const Header = ({ userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Farm Connect Logo" className="h-10 w-10 shadow-2xl rounded" />
          <span className="text-2xl font-bold">
            Agri Basket
          </span>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-green-200">
            Home
          </Link>
          <Link to="/services" className="hover:text-green-200">
            Services
          </Link>
          <Link to="/about" className="hover:text-green-200">
            About Us
          </Link>
          <Link to="/contactus" className="hover:text-green-200">
            Contact
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
            <Link to="/" className="hover:text-green-200" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/services" className="hover:text-green-200" onClick={toggleMenu}>
              Services
            </Link>
            <Link to="/about" className="hover:text-green-200" onClick={toggleMenu}>
              About Us
            </Link>
            <Link to="/contactus" className="hover:text-green-200" onClick={toggleMenu}>
              Contact
            </Link>
            {userRole !== null ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-500 px-4 py-1 rounded shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 border-2 border-white px-4 py-1 rounded shadow hover:bg-green-600 transition"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
