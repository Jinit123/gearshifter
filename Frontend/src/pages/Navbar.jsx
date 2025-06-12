import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCar, FaShoppingCart, FaTools, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            console.log("Cart Count:", cartCount);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className='container-fluid p-0'>
            <nav id="navbar" className="navbar navbar-expand-md bg-dark shadow-lg">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className='d-flex align-items-center'>
                        <a className='navbar-brand text-white' href="/">
                            <FaCar size={35} /><FaTools />
                        </a>
                        <h4 className='text-white m-0 ms-0 mx-5'>Gear Shifter</h4>
                    </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavbar"
                        aria-controls="collapsibleNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0 d-flex gap-3">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/about">About</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav d-flex gap-3">

                            {!isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="/login">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="/register">Register</a>
                                    </li>
                                </>
                            ) : (
                                <div className='d-flex'>
                                    <li className='nav-item'>
                                        <a className='nav-link text-white'><FaUser />{username}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" onClick={handleLogout} href=''>Logout</a>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
