import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTags,
  FaUndo,
  FaExclamationTriangle,
} from "react-icons/fa";

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

      // alert(response.data.message);
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
        <p className="text-red-500 text-xl text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full bg-gradient-to-r from-blue-100 to-cyan-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-600">
        My Registrations
      </h1>
      <h2 className="text-lg font-semibold mb-8 text-center text-gray-700">
        Events you registered for
      </h2>
      {registrations.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          You haven't registered for any events yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registrations.map((registration) => (
            <div
              key={registration._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden w-full "
            >
              <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-4">
                <h3 className="text-2xl font-bold text-white mb-2 truncate">
                  {registration.title}
                </h3>
                <div className="flex justify-between text-white text-sm">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    <p>{format(new Date(registration.date), "dd MMM yyyy")}</p>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <p>{registration.time}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  {registration.description.substring(0, 100)}...
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <p>{registration.location}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaTags className="mr-2 text-green-500" />
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {registration.category.split(",")[0]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleUnregisterFromEvent(registration._id)}
                  className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
                >
                  <FaUndo className="mr-2" />
                  Unregister
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Registrations;
