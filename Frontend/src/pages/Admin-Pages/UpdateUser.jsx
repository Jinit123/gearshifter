import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
        status: ""
    });

    useEffect(() => {
        console.log("Fetching user data for ID:", id);

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => {
            console.log("Fetched user data:", res.data);
            setUserData(res.data);
        })
        .catch(err => console.error("Error fetching user data", err));
    }, [id]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, userData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            alert("User updated successfully!");
            console.log("Navigating to /admin/dashboard...");
            navigate("/admin/dashboard");
        } catch (error) {
            alert("Error updating user: " + error.response.data.msg);
        }
    };

    return (
        <form className="border p-5 rounded w-100" onSubmit={handleUpdate}>
            <h2 className="text-center mb-4 pb-4">Update User</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter name"
                    value={userData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Enter email"
                    value={userData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role:</label>
                <select className="form-control" id="role" name="role"
                    value={userData.role} onChange={handleChange} required>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <button type="submit" className="btn text-white w-100 bg-success">
                Update User
            </button>
        </form>
    );
};

export default UpdateUser;