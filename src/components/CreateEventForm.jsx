import React, { useState } from 'react';

const CreateEventForm = ({ onCreateEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Data:", formData);
    if (onCreateEvent) onCreateEvent(formData);
    // Reset
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: null
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow space-y-6"
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

      {/* Upload Image */}
      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
        <p className="text-sm text-gray-500 mb-2">Upload Image or Logo</p>
        <p className="text-xs text-gray-400 mb-4">Drag and drop or browse to upload an image or logo for your event.</p>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="upload"
        />
        <label
          htmlFor="upload"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Browse
        </label>
        {formData.image && <p className="mt-2 text-sm text-green-600">{formData.image.name}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;
