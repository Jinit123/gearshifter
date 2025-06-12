import React from 'react'
import axios from 'axios'
import UserList from './UserList'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddUserForm from './AddUserForm'
import { FaPlus, FaUser } from 'react-icons/fa';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [counts, setCounts] = useState();
    const [showUsers, setShowUsers] = useState(false);
    const [logs, setLogs] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/count`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                console.log("API Response", res.data.count);
                setCounts(res.data.count);
            })
            .catch((err) => console.log(err)
            )
    }, []);

    const handleViewUsers = () => {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
                setShowUsers(pre => !pre);
            })
            .catch((err) => {
                setError("Admin Dashboard Error");
                setLoading(false);
            })
    }

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            console.log("Error: No Token founded in localstoarge");
        } else {

            console.log("Stored token in Localstorage", token);
        }


        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/logs`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                console.log("Logs fetched:", res.data);
                setLogs(res.data);
            })
            .catch(err => console.log("Error featching logs", err));
    }, [])
    return (
        <div>
            <div className='container-fluid text-dark'>
                <h1 className='text-center mt-5 fw-bold'>Admin Dashboard</h1>
                <div className='row'>
                    <div className='col-12 col-sm-8 col-md-6 col-lg-4'>
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="media-body text-left">
                                                <h3 className="success">{counts !== null ? counts : "Loading..."}</h3>
                                                <span>Registered Users</span>
                                            </div>
                                            <div className="align-self-center">
                                                <FaUser className="float-right" size={30} color='green' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button className='btn btn-success mt-3 mb-3' style={{ width: '100%' }} onClick={handleViewUsers}>
                                            {showUsers ? "Hide Users" : "View Users"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showUsers && (
                            <div className='table-responsive'>
                                <div className='row'>
                                    <div className='col-12 col-sm-8 col-md-6 col-lg-12 g-0'>
                                        <div className='bg-light rounded p-4'>
                                            <h3 className='text-center fw-bold'><FaUser /> User Management</h3>
                                            <div className="d-flex justify-content-end mx-3">
                                                <button className='btn btn-success mt-3' onClick={() => navigate("/admin/create")}>
                                                    <FaUser /><FaPlus size={10} /> Create User
                                                </button>
                                            </div>
                                            {error && <p className='text-danger text-center'>{error}</p>}
                                            {loading ? <p>Loading users...</p> : <UserList users={users} setUsers={setUsers} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div>
                            {console.log("Log State Before Render:", logs)}
                            <h3 className='fw-bold text-center mt-5 mb-5'>Admin Activity Logs</h3>
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Action</th>
                                            <th>Admin</th>
                                            <th>Affected User</th>
                                            <th>Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs?.logs?.length > 0 ? (
                                            logs?.logs?.slice(0, 7).map((log, index) => (
                                                <tr key={log._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{log.action}</td>
                                                    <td>{log.admin?.name ?? "Unknown Admin"}</td>
                                                    <td>{log.affectedUser?.name ?? "Unknown User"}</td>
                                                    <td>{log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No logs available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div >
    )

}

export default AdminDashboard
