import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-white to-orange-50 p-6 cursor-default">
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border-t-8 border-teal-500 animate-fadeIn">
          <h2 className="text-3xl font-bold text-teal-600 mb-3">
            🎉 Thank You!
          </h2>
          <p className="text-gray-600">
            Your feedback has been submitted successfully. We appreciate you
            taking the time to reach out 💚
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-teal-500 to-orange-400 text-white rounded-full hover:from-orange-500 hover:to-teal-500 transition transform hover:scale-105 cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-orange-50 p-6 cursor-default">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg border-t-8 border-teal-500 animate-fadeIn cursor-default">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
          Contact & Feedback
        </h1>
        <p className="text-center text-gray-500 mb-8">
          We’d love to hear from you! Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 cursor-default">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition cursor-text"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition cursor-text"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Message / Feedback
            </label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none cursor-text"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-teal-500 to-orange-400 hover:from-orange-500 hover:to-teal-500 transition transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Send Message ✉️
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600 cursor-default">
          <p>📞 +91 98765 43210</p>
          <p>
            📧{" "}
            <a
              href="mailto:support@helpinghands.org"
              className="text-teal-600 hover:underline cursor-pointer"
            >
              support@helpinghands.org
            </a>
          </p>
          <p>🏢 123 Hope Street, New Delhi, India</p>
        </div>
      </div>
    </div>
  );
}
