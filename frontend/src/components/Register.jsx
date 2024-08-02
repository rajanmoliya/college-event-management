import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    fullName: z.string().min(1, "This field is required"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["male", "female", "other"], "This field is required"),
    stream: z.string().min(1, "This field is required"),
    semester: z.enum(["1", "2", "3", "4", "5", "6"], "This field is required"),
    studentId: z
      .string()
      .regex(/^\d{10}$/, "Student Id must be exactly 10 digits"),
    mobileNo: z
      .string()
      .regex(/^\d{10}$/, "Mobile No. must be exactly 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Your password and confirmation password do not match."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path of error
  });

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
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
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                {...register("gender")}
                value="male"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                {...register("gender")}
                value="female"
              />
              <span className="ml-2">Female</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                {...register("gender")}
                value="other"
              />
              <span className="ml-2">Other</span>
            </label>
          </div>
          {errors.gender && (
            <span className="text-red-500 text-sm">
              {"Select atleast one option"}
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
              {"This field is required"}
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
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
