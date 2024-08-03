import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h2 className="text-2xl font-semibold mb-6">Welcome to SDJ EventHub</h2>
      <p>
        Please{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>{" "}
        or{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>{" "}
        to continue.
      </p>
    </div>
  );
};
