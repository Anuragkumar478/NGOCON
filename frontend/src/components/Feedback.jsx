import React from 'react'
import { addFeedback,getNGODetails } from '../services/api'

const Feedback = () => {
    const [selectedNgo, setSelectedNgo] = React.useState(null); 
    const[feedbackForm, setFeedbackForm] = React.useState({
        name: "",
        email: "",
        rating:"",
        comment: ""
    });
    const handleFeedbackSubmit = async (e) => {
    if(!selectedNgo){
        return;
    }
    await addFeedback(selectedNgo._id, feedbackForm);
    const updatedNgo= await getNGODetails(selectedNgo._id);
    setSelectedNgo(updatedNgo);
    setFeedbackForm({
        name: "",
        email: "",
        rating:"",
        comment: ""
    });
    alert("Feedback submitted successfully!");
  }

  return (
    <div>
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
          
 
  )
}

export default Feedback
