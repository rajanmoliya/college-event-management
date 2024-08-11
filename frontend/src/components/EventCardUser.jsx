import { useState } from "react";
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

/* eslint-disable */
const EventCardUser = ({ event }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const [registrationMessage, setRegistrationMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const handleRegisterForEvent = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/events/${
          event._id
        }/register`,
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message);
      setIsRegistered(true);
      setRegistrationMessage(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.log("Catch error: " + error.response.data.message);
      setIsRegistered(false);
      setRegistrationMessage(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-md">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          {event.title}
        </h3>
        <p className="text-gray-700 mb-5">
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
        <div className="flex justify-between ">
          <div className="flex items-center text-gray-600 mb-3">
            <FaCalendarAlt className="mr-2" />
            <p>{format(new Date(event.date), "dd-MMM-yyyy")}</p>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <FaClock className="mr-2" />
            <p>{event.time}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center text-gray-600 mb-3">
            <FaMapMarkerAlt className="mr-2" />
            <p>{event.location}</p>
          </div>
          <div className="flex items-center text-gray-600 mb-3 ">
            <FaTags className="mr-2" />
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {event.category.split(",")[0]}
            </span>
          </div>
        </div>
        <Link
          onClick={handleRegisterForEvent}
          className="text-blue-600 hover:text-blue-900 flex items-center justify-center mt-4 border-t pt-4 "
        >
          <FaUsers className="mr-2" />
          Register
        </Link>
        {isRegistered ? (
          <p className="text-green-600 text-center">{registrationMessage}</p>
        ) : (
          <p className="text-red-600 text-center">{registrationMessage}</p>
        )}
      </div>
    </div>
  );
};

export default EventCardUser;
