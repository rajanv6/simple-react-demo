import { NavLink, useLocation } from "react-router";
import "../css/navBar.css"

export default function NavBar() {
    const { pathname } = useLocation();
    const editing = pathname.startsWith('/edit')

    return (
        <nav className="navbar">
            <NavLink to={editing ? pathname : '/'} end>
                { editing ? 'Update User' : 'Add User'}
            </NavLink>
            <NavLink to="/users">Users</NavLink>
        </nav>
    )
}