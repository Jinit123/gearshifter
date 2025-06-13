import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, data);
            if(res.status == 201){
                const registeredName = res.data.user?.name || data.name;
                localStorage.setItem("username", registeredName);

                let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

                if(!registeredUsers.some(user => user.email === data.email)){
                    registeredUsers.push({name: data.name, email: data.email});
                    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
                }
                navigate("/login");
            }
        } catch (e) {
            alert(e.response.data.msg);
        }
    };

    return (
        <div className="container mt-5">
            <div className='row'>
                <div className='col-12 col-lg-4'>

                </div>
                <div className='col-12 col-md-12 col-lg-5'>
                    <form className="border p-5 rounded w-100" onSubmit={handleSubmit}>
                        <h2 className="text-center text-dark mb-4 pb-4">Register To Gear Shifter</h2>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Name</label>
                            <input type="text" className="form-control" id="email" placeholder="Enter name" onChange={(e) => setData({ ...data, name: e.target.value })} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setData({ ...data, email: e.target.value })} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pwd2" className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setData({ ...data, password: e.target.value })} required />
                        </div>
                        <button type="submit" className="btn text-white w-100 bg-danger">Register Now</button>
                    </form>
                </div>
                <div className='col-12 col-lg-4'>

                </div>
            </div>

        </div>
    );
};

export default Register;