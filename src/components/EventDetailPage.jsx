import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const EVENTS_API = "https://agora-backend-pg31.onrender.com/api/events";
const RSVPS_API = "https://agora-backend-pg31.onrender.com/api/rsvps";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpCount, setRsvpCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const [eventRes, rsvpRes] = await Promise.all([
          fetch(`${EVENTS_API}/${eventId}`),
          fetch(`${RSVPS_API}?eventId=${eventId}`),
        ]);

        if (!eventRes.ok || !rsvpRes.ok) throw new Error("Failed to load data");

        const eventData = await eventRes.json();
        const rsvpData = await rsvpRes.json();

        setEvent(eventData);
        setRsvpCount(rsvpData.filter((r) => r.rsvpStatus === "yes").length);
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEventData();
  }, [eventId]);

  if (loading) return <p className="p-6 text-gray-500">Loading event...</p>;
  if (!event) return <p className="p-6 text-red-500">Event not found.</p>;

  const { title, location, datetime, description, createdBy } = event;
  const formattedDate = new Date(datetime).toLocaleDateString();
  const formattedTime = new Date(datetime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        {/* Event Title */}
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{title}</h1>

        {/* Date, Time, Location */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 mb-4">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 text-sm font-medium rounded-full">
              {formattedDate} @ {formattedTime}
            </span>
            <span className="text-gray-500 font-medium">{location}</span>
          </div>
        </div>

        {/* Host */}
        <p className="text-sm text-gray-500 mb-4">
          Hosted by <span className="font-medium text-gray-800">{createdBy}</span>
        </p>

        {/* Description */}
        {description && (
          <p className="text-gray-800 text-lg leading-relaxed mb-6">{description}</p>
        )}

        {/* RSVP Count */}
        <div className="inline-block bg-green-100 text-green-700 font-semibold text-sm px-3 py-1 rounded-full mb-6">
          {rsvpCount} {rsvpCount === 1 ? "person has" : "people have"} RSVPd
        </div>

        {/* RSVP Button */}
        <div>
          <Link
            to={`/events/${eventId}/rsvp`}
            className="inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            RSVP Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default EventDetails;
