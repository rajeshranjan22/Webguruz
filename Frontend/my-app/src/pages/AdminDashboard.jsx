import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:8080/users", {
            headers: { Authorization: token }
        });
        setUsers(res.data);
    };

    const toggleStatus = async (id, status) => {
        await axios.patch(
            `http://localhost:8080/users/status/${id}`,
            { status: status === "active" ? "inactive" : "active" },
            { headers: { Authorization: token } }
        );
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {users.map((u) => (
                <div key={u._id}>
                    {u.name} - {u.email} - {u.role} - {u.status || "active"}
                    <button onClick={() => toggleStatus(u._id, u.status || "active")}>Toggle Status</button>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;