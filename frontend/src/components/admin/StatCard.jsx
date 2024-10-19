import { FaCalendar, FaClipboardList, FaUser } from "react-icons/fa";

const StatCard = ({ title, count }) => {
  const getGradient = () => {
    switch (title) {
      case "Users":
        return "from-blue-400 to-blue-600";
      case "Events":
        return "from-green-400 to-green-600";
      case "Registrations":
        return "from-purple-400 to-purple-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getIcon = () => {
    switch (title) {
      case "Users":
        return <FaUser className="text-3xl text-white" />;
      case "Events":
        return <FaCalendar className="text-3xl text-white" />;
      case "Registrations":
        return <FaClipboardList className="text-3xl text-white" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${getGradient()} shadow-lg rounded-xl p-6 flex items-center w-full space-x-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105`}
    >
      <div className="bg-white bg-opacity-20 p-4 rounded-full">{getIcon()}</div>
      <div className="text-2xl font-semibold text-white mb-2">{title}</div>
      <div className="flex justify-end items-center w-full">
        <div className="text-4xl font-extrabold text-white">{count}</div>
      </div>
    </div>
  );
};

export default StatCard;
