import React from 'react'

const Hero = () => {
  return (
    <div>
     <section className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white pt-24 pb-25 ">
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
      <button className="bg-pink-500 px-8 py-3 text-lg rounded-full font-semibold hover:bg-pink-600 transition shadow-lg">
        Donate Now
      </button>

      <button className="border border-white px-8 py-3 text-lg rounded-full font-semibold hover:bg-white hover:text-gray-800 transition">
        Become a Volunteer
      </button>
    </div>

  </div>
</section>
    </div>
  )
}

export default Hero
