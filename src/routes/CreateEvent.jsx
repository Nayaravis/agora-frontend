import CreateEventForm from "../components/CreateEventForm"
import NavBar from "../components/Navbar"

function CreateEventRoute() {
    return (
        <>
            <NavBar />
            <div className="py-10">
              <CreateEventForm />
            </div>
        </>
    )
}

export default CreateEventRoute;