import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTags,
  FaUndo,
} from "react-icons/fa";
import { format } from "date-fns";

export const Registrations = () => {
  const apiUrl = useMemo(
    () =>
      import.meta.env.PROD
        ? "https://cems.rajanmoliya.me"
        : import.meta.env.VITE_BACKEND_URL,
    []
  );

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/users/events/registered`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setRegistrations(response.data);
      } catch (err) {
        console.error("Error fetching registrations:", err);
        setError("Failed to load registrations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadRegistrations();
  }, [apiUrl]);

  const handleUnregisterFromEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/users/events/${eventId}/unregister`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert(response.data.message);
      setRegistrations((prev) =>
        prev.filter((registration) => registration._id !== eventId)
      );
    } catch (error) {
      console.error("Error unregistering:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-4xl font-bold mb-5 text-center">My Registrations</h1>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Events you registered for
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registrations.map((registration) => (
          <div
            key={registration._id}
            className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-md"
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {registration.title}
              </h3>
              <p className="text-gray-700 mb-5">
                {registration.description.substring(0, 100)}...
              </p>
              <div className="flex justify-between">
                <div className="flex items-center text-gray-600 mb-3">
                  <FaCalendarAlt className="mr-2" />
                  <p>{format(new Date(registration.date), "dd-MMM-yyyy")}</p>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <FaClock className="mr-2" />
                  <p>{registration.time}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="mr-2" />
                  <p>{registration.location}</p>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <FaTags className="mr-2" />
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {registration.category.split(",")[0]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleUnregisterFromEvent(registration._id)}
                className="text-red-600 hover:text-red-900 flex items-center justify-center mt-4 border-t pt-4 w-full"
              >
                <FaUndo className="mr-2" />
                Unregister
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
