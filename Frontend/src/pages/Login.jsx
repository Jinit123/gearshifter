import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LogginSuccessModal from './LogginSuccessModal'
import Car from '../assets/Taycan.png'
import { Link } from 'react-router-dom'

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Login Backend URL:", import.meta.env.VITE_BACKEND_URL);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.userId);
      setUser(res.data.user);

      setShowModal(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div className='container-fluid'>
      <div className="container mt-5">
        <div className='row'>
          <div className='col-12 col-md-12 col-lg-4'>
            {/* <img src={Car} alt="" srcset="" className='img-fluid' /> */}
          </div>
          <div className='col-12 col-md-12 col-lg-4'>
            <form className="border p-5 rounded w-100" onSubmit={handleSubmit}>
              <h2 className="text-center text-dark mb-4 pb-4">Login To Gear Shifter</h2>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e) => setData({ ...data, email: e.target.value })} required />
              </div>

              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setData({ ...data, password: e.target.value })} required />
              </div>
              <button type="submit" className="btn text-white w-100 bg-danger">Login Now</button>
              <p className='text-center'>New User? <Link to="/register">Register</Link></p>
            </form>
          </div>
          <div className='col-12 col-lg-4'>

            <LogginSuccessModal
              show={showModal}
              onClose={() => setShowModal(false)}
              user={user}
              handleClose={handleCloseModal}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
