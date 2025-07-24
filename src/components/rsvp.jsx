import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EventRSVP = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rsvpStatus: 'yes',
    plusOneName: '',
    dietaryRestrictions: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
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
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      setSubmissionStatus('submitting');
      const response = await axios.post(`/api/events/${eventId}/rsvp`, formData);
      if (response.status === 200 || response.status === 201) {
        setSubmissionStatus('success');
        setFormData({
          name: '',
          email: '',
          rsvpStatus: 'yes',
          plusOneName: '',
          dietaryRestrictions: ''
        });
        
        navigate(`/events/${eventId}`);
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('RSVP submission error:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="event-rsvp-container">
      <h2>RSVP for Event</h2>
      
      {submissionStatus === 'success' ? (
        <div className="success-message">
          <p>Thank you for your RSVP! We look forward to seeing you.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Will you be attending? *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="rsvpStatus"
                  value="yes"
                  checked={formData.rsvpStatus === 'yes'}
                  onChange={handleChange}
                />
                Yeey,count me in!
              </label>
              <label>
                <input
                  type="radio"
                  name="rsvpStatus"
                  value="no"
                  checked={formData.rsvpStatus === 'no'}
                  onChange={handleChange}
                />
                Sorry,I am abit held up!
              </label>
            </div>
          </div>
          
          {formData.rsvpStatus === 'yes' && (
            <>
              <div className="form-group">
                <label htmlFor="plusOneName">Plus One Name (Optional)</label>
                <input
                  type="text"
                  id="plusOneName"
                  name="plusOneName"
                  value={formData.plusOneName}
                  onChange={handleChange}
                  placeholder="If you're bringing a guest"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional)</label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  placeholder="Any food allergies or dietary needs?"
                  rows="3"
                />
              </div>
            </>
          )}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={submissionStatus === 'submitting'}
          >
            {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit RSVP'}
          </button>
          
          {submissionStatus === 'error' && (
            <div className="error-message">
              There was an error submitting your RSVP. Please try again.
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default EventRSVP;