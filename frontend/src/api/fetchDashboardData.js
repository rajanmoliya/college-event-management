import axios from "axios";

export const fetchDashboardData = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
  }
};
