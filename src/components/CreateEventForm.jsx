import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = "https://agora-backend-pg31.onrender.com/api/events/";

const CreateEventForm = ({ onCreateEvent }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    datetimeLocal: "",
    location: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Get the organization name from localStorage
      const createdBy = localStorage.getItem("organizationName");
      if (!createdBy) {
        setError("Organization name not found. Please set it on the home page.");
        setSubmitting(false);
        return;
      }

      // Convert datetime-local to ISO
      const datetime = new Date(formData.datetimeLocal).toISOString();

      const payload = {
        title: formData.title,
        location: formData.location,
        datetime,
        notes: formData.notes,
        createdBy,
        invitees: [],
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with ${res.status}`);
      }

      const created = await res.json();
      onCreateEvent?.(created);

      // Reset form
      setFormData({
        title: "",
        datetimeLocal: "",
        location: "",
        notes: "",
      });

      // Redirect to home
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full flex justify-center h-full py-8"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Create Event</h2>

        {/* Event Name */}
        <div>
          <label className="block text-sm text-gray-700">Event Name</label>
          <input
            type="text"
            name="title"
            placeholder="Enter event name"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-sm text-gray-700">Date & Time</label>
          <input
            type="datetime-local"
            name="datetimeLocal"
            value={formData.datetimeLocal}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-gray-700">Notes</label>
          <textarea
            name="notes"
            placeholder="Enter event notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-md"
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateEventForm;
