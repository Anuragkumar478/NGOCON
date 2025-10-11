import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegisterNGO from "./pages/NGO/RegisterNGO";
import NGOList from "./pages/NGO/NGOList";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ngos/register" element={<RegisterNGO />} />
        <Route path="/ngos/list" element={<NGOList />} />
      </Routes>
    </Router>
  );
}
