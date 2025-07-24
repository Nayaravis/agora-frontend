import React, { useState } from 'react';

const CreateEventForm = ({ onCreateEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    // Removed 'image: null' from initial state
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Removed 'files' from destructuring
    // Simplified logic as 'image' handling is removed
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Data:", formData);
    if (onCreateEvent) onCreateEvent(formData);
    // Reset form data without the image field
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      // Removed 'image: null' from reset
    });
  };

  return (
    <div className='w-full flex justify-center h-fit'>
      <form
        onSubmit={handleSubmit}
        className="w-3xl bg-white p-8 rounded-lg shadow space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Create Event</h2>

        {/* Event Name */}
        <div>
          <label className="block text-sm text-gray-700">Event Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter event name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
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

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Enter event description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ⚠️ The entire "Upload Image" div has been removed from here ⚠️ */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};
 
export default CreateEventForm;