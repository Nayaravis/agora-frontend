import { useState, useEffect } from "react";
import { motion } from "motion/react";
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

    function generateColor() {
      const index = Math.floor(Math.random() * vibrantTailwindColors.length);
      return vibrantTailwindColors[index];
    }
    
    useEffect(() => {
        fetch("https://agora-backend-pg31.onrender.com/api/events")
            .then(r => r.json())
            .then(e => updateEvents(e))
    }, [])

    return (
        <motion.div className="pt-17 px-20" initial={{scale: 0}} animate={{scale: 1}}>
            <div className="text-[32px] font-bold py-5">
                <span>Explore Events</span>
            </div>
            <div className="text-gray-500 text-lg">
                <span>Discover exciting events happening near you and around the globe</span>
            </div>
            <div className="py-6 flex gap-6">
                {events.map(event => {
                    return <EventCard key={event.id} title={event.title} location={event.location} date={event.datetime} id={event.id} cardColor={generateColor()}/>
                })}
            </div>
        </motion.div>
    )
}

export default EventsList;