import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NGOList = () => {
  const [ngos, setNgos] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedNGOs = JSON.parse(localStorage.getItem("ngos")) || [];
    setNgos(storedNGOs);
  }, []);

  const handleLogin = (email) => {
    navigate(`/ngo-login?email=${encodeURIComponent(email)}`);
  };

  // When Donate button is clicked
  const handleDonateClick = (ngo) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please login as a donor to donate.");
      navigate("/login");
      return;
    }
    if (user.role !== "donor") {
      alert("Only donors can donate!");
      return;
    }

    setSelectedNGO(ngo);
    setShowPayment(true);
  };

  // Simulate payment completion
  const handlePayment = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const donation = {
      ngoName: selectedNGO.name,
      amount,
      date: new Date().toISOString().split("T")[0],
      status: "Completed",
    };

    // Save to donor profile
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === user.username ? { ...u, donations: [...(u.donations || []), donation] } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify({ ...user, donations: [...(user.donations || []), donation] }));

    // Save to NGO donors list
    const ngos = JSON.parse(localStorage.getItem("ngos")) || [];
    const updatedNGOs = ngos.map((n) =>
      n.email === selectedNGO.email
        ? {
            ...n,
            donors: [
              ...(n.donors || []),
              { name: user.name, amount, date: donation.date },
            ],
          }
        : n
    );
    localStorage.setItem("ngos", JSON.stringify(updatedNGOs));

    alert(`🎉 Thank you ${user.name}! Your ₹${amount} donation to ${selectedNGO.name} was successful.`);

    setShowPayment(false);
    setAmount("");
    setSelectedNGO(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 py-16 px-8">
      {/* Title + Register Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 container mx-auto">
        <h2 className="text-4xl font-extrabold text-teal-700 text-center md:text-left mb-6 md:mb-0">
          Registered NGOs
        </h2>
        <Link
          to="/register-ngo"
          className="bg-gradient-to-r from-teal-500 to-orange-400 text-white px-8 py-3 rounded-full shadow-lg hover:from-orange-500 hover:to-teal-500 transform hover:scale-105 transition-all duration-300"
        >
          ➕ Register as NGO
        </Link>
      </div>

      {/* NGO Cards */}
      {ngos.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-xl mb-4">No NGOs registered yet.</p>
          <Link
            to="/register-ngo"
            className="inline-block bg-gradient-to-r from-teal-500 to-orange-400 text-white px-6 py-3 rounded-full shadow-md hover:from-orange-500 hover:to-teal-500 transform hover:scale-105 transition"
          >
            Be the First to Register 🚀
          </Link>
        </div>
      ) : (
        <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
          {ngos.map((ngo, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-500 to-orange-400 text-white p-5 text-center">
                <h3 className="text-2xl font-bold">{ngo.name}</h3>
                <p className="italic text-sm">{ngo.category}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 text-gray-700">
                <p><strong>📍 Address:</strong> {ngo.address}</p>
                <p><strong>🎯 Aim:</strong> {ngo.aim}</p>
                <p><strong>📧 Email:</strong> {ngo.email}</p>
                <blockquote className="italic text-teal-600 border-l-4 border-teal-400 pl-4 mt-4">
                  "{ngo.quote || "Together, we can make a difference."}"
                </blockquote>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-around border-t p-4 bg-gray-50 gap-2">
                <button className="bg-gray-100 border border-teal-400 text-teal-600 px-4 py-2 rounded-full hover:bg-teal-50 transition">
                  About
                </button>
                <button
                  onClick={() => handleDonateClick(ngo)}
                  className="bg-gradient-to-r from-teal-500 to-orange-400 text-white px-4 py-2 rounded-full hover:from-orange-500 hover:to-teal-500 transition transform hover:scale-105"
                >
                 Donate
                </button>
                <button className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full hover:bg-teal-200 transition">
                  Volunteer
                </button>
                <button
                  onClick={() => handleLogin(ngo.email)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-full hover:bg-yellow-500 transition"
                >
                  Login
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dummy Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">
              Donate to {selectedNGO?.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Enter amount to donate securely 💖
            </p>

            <input
              type="number"
              placeholder="Enter amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />

            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-teal-500 to-orange-400 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Pay ₹{amount || 0}
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="mt-4 w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGOList;
