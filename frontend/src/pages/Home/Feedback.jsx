import React, { useEffect, useState } from "react";
import {
  getAllNGOs,
  getNGOsByCategory,
  getNGODetails,
  addFeedback,
} from "../../services/api";

const Feedback = () => {
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
  )
}

export default Feedback;
