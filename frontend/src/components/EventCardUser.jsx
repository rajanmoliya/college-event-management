import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTags,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const EventCardUser = ({ event }) => {
  const apiUrl = import.meta.env.PROD
    ? "https://cems.rajanmoliya.me"
    : import.meta.env.VITE_BACKEND_URL;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRegistrationStatus();
  }, []);

  const fetchRegistrationStatus = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/registrations/my`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const registration = response.data.find(
        (reg) => reg.event._id === event._id
      );
      setRegistrationStatus(registration ? registration.status : null);
    } catch (error) {
      console.error("Error fetching registration status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const handleRegisterForEvent = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/users/events/${event._id}/register`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setRegistrationStatus("registered");
      setMessage(response.data.message);
      alert(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md transition-all duration-300 ease-in-out ">
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 p-4">
        <h3 className="text-2xl font-bold text-white mb-2 truncate">
          {event.title}
        </h3>
        <div className="flex justify-between text-white text-sm">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <p>{format(new Date(event.date), "dd MMM yyyy")}</p>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <p>{event.time}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4 transition-all duration-300 ease-in-out">
          {showFullDescription
            ? event.description
            : `${event.description.substring(0, 95)}...`}
        </p>
        <button
          onClick={toggleDescription}
          className="text-indigo-600 hover:text-indigo-800 flex items-center mb-4 transition-all duration-300 ease-in-out"
        >
          {showFullDescription ? (
            <>
              Read less <FaChevronUp className="ml-1" />
            </>
          ) : (
            <>
              Read more <FaChevronDown className="ml-1" />
            </>
          )}
        </button>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            <p>{event.location}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaTags className="mr-2 text-green-500" />
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {event.category.split(",")[0]}
            </span>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
          </div>
        ) : registrationStatus === "registered" ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
            <p className="font-bold">Registered</p>
          </div>
        ) : (
          <button
            onClick={handleRegisterForEvent}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
            disabled={isLoading}
          >
            <FaUsers className="mr-2" />
            <span className="font-semibold">REGISTER</span>
          </button>
        )}
        {message && (
          <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
        )}
      </div>
    </div>
  );
};

export default EventCardUser;
