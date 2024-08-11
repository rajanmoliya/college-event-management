import axios from "axios";

const apiUrl = import.meta.env.PROD ? "/api" : import.meta.env.VITE_BACKEND_URL;

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/admin/dashboard`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data.allEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};
