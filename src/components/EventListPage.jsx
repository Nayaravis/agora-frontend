import { useState, useEffect } from "react";
import EventCard from "./EventCard";

function EventsList() {
    const [events, updateEvents] = useState([]);
    
    useEffect(() => {
        fetch("https://agora-backend-pg31.onrender.com/api/events")
            .then(r => r.json())
            .then(e => updateEvents(e))
    }, [])

    return (
        <div className="pt-17 px-20">
            <div className="text-[32px] font-bold py-5">
                <span>Explore Events</span>
            </div>
            <div className="text-gray-500 text-lg">
                <span>Discover exciting events happening near you and around the globe</span>
            </div>
            <div className="py-6">
                {events.map(event => {
                    return <EventCard key={event.id} title={event.title} location={event.location} date={event.datetime} id={event.id}/>
                })}
            </div>
        </div>
    )
}

export default EventsList;