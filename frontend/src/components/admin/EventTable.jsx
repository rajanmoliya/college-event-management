import { useState, useMemo } from "react";
import { format } from "date-fns";
import { FaSort, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

/* eslint-disable */
export const EventTable = ({ events, onEdit, onDelete }) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAndSortedEvents = useMemo(() => {
    return events
      .filter((event) => {
        const searchRegex = new RegExp(searchTerm, "i");
        return (
          searchRegex.test(event.title) ||
          searchRegex.test(event.category) ||
          searchRegex.test(event.location) ||
          searchRegex.test(format(new Date(event.date), "dd-MMM-yyyy")) ||
          searchRegex.test(event.time)
        );
      })
      .sort((a, b) => {
        if (!sortColumn) return 0;
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [events, searchTerm, sortColumn, sortDirection]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden h-screen">
      <div className="p-4 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-10 py-2 border rounded-md"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Title", "Date", "Time", "Location", "Category", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    <div className="flex items-center">
                      {header}
                      <FaSort className="ml-1" />
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedEvents.map((event) => (
              <tr key={event._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.title.length < 60
                    ? event.title
                    : event.title.split(" ").slice(0, 10).join(" ") + "..."}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(event.date), "dd-MMM-yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{event.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => onEdit(event)}
                    className="text-blue-700 hover:text-blue-900 mr-2"
                    aria-label="Edit event"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(event._id)}
                    className="text-red-700 hover:text-red-900"
                    aria-label="Delete event"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredAndSortedEvents.length === 0 && (
        <div className="text-center py-4 text-gray-500">No events found</div>
      )}
    </div>
  );
};
