import { useEffect, useState } from "react";
import { getAllCampaigns } from "../../services/api";
import { Link } from "react-router-dom";
import { FaHeart, FaUsers, FaMoneyBillWave, FaMapMarkerAlt, FaClock, FaArrowRight } from "react-icons/fa";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await getAllCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const statusFilters = [
    { key: "all", label: "All Campaigns", count: campaigns.length },
    { key: "active", label: "Active", count: campaigns.filter(c => c.status === "active").length },
    { key: "completed", label: "Completed", count: campaigns.filter(c => c.status === "completed").length },
  ];

  const filteredCampaigns = filter === "all" 
    ? campaigns 
    : campaigns.filter(campaign => campaign.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return "🟢";
      case "completed": return "✅";
      case "cancelled": return "❌";
      default: return "⚪";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading campaigns...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Difference
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover meaningful campaigns that need your support. Every contribution creates impact.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <FaHeart className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
                <p className="text-gray-600">Total Campaigns</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {campaigns.reduce((acc, c) => acc + (c.volunteers?.length || 0), 0)}
                </p>
                <p className="text-gray-600">Active Volunteers</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl mr-4">
                <FaMoneyBillWave className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{campaigns.reduce((acc, c) => acc + (c.amountRaised || 0), 0).toLocaleString()}
                </p>
                <p className="text-gray-600">Total Raised</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {statusFilters.map((filterItem) => (
            <button
              key={filterItem.key}
              onClick={() => setFilter(filterItem.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === filterItem.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <span>{filterItem.label}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                filter === filterItem.key 
                  ? "bg-white/20 text-white" 
                  : "bg-gray-100 text-gray-600"
              }`}>
                {filterItem.count}
              </span>
            </button>
          ))}
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Campaigns Found</h3>
            <p className="text-gray-500 mb-6">Try selecting a different filter or check back later.</p>
            <button 
              onClick={() => setFilter("all")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Show All Campaigns
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                {/* Campaign Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                  {campaign.image ? (
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaHeart className="text-white text-4xl opacity-80" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(campaign.status)}`}>
                      <span className="mr-1">{getStatusIcon(campaign.status)}</span>
                      {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}
                    </span>
                  </div>
                  {campaign.ngo?.verifiedByAuthority && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      ✅ Verified
                    </div>
                  )}
                </div>

                {/* Campaign Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                      {campaign.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {campaign.description}
                  </p>

                  {/* Campaign Details */}
                  <div className="space-y-3 mb-4">
                    {campaign.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{campaign.location}</span>
                      </div>
                    )}
                    
                    {campaign.ngo && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FaUsers className="w-4 h-4 mr-2 text-green-500" />
                        <span>By {campaign.ngo.name}</span>
                      </div>
                    )}

                    {campaign.createdAt && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="w-4 h-4 mr-2 text-purple-500" />
                        <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar (if applicable) */}
                  {campaign.goalAmount && campaign.amountRaised !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Raised: ₹{(campaign.amountRaised || 0).toLocaleString()}</span>
                        <span>Goal: ₹{campaign.goalAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min(100, ((campaign.amountRaised || 0) / campaign.goalAmount) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-100">
                    <Link
                      to={`/campaigns/${campaign._id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group"
                    >
                      <span>View Details</span>


                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                                          <Link
  to={`/campaigns/${campaign._id}/utilization`}
  className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center space-x-2"
>
  <span>View Utilization Report</span>
  <FaArrowRight className="w-4 h-4" />
</Link>
                    
                    <button className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center">
                      <FaHeart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of donors and volunteers who are creating positive change in their communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/donor/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition transform hover:-translate-y-1"
              >
                Become a Donor
              </Link>
              <Link
                to="/volunteer/register"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Join as Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}