import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function EventCard({ id, title, location, date, notes, createdBy, cardColor }) {
    return (
        <div className="w-72 h- flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
           
            <Link to={`/events/${id}`} className="flex-grow flex flex-col">
                <motion.div 
                    className={`${cardColor} w-full h-44 rounded-t-xl`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                </motion.div>
                
                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
                    <div className="flex justify-between text-gray-500 text-sm mb-2">
                        <span className="truncate">{location}</span>
                        <span>{date}</span>
                    </div>
                    {notes && (
                        <p className="text-gray-600 text-sm line-clamp-3 mt-auto">
                            {notes}
                        </p>
                    )}
                </div>
            </Link>
            <div className="p-4 pt-0">
                <Link 
                    to={`/events/${id}/rsvp`}
                    className="block w-full py-2 px-4 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    RSVP Now
                </Link>
            </div>
        </div>
    )
}

export default EventCard;