import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: "10px", background: "#f5f5f5" }}>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
            <Link to="/admin" style={{ marginRight: "10px" }}>Admin</Link>
            <Link to="/user">User</Link>
        </nav>
    );
};

export default Navbar;
