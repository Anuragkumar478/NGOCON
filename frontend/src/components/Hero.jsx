import React from 'react'
import { Link } from 'react-router-dom'
 import Payment from './Payment'
const Hero = () => {
  const ngo = {
  _id: "demo123",
  name: "Helping Hands NGO",
};

const user = {
  _id: "user123",
  name: "Anurag Kumar",
  email: "anurag@email.com",
};
  return (
    <div className='min-h-screen'>
     <section className="relative  min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white pt-24 pb-25 ">
  <div className="absolute inset-0 bg-black/30"></div>

  <div className="relative z-10 container mx-auto px-6 text-center">
    
    <h1 className="text-5xl font-extrabold mb-6 leading-tight">
      Empowering Change,
      <span className="block text-pink-400">One Heart at a Time</span>
    </h1>

    <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
      Support verified NGOs and become part of a movement that saves lives,
      uplifts communities, and shapes a better tomorrow.
    </p>

    <div className="flex justify-center gap-4">
      
      
     <Link to="/volunteer/register">
       <button className="border border-white px-8 py-3 text-lg rounded-full font-semibold hover:bg-white hover:text-gray-800 transition">
      
         Become a Volunteer
       </button>
     </Link>
     
    </div>

  </div>
</section>
    </div>
  )
}

export default Hero
