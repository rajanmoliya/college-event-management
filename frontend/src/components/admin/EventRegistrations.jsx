import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import AdminNavbar from "./AdminNavbar";
import { CSVLink } from "react-csv";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSort, FaSearch } from "react-icons/fa";

const EventRegistrations = () => {
  const apiUrl = import.meta.env.PROD
    ? "https://cems.rajanmoliya.me"
    : import.meta.env.VITE_BACKEND_URL;

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const { eventId } = useParams();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/registrations/event/${eventId}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setRegistrations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch registrations");
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [eventId]);

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

  const filteredAndSortedRegistrations = useMemo(() => {
    return registrations
      .filter((registration) => {
        const searchRegex = new RegExp(searchTerm, "i");
        return (
          searchRegex.test(registration.user.fullName) ||
          searchRegex.test(registration.user.email) ||
          searchRegex.test(registration.user.studentId) ||
          searchRegex.test(registration.user.stream) ||
          searchRegex.test(registration.user.semester) ||
          searchRegex.test(registration.user.mobileNo) ||
          searchRegex.test(registration.user.gender) ||
          searchRegex.test(
            format(
              new Date(registration.registrationDate),
              "dd-MMM-yyyy hh:mm a"
            )
          ) ||
          searchRegex.test(registration.status)
        );
      })
      .sort((a, b) => {
        if (!sortColumn) return 0;
        let aValue = sortColumn.includes("user.")
          ? a.user[sortColumn.split(".")[1]]
          : a[sortColumn];
        let bValue = sortColumn.includes("user.")
          ? b.user[sortColumn.split(".")[1]]
          : b[sortColumn];

        if (sortColumn === "registrationDate") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [registrations, searchTerm, sortColumn, sortDirection]);

  const prepareCSVData = () => {
    const headers = [
      "Name",
      "Email",
      "Student ID",
      "Stream",
      "Semester",
      "Mobile",
      "Gender",
      "Registration Date",
      "Status",
    ];

    const data = filteredAndSortedRegistrations.map((registration) => [
      registration.user.fullName,
      registration.user.email,
      registration.user.studentId,
      registration.user.stream,
      registration.user.semester,
      registration.user.mobileNo,
      registration.user.gender,
      format(new Date(registration.registrationDate), "dd-MMM-yyyy hh:mm a"),
      registration.status,
    ]);

    return [headers, ...data];
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen mx-auto px-4 py-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Event Registrations</h2>
          <Link
            to="/admin"
            className="text-blue-600 hover:text-blue-900 mb-4 inline-block bg-blue-100 px-2 py-1 rounded-full"
          >
            <div className="flex items-center gap-1">
              <IoMdArrowRoundBack /> Back to Dashboard
            </div>
          </Link>

          <div className="bg-white p-4 rounded-lg shadow mb-4 flex items-center justify-between">
            <p className="text-lg font-semibold">
              Total Registered Users:{" "}
              <span className="text-blue-600">
                {filteredAndSortedRegistrations.length}
              </span>
            </p>
            <CSVLink
              data={prepareCSVData()}
              filename={`event-registrations-${format(
                new Date(),
                "yyyy-MM-dd"
              )}.csv`}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Download CSV
            </CSVLink>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search registrations..."
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
                    {[
                      { label: "Name", key: "user.fullName" },
                      { label: "Email", key: "user.email" },
                      { label: "Student ID", key: "user.studentId" },
                      { label: "Stream", key: "user.stream" },
                      { label: "Semester", key: "user.semester" },
                      { label: "Mobile", key: "user.mobileNo" },
                      { label: "Gender", key: "user.gender" },
                      { label: "Registration Date", key: "registrationDate" },
                      { label: "Status", key: "status" },
                    ].map((header) => (
                      <th
                        key={header.key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort(header.key)}
                      >
                        <div className="flex items-center">
                          {header.label}
                          <FaSort className="ml-1" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedRegistrations.map((registration) => (
                    <tr key={registration._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.user.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.user.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.user.stream}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.user.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.user.mobileNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.user.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(
                          new Date(registration.registrationDate),
                          "dd-MMM-yyyy hh:mm a"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {registration.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredAndSortedRegistrations.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No registrations found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventRegistrations;
