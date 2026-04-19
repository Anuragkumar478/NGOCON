
import React, { useEffect, useState } from "react";
import {
  getAllNGOs,
  getNGOsByCategory,
  getNGODetails,
  addFeedback,
} from "../../services/api";


const Home_Section = () => {
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
    <div>
       <section className="py-20  min-h-screen bg-gradient-to-b from-brown-100 to-green-800-100">
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
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden group border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      ngo.profileImage
                        ? `http://localhost:5000/${ngo.profileImage}`
                        : "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={ngo.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition duration-700"
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
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2 leading-tight">{ngo.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">{ngo.description}</p>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-3 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{ngo.address || "Multiple Locations"}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">{ngo.website || "Website coming soon"}</span>
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
    </div>
  )
}

export default Home_Section
