import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user._id !== userId));
            window.location.reload();
        } catch (err) {
            setError("Failed to delete user");
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-4 rounded bg-light mt-1">
            <h4 className="font-semibold mb-4 fw-bold text-center">Registered Users</h4>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="py-2 d-flex">
                                    <button className="btn btn-success text-white mx-1" onClick={() => navigate(`/admin/users/${user._id}/`)}><FaPen />  Edit</button>
                                    <button className="btn btn-danger text-white" onClick={() => handleDelete(user._id)}><FaTrash />    Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
