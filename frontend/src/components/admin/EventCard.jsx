import { format } from "date-fns";

/* eslint-disable */

const EventCard = ({ event }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <p>{format(new Date(event.date), "dd-MMM-yyyy")}</p>
        <p>{event.time}</p>
      </div>
      <p className="text-sm text-gray-500 mt-2">{event.location}</p>
      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-3">
        {event.category}
      </span>
    </div>
  </div>
);

export default EventCard;
