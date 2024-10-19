import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTags,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const EventCard = ({ event }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md transition-all duration-300 ease-in-out ">
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-4">
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
          className="text-blue-600 hover:text-blue-800 flex items-center mb-4 transition-all duration-300 ease-in-out"
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
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            <p>{event.location}</p>
          </div>
          <div className="flex items-center">
            <FaTags className="mr-2 text-green-500" />
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {event.category.split(",")[0]}
            </span>
          </div>
        </div>
        <Link
          to={`/admin/event-registrations/${event._id}`}
          className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
          <FaUsers className="mr-2" />
          View Registrations
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
