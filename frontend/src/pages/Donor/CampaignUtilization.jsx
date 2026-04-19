// src/pages/Donor/CampaignUtilization.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampaignDetails } from "../../services/api";
import { 
  FaHeart, 
  FaUsers, 
  FaMoneyBillWave, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaShare,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CampaignUtilization() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("updates");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const data = await getCampaignDetails(id);
        setCampaign(data);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setError(err.response?.data?.message || "Failed to load campaign details");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  // Safe defaults
  const donations = campaign?.donations || [];
  const updates = campaign?.updates || [];
  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const goalAmount = campaign?.goalAmount || 0;
  const progress = campaign?.progress || 0;

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-700">Loading Campaign Details</h3>
            <p className="text-gray-500 mt-2">Please wait while we fetch the latest updates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Campaign</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/campaigns"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Campaigns</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/campaigns"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to Campaigns</span>
          </Link>
          
          <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition">
            <FaShare className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Campaign Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-64 bg-gray-500 hover:bg-sky-700 transition-colors duration-300">
            {campaign.image ? (
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaHeart className="text-white text-6xl opacity-80" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Status Badge */}
            <div className="absolute top-6 left-6">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(campaign.status)}`}>
                <span className="mr-2">{getStatusIcon(campaign.status)}</span>
                {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {campaign.title}
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {campaign.description}
                </p>

                {/* Campaign Meta */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaMapMarkerAlt className="w-5 h-5 text-blue-500" />
                    <span>{campaign.location || "Multiple Locations"}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaCalendarAlt className="w-5 h-5 text-green-500" />
                    <span>Started {new Date(campaign.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <FaUsers className="w-5 h-5 text-purple-500" />
                    <span>By {campaign.ngo?.name || "Community Organization"}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-xl p-6 min-w-80">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Impact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Funds Raised</span>
                      <span>₹{totalDonations.toLocaleString()} / ₹{goalAmount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${goalAmount > 0 ? Math.min(100, (totalDonations / goalAmount) * 100) : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{donations.length}</div>
                      <div className="text-sm text-gray-600">Donors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{campaign.volunteers?.length || 0}</div>
                      <div className="text-sm text-gray-600">Volunteers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-2xl p-2 shadow-lg mb-8">
          {[
            { key: "updates", label: "Progress Updates", icon: FaChartLine },
            { key: "donations", label: "Donations", icon: FaMoneyBillWave },
            { key: "details", label: "Campaign Details", icon: FaCheckCircle },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex-1 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === "updates" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Progress Updates</h2>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {updates.length} Updates
                </span>
              </div>

              {updates.length > 0 ? (
                <div className="space-y-6">
                  {updates.map((update, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-gray-700">
                          {update.title || "Campaign Update"}
                        </span>
                        <span className="text-xs text-gray-500">
                          <FaClock className="w-3 h-3 inline mr-1" />
                          {new Date(update.createdAt || update.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {update.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaChartLine className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Updates Yet</h3>
                  <p className="text-gray-500">Check back later for progress updates from the NGO.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "donations" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Donation History</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{totalDonations.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Raised</div>
                </div>
              </div>

              {donations.length > 0 ? (
                <div className="space-y-4">
                  {donations.map((donation, index) => (
                    <div key={donation._id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FaHeart className="text-green-600 w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {donation.donor?.name || "Anonymous Donor"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(donation.createdAt || donation.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ₹{donation.amount?.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {donation.paymentMethod || "Online"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaMoneyBillWave className="text-gray-400 text-5xl mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Donations Yet</h3>
                  <p className="text-gray-500">Be the first to support this campaign!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Details</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Status</span>
                      <span className="font-semibold capitalize">{campaign.status}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">{progress}% Complete</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Location</span>
                      <span className="font-semibold">{campaign.location || "Various"}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">NGO Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Organization</span>
                      <span className="font-semibold">{campaign.ngo?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Contact</span>
                      <span className="font-semibold">{campaign.ngo?.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Verification</span>
                      <span className={`font-semibold ${
                        campaign.ngo?.verifiedByAuthority ? "text-green-600" : "text-yellow-600"
                      }`}>
                        {campaign.ngo?.verifiedByAuthority ? "Verified" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}