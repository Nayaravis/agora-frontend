import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function EventCard({ id, title, location, date, notes, createdBy, cardColor }) {
    return (
        <div className="w-72 cursor-pointer">
            <Link to={`/events/${id}`}>
                <motion.div 
                    className={`${cardColor} w-full h-44 rounded-2xl`}
                    whileHover={{scale: 1.05}}
                >
                </motion.div>
                <div className="py-3 px-3.5">
                    <p className="font-bold text-lg">{title}</p>
                    <div className="flex justify-between text-gray-400 text-sm font-semibold">
                        <p>{location}</p>
                        <p>{date}</p>
                    </div>
                </div>
            </Link>
            
            <div className="px-3.5 pb-3">
                <Link 
                    to={`/events/${id}/rsvp`}
                    className="block w-full py-2 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={(e) => e.stopPropagation()} 
                >
                    RSVP Now
                </Link>
            </div>
        </div>
    )
}

export default EventCard;