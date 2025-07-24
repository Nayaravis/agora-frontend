import NavBar from "../components/Navbar";
import EventsList from "../components/EventListPage";

function Home() {
    return (
        <div className="h-screen">
            <NavBar />
            <EventsList />
        </div>
    )
}
export default Home;