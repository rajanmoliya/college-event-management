import axios from "axios";

const apiUrl = import.meta.env.PROD
  ? "https://cems.rajanmoliya.me/api"
  : import.meta.env.VITE_BACKEND_URL;

export const fetchDashboardData = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/admin/dashboard`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
  }
};
