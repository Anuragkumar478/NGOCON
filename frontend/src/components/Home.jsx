// src/components/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const ngos = [
        { name: "Helping Hands Foundation", img: "https://via.placeholder.com/300x200?text=Helping+Hands" },
        { name: "Green Earth Trust", img: "https://via.placeholder.com/300x200?text=Green+Earth" },
        { name: "Smile Foundation", img: "https://via.placeholder.com/300x200?text=Smile+Foundation" },
        { name: "Education for All", img: "https://via.placeholder.com/300x200?text=Education+for+All" },
    ];

    const testimonials = [
        { name: "Rahul Sharma", feedback: "CharitySphere makes donating easy, transparent, and trustworthy!" },
        { name: "Priya Mehta", feedback: "I can track my contributions and see the real impact — amazing platform!" },
        { name: "Anjali Kapoor", feedback: "A perfect platform to donate with transparency!" },
    ];

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const [verifiedNGOs, setVerifiedNGOs] = useState(0);
    const [donatedAmount, setDonatedAmount] = useState(0);
    const [activeCampaigns, setActiveCampaigns] = useState(0);

    useEffect(() => {
        let ngosCounter = 0, donationCounter = 0, campaignCounter = 0;
        const interval = setInterval(() => {
            if (ngosCounter < 500) ngosCounter += 5;
            if (donationCounter < 100000000) donationCounter += 500000;
            if (campaignCounter < 200) campaignCounter += 2;
            setVerifiedNGOs(Math.min(ngosCounter, 500));
            setDonatedAmount(Math.min(donationCounter, 100000000));
            setActiveCampaigns(Math.min(campaignCounter, 200));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-sans text-gray-800">

            {/* Navbar */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl animate-pulse">
                            CS
                        </div>
                        <span className="text-2xl font-bold text-teal-600">CharitySphere</span>
                    </div>
                    <nav className="space-x-6 font-medium text-lg">
                        <a href="#home" className="hover:text-teal-600 transition">Home</a>
                        <a href="#ngos" className="hover:text-teal-600 transition">NGOs</a>
                        <Link to="/login" className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-500 transition">Login</Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section
                id="home"
                className="relative bg-gradient-to-r from-teal-500 to-orange-400 text-white py-24 md:py-32"
            >
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-16">
                    {/* Left side text */}
                    <div className="md:w-1/2 space-y-6 text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight animate-fade-in">
                            Empower <span className="text-yellow-200">Change</span>, Donate with <span className="text-white">Trust</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                            Discover and support verified NGOs. Your donations make a direct, trackable impact in the community.
                        </p>
                        <div className="space-x-4">
                            <a
                                href="#ngos"
                                className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
                            >
                                View NGOs
                            </a>
                            <Link
                                to="/login"
                                className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-teal-600 transition transform hover:scale-105"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Right side image */}
                    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
                        <img
                            src="https://www.shutterstock.com/image-vector/happy-young-employees-giving-support-help-1702214980"
                            alt="People helping each other through donations"
                            className="w-96 md:w-[480px] drop-shadow-2xl rounded-3xl animate-fade-in"
                        />
                        {/* Decorative circle behind the image */}
                        <div className="absolute -z-10 w-96 h-96 bg-white/10 rounded-full blur-3xl top-1/2 -translate-y-1/2 right-0"></div>
                    </div>
                </div>
            </section>

            {/* Featured NGOs */}
            <section id="ngos" className="py-24 bg-gray-50">
                <h2 className="text-4xl font-bold text-center mb-16 text-teal-700">Featured NGOs</h2>
                <div className="grid md:grid-cols-4 gap-8 container mx-auto px-4">
                    {ngos.map((ngo, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 hover:shadow-2xl"
                        >
                            <img src={ngo.img} alt={ngo.name} className="w-full h-52 object-cover" />
                            <div className="p-6 text-center">
                                <h3 className="font-semibold text-xl mb-4">{ngo.name}</h3>
                                <button className="bg-gradient-to-r from-teal-500 to-orange-400 text-white px-6 py-2 rounded-full shadow-lg hover:from-orange-500 hover:to-teal-500 transition transform hover:scale-105">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white">
                <h2 className="text-4xl font-bold text-center mb-16 text-teal-700">How It Works</h2>
                <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-teal-50 p-10 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                        <div className="text-6xl mb-4">1️⃣</div>
                        <h3 className="font-semibold text-xl mb-2">NGO Registers & Gets Verified</h3>
                        <p>Admin verifies NGO documents ensuring trust and transparency.</p>
                    </div>
                    <div className="bg-orange-50 p-10 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                        <div className="text-6xl mb-4">2️⃣</div>
                        <h3 className="font-semibold text-xl mb-2">Donor Selects Cause</h3>
                        <p>Donors browse verified campaigns and choose projects to support.</p>
                    </div>
                    <div className="bg-yellow-50 p-10 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
                        <div className="text-6xl mb-4">3️⃣</div>
                        <h3 className="font-semibold text-xl mb-2">Donation Used & Proof Shown</h3>
                        <p>NGOs upload progress reports and proofs, ensuring transparency.</p>
                    </div>
                </div>
            </section>

            {/* Impact Counters */}
            <section className="py-24 bg-gradient-to-r from-orange-50 to-teal-50 text-center">
                <h2 className="text-4xl font-bold mb-12 text-teal-700">Impact So Far</h2>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16 text-center">
                    <div>
                        <div className="text-6xl font-bold text-teal-600 mb-2">👥 {verifiedNGOs}+</div>
                        <p>Verified NGOs</p>
                    </div>
                    <div>
                        <div className="text-6xl font-bold text-orange-500 mb-2">💰 ₹{(donatedAmount / 1000000).toFixed(1)} Cr+</div>
                        <p>Donated Transparently</p>
                    </div>
                    <div>
                        <div className="text-6xl font-bold text-teal-600 mb-2">🌱 {activeCampaigns}+</div>
                        <p>Active Campaigns</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white">
                <h2 className="text-4xl font-bold text-center mb-16 text-teal-700">What People Say</h2>
                <div className="container mx-auto max-w-2xl relative">
                    <div className="bg-teal-50 p-12 rounded-3xl shadow-lg transition-transform duration-500 transform translate-x-0">
                        <p className="italic text-lg mb-4">"{testimonials[currentTestimonial].feedback}"</p>
                        <h4 className="font-semibold text-right text-teal-600">- {testimonials[currentTestimonial].name}</h4>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-teal-600 text-white py-10 mt-12">
                <div className="container mx-auto text-center space-y-4">
                    <p>Contact: info@charitysphere.org | Phone: +91 9876543210</p>
                    <div className="space-x-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                    <p className="mt-4">© 2025 CharitySphere. All Rights Reserved.</p>
                </div>
            </footer>

            <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
      `}</style>
        </div>
    );
};

export default HomePage;
