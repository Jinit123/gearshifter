import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [catcherror, setCatchError ] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/admin`, data);

      if (res.data.user.role !== "admin") {
        setError("NOt a admin");
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("role", res.data.user.role);
        setUser(res.data.user);
        setShowModal(true);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 2000);
      }
    } catch (err) {
      setCatchError("Access Denied!");
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div>
      <div className="container mt-5">
        <div className='row'>
          <div className='col-12 col-lg-4'>

          </div>
          <div className='col-12 col-md-12 col-lg-4'>
            <form className="border p-5 rounded w-100" onSubmit={handleSubmit}>
              <h2 className="text-center mb-4 pb-4 text-dark">Admin Login</h2>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setData({ ...data, email: e.target.value })} required />
              </div>

              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setData({ ...data, password: e.target.value })} required />
              </div>
              <button type="submit" className="btn text-white w-100 bg-danger">Login Now</button>
              {error && <p className='text-danger text-center mt-3'>{error}</p>}
              {catcherror && <p className='text-danger text-center mt-3'>{catcherror}</p>}
            </form>
          </div>
          <div className='col-12 col-lg-4'></div>
        </div>
      </div>
    </div>
  )
}

export default Login
