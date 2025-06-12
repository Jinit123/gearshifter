import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUserForm = ({ }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    });

    const token = localStorage.getItem("token");
    const naviagte = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/create`, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("User Created:", res.data);
            // setUsers((prevUsers) => [...prevUsers, res.data.user]);
            naviagte("/admin/dashboard");
        } catch (err) {
            console.error("Error Creating User:", err.response?.data || err.message);
        }
    };

    return (
        <div>
            <form className="border p-5 rounded w-100" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4 pb-4">Add New User</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name"
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email"
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <select
                        className="form-control"
                        id="role"
                        value={userData.role}
                        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                        required
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>

                </div>
                <button type="submit" className="btn text-white w-100 bg-danger">Add User</button>
            </form>
        </div>
    );
};

export default AddUserForm;