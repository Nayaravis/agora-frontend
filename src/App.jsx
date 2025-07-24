import { BrowserRouter as Router, Routes, Route } from 'react-router'
import CreateEventForm from "./components/CreateEventForm"
import EventsList from "./components/EventListPage"
import NavBar from "./components/Navbar"
import UserAccountPage from "./components/UserAccountPage"


function App() {
  return (
    <Router>
      <NavBar />
      <div className="py-28 h-screen flex">
        <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/create" element={<CreateEventForm />} />
        <Route path="/profile" element={<UserAccountPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
