import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // corrected import
import EventCard from "./EventCard";

function EventsList() {
  const [events, updateEvents] = useState([]);
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
    "bg-orange-500"
  ];

  useEffect(() => {
    fetch("https://agora-backend-pg31.onrender.com/api/events")
      .then(r => r.json())
      .then(e => {
        const eventsWithColors = e.map(event => ({
          ...event,
          cardColor: vibrantTailwindColors[Math.floor(Math.random() * vibrantTailwindColors.length)]
        }));
        updateEvents(eventsWithColors);
      });
  }, []);

  return (
    <div className="w-full h-full overflow-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="pt-16 px-8"
      >
        <div className="text-[32px] font-bold py-5">
          Explore Events
        </div>
        <div className="text-gray-500 text-lg mb-4">
          Discover exciting events happening near you and around the globe
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map(event => (
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
