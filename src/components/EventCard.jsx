import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function EventCard({ id, title, location, date, notes, createdBy, cardColor }) {
    const formatDateTime = (datetime) => {
    if (!datetime) return '';
      const date = new Date(datetime);
      return {
        _date: date.toLocaleDateString(),
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    };

    const { _date, time } = formatDateTime(date);
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
                    <div className="flex justify-between items-center text-gray-400 text-sm font-semibold">
                        <p>{location}</p>
                        <div className="h-fit">
                            <p>{_date}</p>
                            <p>{time}</p>
                        </div>
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