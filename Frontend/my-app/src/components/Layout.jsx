import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
