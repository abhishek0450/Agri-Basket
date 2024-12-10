
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmConnect from "./FarmConnect";
import AboutUs from "./components/AboutUs";
import LearnMore from "./components/LearnMore";
import ContactUs from "./components/ContactUs";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FarmConnect />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/LearnMore" element={<LearnMore />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
