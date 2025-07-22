function NavBar() {
    return (
        <nav className="fixed w-full h-16 border-b-2 border-b-gray-200 flex justify-between items-center px-9">
            <div className="text-xl font-bold">
                <span>Agora</span>
            </div>
            <ul id="nav-links" className="flex gap-10 font-medium">
                <li className="p-1.5 cursor-pointer">Explore</li>
                <li className="p-1.5 cursor-pointer">My Events</li>
                <li className="p-1.5 cursor-pointer">Create</li>
            </ul>
        </nav>
    )
}

export default NavBar;