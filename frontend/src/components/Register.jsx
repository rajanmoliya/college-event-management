import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

const schema = z
  .object({
    fullName: z.string().min(1, "This field is required"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["Male", "Female", "Other"], "This field is required"),
    stream: z.string().min(1, "This field is required"),
    semester: z.enum(["1", "2", "3", "4", "5", "6"], "This field is required"),
    studentId: z
      .string()
      .regex(/^\d{10}$/, "Student Id must be exactly 10 digits"),
    mobileNo: z
      .string()
      .regex(/^\d{10}$/, "Mobile No. must be exactly 10 digits"),
    role: z.enum(["student", "admin"], "This field is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Your password and confirmation password do not match."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/api/users/register", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
        studentId: data.studentId,
        stream: data.stream,
        semester: data.semester,
        mobileNo: data.mobileNo,
        gender: data.gender,
      });

      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", `Bearer ${token}`);
        console.log("Registration successful, token stored.");
        navigate("/");
      } else {
        console.error("No token received from the server.");
      }

      setIsLoading(false);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? setError(error.response.data.message) : error.message
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-4xl mb-6">
        <h2 className="text-2xl font-semibold">REGISTER </h2>
        <select
          className="ml-0 lg:ml-4 mt-4 lg:mt-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("role")}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">student</option>
          <option value="admin">admin</option>
        </select>
        {errors.role && (
          <span className="text-red-500 text-sm">{errors.role.message}</span>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("fullName")}
            placeholder="Full Name"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">
              {errors.fullName.message}
            </span>
          )}
        </div>
        <div>
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
        {role === "student" && (
          <>
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    {...register("gender")}
                    value="Male"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    {...register("gender")}
                    value="Female"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    {...register("gender")}
                    value="Other"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
              {errors.gender && (
                <span className="text-red-500 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("stream")}
              >
                <option value="">Select Stream</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="Bcom">Bcom</option>
                <option value="Bsc">Bsc</option>
              </select>
              {errors.stream && (
                <span className="text-red-500 text-sm">
                  {errors.stream.message}
                </span>
              )}
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("semester")}
              >
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              {errors.semester && (
                <span className="text-red-500 text-sm">
                  {errors.semester.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("studentId")}
                placeholder="Student Id"
              />
              {errors.studentId && (
                <span className="text-red-500 text-sm">
                  {errors.studentId.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("mobileNo")}
                placeholder="Mobile No."
              />
              {errors.mobileNo && (
                <span className="text-red-500 text-sm">
                  {errors.mobileNo.message}
                </span>
              )}
            </div>
          </>
        )}
        <div>
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
        <div>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
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
          className="lg:col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <div className="lg:col-span-2 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
