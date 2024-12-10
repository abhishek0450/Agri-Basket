
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmConnect from "./FarmConnect";
import AboutUs from "./components/AboutUs";
import LearnMore from "./components/LearnMore";
import ContactUs from "./components/ContactUs";
import "./index.css";
import Vegetables from "./components/Vegetables";
import Fruits from "./components/Fruits";
import Diary from "./components/Dairy";
import Shop from "./components/Shop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FarmConnect />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/LearnMore" element={<LearnMore />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/dairyproduts" element={<Diary />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>

    </Router>
  );
}

export default App;
