import { useState } from 'react'
import './App.css'
import HomePage from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Router,Routes,Route } from 'react-router-dom'

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-ngo" element={<NGORegister />} />
        <Route path="/ngos" element={<NGOList />} />

      </Routes>
    
  );

}

export default App;
