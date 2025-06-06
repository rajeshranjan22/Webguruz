import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleRegister = async () => {
        await axios.post("http://localhost:8080/users/register", form);
        alert("Registered!");
    };

    return (
        <div>
            <h2>Register</h2>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;