import { Link } from "react-router-dom";

import e1 from "../assets/e1.jpg";
import e2 from "../assets/e2.jpg";
import e3 from "../assets/e3.jpg";
import e4 from "../assets/e4.jpg";
import e5 from "../assets/e5.jpg";
import e6 from "../assets/e6.jpg";
import e7 from "../assets/e7.jpg";
import e8 from "../assets/e8.jpg";
import e9 from "../assets/e9.jpg";
import e10 from "../assets/e10.jpg";
import e11 from "../assets/e11.jpg";
import e12 from "../assets/e12.jpg";

const PhotoCollage = () => {
  const images = [e6, e2, e3, e4, e5, e1, e7, e8, e9, e10, e11, e12];

  return (
    <div className="absolute inset-0 z-0 grid grid-cols-3 grid-rows-2 gap-1 md:grid-cols-4 md:grid-rows-3">
      {images.map((img, index) => (
        <div key={index} className="bg-gray-300 overflow-hidden">
          <img
            src={img}
            alt={`Event ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export const LandingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <PhotoCollage />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      <div className="relative z-20 max-w-md w-full bg-white bg-opacity-90 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to{" "}
            <span className="text-[#2563eb] font-extrabold">SDJ EventHub</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Your one-stop platform for attending events
          </p>

          <div className="space-y-4">
            <Link
              to="/login"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-center"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Why choose SDJ EventHub?
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Easy event creation and management</li>
            <li>Discover exciting college events</li>
            <li>Connect with like-minded people</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
