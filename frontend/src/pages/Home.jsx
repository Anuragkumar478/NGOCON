import default_image from "../assets/default.png"
import React, { useEffect, useState } from "react";
import {
  getAllNGOs,
  getNGOsByCategory,
  getNGODetails,
  addFeedback,
} from "../services/api";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Payment from "../components/Payment";


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

  // Load all NGOs initially
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-brown-50 to-green-500-50">
      {/* Hero Section */}
      <Hero />
      {/* Stats Section */}
      <Stats />

      {/* NGO Categories Section */}
       <section className="py-20  min-h-screen bg-gradient-to-b bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover NGOs working across various sectors to create positive change in society
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-2xl"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300 hover:shadow-lg"
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* NGO Cards Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {ngos.map((ngo) => (
              <div
                key={ngo._id}
               
                className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden group border border-gray-100"
              >
              
                <div className="relative overflow-hidden">
                  <img
  src={ngo?.profileImage || default_image}
  alt="NGO"
  onError={(e) => {
    e.target.onerror = null; // prevents infinite loop
    e.target.src = default_image;
  }}
/>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <span className="text-sm font-semibold text-pink-600">{ngo.category}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    {ngo.verifiedByAuthority && (
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                        Verified Organization
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-pink-800 line-clamp-2 leading-tight">{ngo.name}</h3>
                  </div>                  
                  <p className="text-white text-sm mb-5 line-clamp-3 leading-relaxed">{ngo.description}</p>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-3 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-yellow-300">{ngo.address || "Multiple Locations"}  </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate text-pink-500">{ngo.website || "Website coming soon"}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 text-lg">
                        {"★".repeat(Math.round(ngo.averageRating || 0))}
                        {"☆".repeat(5 - Math.round(ngo.averageRating || 0))}
                      </div>
                      <span className="ml-3 text-sm text-gray-600 font-medium">
                        ({ngo.feedbacks?.length || 0} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewDetails(ngo._id)}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDonate(ngo._id)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                    >
                      Support
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {ngos.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">No NGOs Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">Try selecting a different category or check back later for new organizations.</p>
            </div>
          )}
        </div>
      </section>

      {/* NGO Details Modal */}
      {selectedNgo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              <img
                src=
                 
                 {selectedNgo?.profileImage || "https://via.placeholder.com/200"}
                  
                
                alt={selectedNgo.name}
                className="w-full h-72 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedNgo(null)}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">{selectedNgo.name}</h2>
                  <div className="flex items-center space-x-3">
                    <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {selectedNgo.category}
                    </span>
                    {selectedNgo.verifiedByAuthority && (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Verified Organization
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-600">
                    {selectedNgo.averageRating?.toFixed(1) || "0"}/5
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {selectedNgo.feedbacks?.length || 0} reviews
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-lg mb-8 leading-relaxed border-l-4 border-pink-400 pl-4">{selectedNgo.description}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-6 h-6 mr-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{selectedNgo.address || "Address not provided"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-6 h-6 mr-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="font-medium">{selectedNgo.localContactNumber || "Contact not provided"}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-6 h-6 mr-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium truncate">{selectedNgo.website || "Website not provided"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-6 h-6 mr-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="font-medium">{selectedNgo.email}</span>
                  </div>
                </div>
              </div>

              {/* Donation CTA */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-8 border border-pink-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Support This Cause</h3>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">Your donation can help make a real difference. Every contribution counts towards creating positive change in our community.</p>
                <button
                  onClick={() => handleDonate(selectedNgo._id)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                
                  Donate Now
                </button>
              </div>

              {/* Feedback Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-8">Community Feedback</h3>
                
                {selectedNgo.feedbacks?.length > 0 ? (
                  <div className="space-y-6 mb-8">
                    {selectedNgo.feedbacks.map((f, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-pink-200 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-semibold text-gray-800 text-lg">{f.userName || f.name}</p>
                            <p className="text-sm text-gray-500 mt-1">{f.email}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-400 text-xl mr-1">{"★".repeat(f.rating)}</span>
                            <span className="text-gray-300 text-xl">{"★".repeat(5 - f.rating)}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{f.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl mb-8 border border-gray-200">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-3">No Feedback Yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto">Be the first to share your experience and help others learn about this organization.</p>
                  </div>
                )}

                {/* Feedback Form */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-6">Share Your Experience</h4>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={feedbackForm.name}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Your Email</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={feedbackForm.email}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">Your Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                          className={`text-3xl transition duration-300 ${
                            star <= feedbackForm.rating ? "text-yellow-400 transform scale-110" : "text-gray-300 hover:text-yellow-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Your Feedback</label>
                    <textarea
                      placeholder="Share your experience with this organization..."
                      value={feedbackForm.comment}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                      rows="4"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition resize-none"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleFeedbackSubmit}
                    disabled={!feedbackForm.name || !feedbackForm.rating || !feedbackForm.comment}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Submit Feedback
                  </button>
                </div>
               
              </div>
            </div>
             
          </div>
         
        </div>
      )}
 
    </div>
   
  );
};

export default Home;