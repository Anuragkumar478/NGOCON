import React from 'react'

const Stats = () => {
  return (
    <div>
         <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 transform hover:scale-105 transition duration-300">
              <div className="text-4xl font-bold text-pink-500 mb-3">150+</div>
              <div className="text-gray-600 font-medium">Verified NGOs</div>
            </div>
            <div className="p-6 transform hover:scale-105 transition duration-300">
              <div className="text-4xl font-bold text-purple-500 mb-3">₹2.5M+</div>
              <div className="text-gray-600 font-medium">Funds Raised</div>
            </div>
            <div className="p-6 transform hover:scale-105 transition duration-300">
              <div className="text-4xl font-bold text-blue-500 mb-3">5,000+</div>
              <div className="text-gray-600 font-medium">Volunteers</div>
            </div>
            <div className="p-6 transform hover:scale-105 transition duration-300">
              <div className="text-4xl font-bold text-orange-500 mb-3">50+</div>
              <div className="text-gray-600 font-medium">Cities</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stats
