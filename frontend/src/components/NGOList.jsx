import React, { useEffect, useState } from "react";

const NGOList = () => {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const storedNGOs = JSON.parse(localStorage.getItem("ngos")) || [];
    setNgos(storedNGOs);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <h2 className="text-4xl font-bold text-center mb-12 text-teal-700">
        Registered NGOs
      </h2>

      {ngos.length === 0 ? (
        <p className="text-center text-gray-600">
          No NGOs registered yet. <br /> Be the first to{" "}
          <a href="/register-ngo" className="text-teal-600 underline">
            register here
          </a>
          .
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {ngos.map((ngo, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 transition"
            >
              <h3 className="text-2xl font-bold text-teal-700 mb-2">
                {ngo.name}
              </h3>
              <p><strong>Category:</strong> {ngo.category}</p>
              <p><strong>Username:</strong> {ngo.username}</p>
              <p><strong>Address:</strong> {ngo.address}</p>
              <p><strong>Aim:</strong> {ngo.aim}</p>
              <p><strong>Contact:</strong> {ngo.contact}</p>
              <p><strong>Email:</strong> {ngo.email}</p>

              <div className="flex justify-between mt-4">
                <button className="bg-gray-100 border border-teal-400 text-teal-600 px-4 py-2 rounded-full hover:bg-teal-50">
                  About
                </button>
                <button className="bg-gradient-to-r from-teal-500 to-orange-400 text-white px-4 py-2 rounded-full hover:from-orange-500 hover:to-teal-500">
                  Donate
                </button>
                <button className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full hover:bg-teal-200">
                  Volunteer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NGOList;
