import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import { authState } from "../recoil/authState";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const Login = () => {
  const apiUrl = import.meta.env.PROD
    ? "https://cems.rajanmoliya.me"
    : import.meta.env.VITE_BACKEND_URL;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const setAuthState = useSetRecoilState(authState);
  const setUserState = useSetRecoilState(userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const res = await axios.post(`${apiUrl}/api/users/login`, {
        email: data.email,
        password: data.password,
      });

      const token = res.data.token;
      const role = res.data.role;

      if (token) {
        localStorage.setItem("token", `Bearer ${token}`);
        console.log("Registration successful, token stored.");

        setAuthState({ isAuthenticated: true, token });
        setUserState({ isAuthenticated: true, token, role });

        if (role === "admin") {
          window.location.href = "/admin";
        } else window.location.href = "/";
      } else {
        console.error("No token received from the server.");
      }

      setIsLoading(false);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? setError(error.response.data.message) : error.message
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h2 className="text-2xl font-semibold mb-6">LOGIN</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        {error && (
          <div className="lg:col-span-2 text-center">
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}
        <button
          type="submit"
          className={
            isLoading
              ? "w-full bg-blue-500 text-white py-2 rounded-md cursor-not-allowed"
              : "w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          }
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="mt-4">
        {"Don't have an account? "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};
