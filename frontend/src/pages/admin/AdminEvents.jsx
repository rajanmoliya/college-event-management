import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authState";
import { LandingPage } from "../../components/LandingPage";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axios from "axios";
import { format } from "date-fns";

export const AdminEvents = () => {
  const auth = useRecoilValue(authState);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchEvents();
    }
  }, [auth.isAuthenticated]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setEvents(response.data.allEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreate = async (event) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/events`,
        event,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleUpdate = async (event) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/events/${event._id}`,
        event,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchEvents();
      setSelectedEvent(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/events/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Event Management</h1>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditing ? "Edit Event" : "Create New Event"}
            </h2>
            <EventForm
              event={selectedEvent}
              onSubmit={isEditing ? handleUpdate : handleCreate}
              onCancel={() => {
                setSelectedEvent(null);
                setIsEditing(false);
              }}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Event List</h2>
            <EventTable
              events={events}
              onEdit={(event) => {
                setSelectedEvent(event);
                setIsEditing(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    event || {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="date"
        >
          Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="time"
        >
          Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="location"
        >
          Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {event ? "Update Event" : "Create Event"}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const EventTable = ({ events, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Time
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Location
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {event.title}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {format(new Date(event.date), "MMM d, yyyy")}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {event.time}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {event.location}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {event.category}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <button
                onClick={() => onEdit(event)}
                className="text-blue-600 hover:text-blue-900 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(event._id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminEvents;
