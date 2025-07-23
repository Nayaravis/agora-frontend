import CreateEventForm from "./components/CreateEventForm"
import NavBar from "./components/Navbar"

function App() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <CreateEventForm />
      </div>
    </>
  )
}

export default App
