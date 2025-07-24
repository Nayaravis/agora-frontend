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
      <div className="py-28 h-screen flex">
        <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/create" element={<CreateEventForm />} />
        <Route path="/profile" element={<UserAccountPage />} />
        <Route path="/events/:eventId/rsvp" element={<EventRSVP />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
