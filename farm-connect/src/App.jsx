
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FarmConnect from "./FarmConnect";
import AboutUs from "./components/AboutUs";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FarmConnect />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
