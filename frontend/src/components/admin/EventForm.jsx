import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";

export const EventForm = ({ event, isEditing, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        date: format(new Date(event.date), "yyyy-MM-dd"),
        time: event.time,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "time") {
      const date = parse(value, "HH:mm", new Date());
      const formattedTime = format(date, "hh:mm a");
      setFormData({ ...formData, [name]: formattedTime });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4  w-full"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isEditing ? "Edit Event" : "Create New Event"}
      </h2>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
        />
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="time"
          >
            Time
          </label>
          <input
            className="border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
            id="time"
            type="time"
            name="time"
            value={
              formData.time
                ? format(parse(formData.time, "hh:mm a", new Date()), "HH:mm")
                : ""
            }
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="border-2 border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 transition duration-300"
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          type="submit"
        >
          {isEditing ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
