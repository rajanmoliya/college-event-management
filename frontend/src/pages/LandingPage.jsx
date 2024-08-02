import Navbar from "../components/Navbar";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const LandingPage = () => {
  const message = "Hello World";
  const notify = () =>
    toast(message, {
      type: "error",
      position: "bottom-center",
    });
  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold">College Event Management</h1>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
    </>
  );
};
