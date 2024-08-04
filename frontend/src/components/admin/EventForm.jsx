import { format, parse } from "date-fns";
import { useEffect, useState } from "react";

/* eslint-disable */
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
    // Clear the form after submission
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
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-8">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          htmlFor="date"
        >
          Date
        </label>
        <label
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          htmlFor="time"
        >
          Time
        </label>
      </div>

      <div className="mb-4 flex gap-8">
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
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

      <div className="flex gap-8">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          htmlFor="location"
        >
          Location
        </label>

        <label
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          htmlFor="category"
        >
          Category
        </label>
      </div>

      <div className="mb-4 flex gap-8">
        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center justify-center gap-8 mt-8">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isEditing ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};
