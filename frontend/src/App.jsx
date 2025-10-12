import { useState } from 'react'
import './App.css'
import HomePage from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Router,Routes,Route } from 'react-router-dom'
import NGORegister from './components/NGORegister'
import NGOList from './components/NGOList'
import NGOLogin from './components/NGOLogin'
import NGODashboard from './components/NGODashboard'
import Profile from './components/Profile'
import ContactUs from './components/ContactUs'


import TrackDonation from './components/TrackDonation'
 
function App() {
  return (
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-ngo" element={<NGORegister />} />
        <Route path="/ngos" element={<NGOList />} />
         <Route path="/ngo-login" element={<NGOLogin />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track-donation" element={<TrackDonation />} />
        <Route path="/contact" element={<ContactUs />} />

      </Routes>
    
  );

}

export default App;
