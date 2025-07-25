import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventCard from "./EventCard";

function EventsList() {
  const [events, updateEvents] = useState([]);
  const [orgName, setOrgName] = useState(localStorage.getItem("organizationName") || "");
  const [showDialog, setShowDialog] = useState(!orgName);

  const vibrantTailwindColors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-fuchsia-500",
    "bg-purple-500",
    "bg-violet-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-sky-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-emerald-500",
    "bg-green-500",
    "bg-lime-500",
    "bg-yellow-400",
    "bg-amber-400",
    "bg-orange-500",
  ];

  useEffect(() => {
    fetch("https://agora-backend-pg31.onrender.com/api/events")
      .then((r) => r.json())
      .then((e) => {
        const eventsWithColors = e.map((event) => ({
          ...event,
          cardColor:
            vibrantTailwindColors[
              Math.floor(Math.random() * vibrantTailwindColors.length)
            ],
        }));
        updateEvents(eventsWithColors);
      });
  }, []);

  const handleOrgSubmit = () => {
    if (orgName.trim()) {
      localStorage.setItem("organizationName", orgName.trim());
      setShowDialog(false);
    }
  };

  return (
    <div className="w-full h-full overflow-auto relative">
      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full">
            <h2 className="text-xl font-semibold mb-4">Enter Organization Name</h2>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              placeholder="Your organization name"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleOrgSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event List */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="pt-16 px-8"
      >
        <div className="text-[32px] font-bold py-5">Explore Events</div>
        <div className="text-gray-500 text-lg mb-4">
          Discover exciting events happening near you and around the globe
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              location={event.location}
              date={event.datetime}
              id={event.id}
              cardColor={event.cardColor}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default EventsList;
