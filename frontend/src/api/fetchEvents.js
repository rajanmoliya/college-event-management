import axios from "axios";

export const fetchEvents = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data.allEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};
