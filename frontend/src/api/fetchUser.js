import axios from "axios";

const fetchUser = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
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

export default fetchUser;
