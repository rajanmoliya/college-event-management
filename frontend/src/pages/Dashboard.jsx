import Navbar from "../components/Navbar";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/authState";
import { LandingPage } from "../components/LandingPage";
import { useEffect, useState } from "react";
import fetchUser from "../api/fetchUser";
import { Navigate } from "react-router-dom";
import axios from "axios";
import EventCardUser from "../components/EventCardUser";

export const Dashboard = () => {
  const apiUrl = import.meta.env.PROD
    ? "https://cems.rajanmoliya.me"
    : import.meta.env.VITE_BACKEND_URL;

  const auth = useRecoilValue(authState);

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser().then((data) => setUser(data));
    fetchEvents();
  }, []);

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await axios.get(`${apiUrl}/api/events/search`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setEvents(response.data);
  };

  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" />;
  }

  if (user.role === "student") {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center  min-h-screen p-4 bg-gradient-to-r from-blue-100 to-cyan-100">
          <h1 className="text-5xl font-extrabold text-[#2563eb] my-8">
            SDJ EventHub
          </h1>

          <h2 className="text-2xl font-semibold my-4 border-b-2 border-[#2563eb]">
            All Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCardUser key={event._id} event={event} />
            ))}
          </div>
        </div>
      </>
    );
  }
};
