import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegisterNGO from "./pages/NGO/RegisterNGO";
import NGOList from "./pages/NGO/NGOList";
import Register from "./pages/Donor/Register";
import Login from "./pages/Donor/Login";
import RegisterVolunteer from "./pages/Volunteer/Register";
import LoginVolunteer from "./pages/Volunteer/Login";
import CampaignDetails from "./pages/NGO/CampaignDetails";
import CreateCampaign from "./pages/NGO/CreateCampaign";
import CampaignList from "./pages/NGO/CampaignList";
import NGOLogin from "./pages/NGO/NGOLogin";
import CampaignUtilization from "./pages/Donor/CampaignUtilization";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-24"> {/* Add top padding so content doesn't hide under fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ngos/register" element={<RegisterNGO />} />
          <Route path="/ngos/list" element={<NGOList />} />
          <Route path="/ngos/login" element={<NGOLogin />} />
          <Route path="/donor/register" element={<Register />} />
          <Route path="/donor/login" element={<Login />} />
           <Route path="/volunteer/register" element={<RegisterVolunteer />} />
        <Route path="/volunteer/login" element={<LoginVolunteer />} />
         <Route path="/campaigns" element={<CampaignList />} />
  <Route path="/campaigns/create" element={<CreateCampaign />} />
  <Route path="/campaigns/:id" element={<CampaignDetails />} />
  <Route path="/campaigns/:id/utilization" element={<CampaignUtilization />} />

        </Routes>
      </div>
    </Router>
  );
}
