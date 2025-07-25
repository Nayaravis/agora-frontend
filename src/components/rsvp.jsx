import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const RSVP_API = "https://agora-backend-pg31.onrender.com/api/rsvps";
const EVENTS_API = "https://agora-backend-pg31.onrender.com/api/events";

const EventRSVP = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes", // 'yes' | 'no'
    guests: 0,        // number of extra guests (optional)
    message: "",      // optional note to host
  });

  const [status, setStatus] = useState(null); // null | 'submitting' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: name === "guests" ? Math.max(0, Number(value)) : value,
    }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Invalid email";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const patchInvitees = async (email, attending) => {
    const { data: event } = await axios.get(`${EVENTS_API}/${eventId}`);
    const invitees = Array.isArray(event.invitees) ? event.invitees : [];

    let nextInvitees;
    if (attending === "yes") {
      nextInvitees = Array.from(new Set([...invitees, email]));
    } else {
      nextInvitees = invitees.filter((e) => e !== email);
    }

    await axios.patch(`${EVENTS_API}/${eventId}`, { invitees: nextInvitees });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setStatus("submitting");

      // 1) Create RSVP
      const payload = {
        eventId: Number(eventId),
        name: formData.name,
        email: formData.email,
        rsvpStatus: formData.attending === "yes" ? "yes" : "no",
        guests: formData.attending === "yes" ? formData.guests : 0,
        message: formData.message,
      };

      await axios.post(RSVP_API, payload);

      // 2) Update invitees on the event
      await patchInvitees(formData.email, formData.attending);

      setStatus("success");
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">RSVP</h1>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
            Thanks! Your RSVP has been recorded.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={onChange}
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Attending */}
            <div>
          <span className="block text-sm font-medium text-gray-700">
            Will you attend? *
          </span>
              <div className="mt-2 flex gap-4">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === "yes"}
                    onChange={onChange}
                  />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={onChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {/* Guests + Message only if attending */}
            {formData.attending === "yes" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Extra Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    min={0}
                    value={formData.guests}
                    onChange={onChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message to the host (optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={onChange}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Anything we should know?"
                  />
                </div>
              </>
            )}

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-md bg-blue-600 text-white font-semibold py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              {status === "submitting" ? "Submitting..." : "Submit RSVP"}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default EventRSVP;
