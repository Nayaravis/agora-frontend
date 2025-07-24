import { BrowserRouter as Router, Routes, Route } from 'react-router'
import CreateEventForm from "./components/CreateEventForm"
import EventsList from "./components/EventListPage"
import NavBar from "./components/Navbar"
import UserAccountPage from "./components/UserAccountPage"
import EventRSVP from "./components/rsvp"
import axios from 'axios';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="pt-10 h-screen flex overflow-hidden">
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/create" element={<CreateEventForm />} />
          <Route path="/profile" element={<div className='w-full h-full flex justify-center items-center'><UserAccountPage /></div>} />
          <Route path="/events/:eventId/rsvp" element={<EventRSVP />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
