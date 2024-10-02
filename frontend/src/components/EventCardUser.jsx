import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

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
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-md">
      <div className="p-6">
        <h3 className="text-2xl font-extrabold text-gray-800 mb-3">
          {event.title}
        </h3>
        <p className="text-gray-700 mb-4">
          {showFullDescription
            ? event.description
            : `${event.description.substring(0, 100)}...`}
          <button
            onClick={toggleDescription}
            className="text-blue-600 hover:text-blue-900 ml-2"
          >
            {showFullDescription ? "Read less" : "Read more"}
          </button>
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2" />
            <p>{format(new Date(event.date), "dd-MMM-yyyy")}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaClock className="mr-2" />
            <p>{event.time}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <p>{event.location}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaTags className="mr-2" />
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {event.category.split(",")[0]}
            </span>
          </div>
        </div>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : registrationStatus === "registered" ? (
          <p className="text-center text-green-600">
            You are registered for this event.
          </p>
        ) : (
          <button
            onClick={handleRegisterForEvent}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            <FaUsers className="mr-2" />
            Register
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCardUser;
