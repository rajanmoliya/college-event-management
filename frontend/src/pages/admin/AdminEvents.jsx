import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authState";
import { LandingPage } from "../../components/LandingPage";
import AdminNavbar from "../../components/admin/AdminNavbar";
import axios from "axios";
import { fetchEvents } from "../../api/fetchEvents";
import { EventForm } from "../../components/admin/EventForm";
import { EventTable } from "../../components/admin/EventTable";

export const AdminEvents = () => {
  const auth = useRecoilValue(authState);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchEvents().then((data) => setEvents(data));
    }
  }, [auth.isAuthenticated]);

  const handleCreate = async (event) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/events`,
        event,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setEvents([response.data, ...events]); // Add new event to the top of the list
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleUpdate = async (event) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/events/${event._id}`,
        event,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setEvents(events.map((e) => (e._id === event._id ? response.data : e)));
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
      setEvents(events.filter((event) => event._id !== id));
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

          <EventForm
            event={selectedEvent}
            isEditing={isEditing}
            onSubmit={isEditing ? handleUpdate : handleCreate}
            onCancel={() => {
              setSelectedEvent(null);
              setIsEditing(false);
            }}
          />

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
    </>
  );
};
