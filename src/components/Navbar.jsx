import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">webHub</Link>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
