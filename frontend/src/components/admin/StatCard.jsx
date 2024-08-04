import { FaCalendar, FaClipboardList, FaUser } from "react-icons/fa";

//eslint-disable-next-line
const StatCard = ({ title, count }) => (
  <div className="bg-white shadow-md rounded-lg p-6 flex items-center w-full space-x-4">
    <div className="bg-blue-100 p-4 rounded-full">
      {title === "Users" ? (
        <FaUser className="text-3xl text-blue-500" />
      ) : title === "Events" ? (
        <FaCalendar className="text-3xl text-blue-500" />
      ) : title === "Registrations" ? (
        <FaClipboardList className="text-3xl text-blue-500" />
      ) : (
        ""
      )}
    </div>
    <div className="flex items-center justify-between w-full">
      <div className="text-xl font-semibold text-gray-700">{title}</div>
      <div className="text-3xl font-bold text-gray-900 ">{count}</div>
    </div>
  </div>
);

export default StatCard;
