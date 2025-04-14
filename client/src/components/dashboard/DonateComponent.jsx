import { useState } from "react"
import { LuMapPin, LuCalendar, LuAward, LuPlus, LuImage, LuClock, LuCheck, LuX } from "react-icons/lu"

export default function DonateComponent() {
  const [activeTab, setActiveTab] = useState("donate")
  const [donationHistory, setDonationHistory] = useState([
    {
      id: 1,
      date: "April 5, 2025",
      organization: "Local Food Bank",
      items: ["Canned Goods", "Rice", "Pasta"],
      quantity: "5 kg",
      expiry: "April 20, 2025",
      location: "123 Main Street, City",
      status: "accepted",
      certificate: true,
    },
    {
      id: 2,
      date: "March 20, 2025",
      organization: "Community Kitchen",
      items: ["Fresh Vegetables", "Bread"],
      quantity: "3 kg",
      expiry: "March 25, 2025",
      location: "456 Oak Avenue, City",
      status: "accepted",
      certificate: true,
    },
    {
      id: 3,
      date: "April 10, 2025",
      organization: "Pending Assignment",
      items: ["Dairy Products", "Eggs"],
      quantity: "2 kg",
      expiry: "April 15, 2025",
      location: "789 Pine Street, City",
      status: "pending",
      certificate: false,
    },
    {
      id: 4,
      date: "March 15, 2025",
      organization: "Food Rescue Organization",
      items: ["Packaged Snacks"],
      quantity: "1 kg",
      expiry: "June 15, 2025",
      location: "101 Elm Road, City",
      status: "rejected",
      certificate: false,
      rejectionReason: "Packaging damaged",
    },
  ])

  const [newDonation, setNewDonation] = useState({
    foodType: "",
    quantity: "",
    expiry: "",
    location: "",
    description: "",
    contactPhone: "",
    pickupTimes: "",
    foodCategory: "Non-perishable",
    hasAllergies: false,
    allergyInfo: "",
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewDonation({
      ...newDonation,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, this would send the data to an API
    const newDonationEntry = {
      id: donationHistory.length + 1,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      organization: "Pending Assignment",
      items: [newDonation.foodType],
      quantity: newDonation.quantity,
      expiry: newDonation.expiry,
      location: newDonation.location,
      status: "pending",
      certificate: false,
    }

    setDonationHistory([newDonationEntry, ...donationHistory])

    // Reset form
    setNewDonation({
      foodType: "",
      quantity: "",
      expiry: "",
      location: "",
      description: "",
      contactPhone: "",
      pickupTimes: "",
      foodCategory: "Non-perishable",
      hasAllergies: false,
      allergyInfo: "",
    })

    // Switch to history tab to show the new donation
    setActiveTab("history")
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
            <LuClock className="mr-1" /> Pending
          </span>
        )
      case "accepted":
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
            <LuCheck className="mr-1" /> Accepted
          </span>
        )
      case "rejected":
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
            <LuX className="mr-1" /> Rejected
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Food Donation</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "donate" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("donate")}
          >
            Donate Food
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "history" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("history")}
          >
            Donation History
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "certificate" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
            onClick={() => setActiveTab("certificate")}
          >
            Certificates
          </button>
        </div>

        {activeTab === "donate" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Donate Your Excess Food</h2>
              <p className="text-gray-600">
                Fill out the form below to donate your excess food. Local organizations will review your donation and
                contact you for pickup.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-1">
                    Food Item(s) *
                  </label>
                  <input
                    type="text"
                    id="foodType"
                    name="foodType"
                    value={newDonation.foodType}
                    onChange={handleInputChange}
                    placeholder="E.g., Rice, Pasta, Canned Beans"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={newDonation.quantity}
                    onChange={handleInputChange}
                    placeholder="E.g., 2 kg, 5 packets, 3 boxes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="foodCategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Food Category *
                  </label>
                  <select
                    id="foodCategory"
                    name="foodCategory"
                    value={newDonation.foodCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="Non-perishable">Non-perishable</option>
                    <option value="Fresh Produce">Fresh Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Prepared Meals">Prepared Meals</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    id="expiry"
                    name="expiry"
                    value={newDonation.expiry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Pickup Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newDonation.location}
                    onChange={handleInputChange}
                    placeholder="Full address for pickup"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={newDonation.contactPhone}
                    onChange={handleInputChange}
                    placeholder="Phone number for coordination"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="pickupTimes" className="block text-sm font-medium text-gray-700 mb-1">
                    Available Pickup Times *
                  </label>
                  <input
                    type="text"
                    id="pickupTimes"
                    name="pickupTimes"
                    value={newDonation.pickupTimes}
                    onChange={handleInputChange}
                    placeholder="E.g., Weekdays 5-8 PM, Weekends 10 AM-6 PM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newDonation.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any additional information about the food items"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="hasAllergies"
                      name="hasAllergies"
                      checked={newDonation.hasAllergies}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="hasAllergies" className="text-sm font-medium text-gray-700">
                      Contains potential allergens
                    </label>
                  </div>

                  {newDonation.hasAllergies && (
                    <input
                      type="text"
                      id="allergyInfo"
                      name="allergyInfo"
                      value={newDonation.allergyInfo}
                      onChange={handleInputChange}
                      placeholder="Please specify allergens (e.g., nuts, dairy, gluten)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                    <LuImage className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Drag and drop images here, or click to select files</p>
                    <p className="text-xs text-gray-400">Maximum 3 images, 5MB each</p>
                    <input type="file" className="hidden" accept="image/*" multiple />
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Select Files
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Submit Donation
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Donation History</h2>

            {donationHistory.length > 0 ? (
              <div className="space-y-6">
                {donationHistory.map((donation) => (
                  <div key={donation.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{donation.items.join(", ")}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <LuCalendar className="mr-1" /> {donation.date}
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">{getStatusBadge(donation.status)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Organization</p>
                        <p>{donation.organization}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p>{donation.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expiry Date</p>
                        <p>{donation.expiry}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <div className="flex items-start">
                        <LuMapPin className="text-gray-400 mr-1 mt-1" />
                        <p>{donation.location}</p>
                      </div>
                    </div>

                    {donation.status === "rejected" && donation.rejectionReason && (
                      <div className="bg-red-50 p-3 rounded-md mb-4">
                        <p className="text-sm font-medium text-red-800">Reason for rejection:</p>
                        <p className="text-sm text-red-700">{donation.rejectionReason}</p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      {donation.status === "accepted" && (
                        <button
                          onClick={() => setActiveTab("certificate")}
                          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                        >
                          View Certificate
                        </button>
                      )}

                      {donation.status === "pending" && (
                        <span className="text-gray-500 text-sm">Awaiting organization response</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No donation history yet.</p>
            )}
          </div>
        )}

        {activeTab === "certificate" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Digital Certificates</h2>
            <p className="text-gray-600 mb-6">
              After your donation is accepted, you'll receive a digital certificate acknowledging your contribution.
            </p>

            <div className="border border-dashed border-orange-300 rounded-lg p-6 bg-orange-50 flex flex-col items-center">
              <div className="mb-4">
                <LuAward className="w-16 h-16 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Certificate of Appreciation</h3>
              <p className="text-center text-gray-600 mb-4">
                This certifies that <span className="font-medium">John Doe</span> has donated food items to
                <span className="font-medium"> Local Food Bank</span> on April 5, 2025.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <LuCalendar className="mr-1" /> April 5, 2025
              </div>
              <button className="mt-4 text-orange-500 hover:text-orange-600 text-sm font-medium">
                Download Certificate
              </button>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Your Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">8 kg</p>
                  <p className="text-sm text-gray-600">Food Donated</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-gray-600">Organizations Helped</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">12</p>
                  <p className="text-sm text-gray-600">Meals Provided</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-4 rounded-full mb-4">
              <LuPlus className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-medium mb-2">1. Submit Donation</h3>
            <p className="text-sm text-gray-600">Fill out the donation form with details about your food items.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-4 rounded-full mb-4">
              <LuClock className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-medium mb-2">2. NGO Review</h3>
            <p className="text-sm text-gray-600">
              Local organizations review your donation and decide if they can accept it.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-4 rounded-full mb-4">
              <LuCheck className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-medium mb-2">3. Pickup & Certificate</h3>
            <p className="text-sm text-gray-600">The organization arranges pickup and issues a digital certificate.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
