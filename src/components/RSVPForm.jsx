import React, { useState } from 'react';

const RSVPForm = ({ onSubmit, eventId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    dietaryRestrictions: '',
    guests: 0
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        eventId,
        ...formData
      });
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        attending: 'yes',
        dietaryRestrictions: '',
        guests: 0
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
          placeholder="Enter your name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Are you attending?
        </label>
        <div className="mt-1 space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="yes"
              name="attending"
              value="yes"
              checked={formData.attending === 'yes'}
              onChange={handleChange}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="yes" className="ml-3 block text-sm font-medium text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="no"
              name="attending"
              value="no"
              checked={formData.attending === 'no'}
              onChange={handleChange}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="no" className="ml-3 block text-sm font-medium text-gray-700">
              No
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">
          Dietary Restrictions
        </label>
        <textarea
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={2}
          placeholder="Any dietary restrictions?"
        />
      </div>

      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
          Number of Guests
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit RSVP
      </button>
    </form>
  );
};

export default RSVPForm;
