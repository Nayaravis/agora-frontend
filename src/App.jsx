import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateEventForm from "./components/CreateEventForm"
import NavBar from "./components/Navbar"
import UserAccountPage from "./components/user-account-page"


function App() {
  return (
    <Router>
      <NavBar />
      <div className="py-10">
        <Routes>
        <Route path="/" element={<CreateEventForm/>} />
        <Route path="/create-event" element={<CreateEventForm />} />
        <Route path="/profile" element={<UserAccountPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
