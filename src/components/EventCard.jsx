import { motion } from "motion/react";
import { Link } from "react-router";

function EventCard({ id, title, location, date, notes, createdBy }) {
    return (
        <Link to={`/events/${id}`}>
            <div className="w-72 cursor-pointer">
                <motion.div 
                    className="bg-red-500 w-full h-44 rounded-2xl"
                    whileHover={{scale: 1.1}}
                >
                
                </motion.div>
                <div className="py-3 px-3.5">
                    <p className="font-bold text-lg">{title}</p>
                    <div className="flex justify-between text-gray-400 text-sm font-semibold">
                        <p>{location}</p>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventCard;