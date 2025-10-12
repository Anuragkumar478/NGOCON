import React, { useEffect, useState } from "react";
import {
  getAllNGOs,
  getNGOsByCategory,
  getNGODetails,
  addFeedback,
} from "../services/api";

const Home = () => {
  const [ngos, setNgos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    rating: "",
    comment: "",
  });

  // 🧠 Load all NGOs initially
  useEffect(() => {
    fetchAllNgos();
  }, []);

  const fetchAllNgos = async () => {
    const data = await getAllNGOs();
    setNgos(data);
    setCategories(["All", ...new Set(data.map((n) => n.category))]);
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      fetchAllNgos();
    } else {
      const data = await getNGOsByCategory(category);
      setNgos(data);
    }
  };

  const handleViewDetails = async (ngoId) => {
    const data = await getNGODetails(ngoId);
    setSelectedNgo(data);
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedNgo) return;
    await addFeedback(selectedNgo._id, feedbackForm);
    const updatedNgo = await getNGODetails(selectedNgo._id);
    setSelectedNgo(updatedNgo);
    setFeedbackForm({ name: "", email: "", rating: "", comment: "" });
    alert("Feedback added successfully!");
  };

  const handleDonate = (ngoId) => {
    alert(`Redirecting to donation page for NGO: ${ngoId}`);
    // Implement donation logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 🎪 Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Connecting Hearts, 
            <span className="block text-yellow-300">Creating Impact</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hands with verified NGOs to make a difference. Donate, volunteer, and be the change you wish to see in the world.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:shadow-xl transition transform hover:-translate-y-1">
              Donate Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition">
              Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* 📊 Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Verified NGOs</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">₹2.5M+</div>
              <div className="text-gray-600">Funds Raised</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
              <div className="text-gray-600">Volunteers</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏷️ NGO Categories Section */}
      <section id="ngos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover NGOs working across various sectors to create positive change in society
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 🧩 NGO Cards Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {ngos.map((ngo) => (
              <div
                key={ngo._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      ngo.profileImage
                        ? `http://localhost:5000/${ngo.profileImage}`
                        : "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={ngo.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-sm font-semibold text-blue-600">{ngo.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{ngo.name}</h3>
                    {ngo.verifiedByAuthority && (
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold">
                        ✅ Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ngo.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-5">📍</span>
                      <span className="ml-2">{ngo.address || "Multiple Locations"}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-5">🌐</span>
                      <span className="ml-2 truncate">{ngo.website || "No website"}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.round(ngo.averageRating || 0))}
                        {"☆".repeat(5 - Math.round(ngo.averageRating || 0))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({ngo.feedbacks?.length || 0} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewDetails(ngo._id)}
                      className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                    >
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleDonate(ngo._id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
                    >
                      <span>Donate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {ngos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No NGOs Found</h3>
              <p className="text-gray-500">Try selecting a different category or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* 📝 NGO Details Modal */}
      {selectedNgo && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              <img
                src={
                  selectedNgo.profileImage
                    ? `http://localhost:5000/${selectedNgo.profileImage}`
                    : "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                }
                alt={selectedNgo.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedNgo(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-lg"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedNgo.name}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedNgo.category}
                    </span>
                    {selectedNgo.verifiedByAuthority && (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                        ✅ Verified NGO
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">
                    {selectedNgo.averageRating?.toFixed(1) || "0"}/5
                  </div>
                  <div className="text-sm text-gray-500">
                    ({selectedNgo.feedbacks?.length || 0} reviews)
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{selectedNgo.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="w-8 text-lg">📍</span>
                    <span className="font-medium">{selectedNgo.address || "Address not provided"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-8 text-lg">📞</span>
                    <span className="font-medium">{selectedNgo.localContactNumber || "Contact not provided"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="w-8 text-lg">🌐</span>
                    <span className="font-medium truncate">{selectedNgo.website || "Website not provided"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-8 text-lg">📧</span>
                    <span className="font-medium">{selectedNgo.email}</span>
                  </div>
                </div>
              </div>

              {/* Donation CTA */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Support This Cause</h3>
                <p className="text-gray-600 mb-4">Your donation can help make a real difference. Every contribution counts!</p>
                <button
                  onClick={() => handleDonate(selectedNgo._id)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  Donate Now
                </button>
              </div>

              {/* Feedback Section */}
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Community Feedback</h3>
                
                {selectedNgo.feedbacks?.length > 0 ? (
                  <div className="space-y-4 mb-8">
                    {selectedNgo.feedbacks.map((f, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-800">{f.userName || f.name}</p>
                            <p className="text-sm text-gray-500">{f.email}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-400 text-lg">{"★".repeat(f.rating)}</span>
                            <span className="text-gray-300 text-lg">{"★".repeat(5 - f.rating)}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{f.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl mb-8">
                    <div className="text-4xl mb-4">💬</div>
                    <p className="text-gray-500 text-lg">No feedback yet. Be the first to share your experience!</p>
                  </div>
                )}

                {/* Feedback Form */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Share Your Experience</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={feedbackForm.email}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Your Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                          className={`text-2xl ${
                            star <= feedbackForm.rating ? "text-yellow-400" : "text-gray-300"
                          } hover:text-yellow-400 transition`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Share your experience with this NGO..."
                    value={feedbackForm.comment}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  ></textarea>
                  <button
                    onClick={handleFeedbackSubmit}
                    disabled={!feedbackForm.name || !feedbackForm.rating || !feedbackForm.comment}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NGO Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Register Your NGO</h2>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mb-8">Join our platform to reach more donors and volunteers</p>
              
              {/* Registration form would go here */}
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">NGO Registration</h3>
                <p className="text-gray-500 mb-6">Registration form would be implemented here</p>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🦶 Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">❤️</span>
                </div>
                <span className="text-xl font-bold">ImpactBridge</span>
              </div>
              <p className="text-gray-400">
                Connecting NGOs with donors and volunteers to create meaningful social impact.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">NGOs</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 contact@impactbridge.org</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 123 Social Street, City</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ImpactBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;