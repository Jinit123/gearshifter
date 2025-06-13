import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/Admin-Pages/AdminLogin'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './pages/Admin-Pages/AdminDashboard'
import AddUserForm from './pages/Admin-Pages/AddUserForm'
import UpdateUser from './pages/Admin-Pages/UpdateUser'
import ServicesPage from './pages/ServicesPage'
import Footer from './pages/Footer'
import BookingSummary from './pages/BookingSummary'
import { useState } from 'react'
import { useEffect } from 'react'
import HowToBook from './pages/HowToBook'
import OurPartners from './pages/OurPartners'
import ServiceList from './pages/ServiceList'
import NotFound from './pages/NotFound'
import About from './pages/About'
import MainServices from './pages/MainServices'

const App = () => {

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={
          <div>
            <Home />
            <Services />
            <HowToBook />
            <OurPartners />
            <ServiceList />
            <Footer />
          </div>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/*' element={<AdminRoute />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
        <Route path='/admin/create' element={<AddUserForm />}></Route>
        <Route path='/admin/users/:id/' element={<UpdateUser />} />
        <Route path='/booking-summary' element={<BookingSummary />} />
        <Route path='/about' element={
          <div>
            <About />
            <Footer />
          </div>
        } />
        <Route path='/mainservices' element={
          <div>
            <MainServices />
            <Footer />
          </div>
        } />
        <Route path='*' element={
          <div>
            <NotFound />
            <Footer />
          </div>
        } />

        <Route path='/services' element={
          <ProtectedRoute>
            <ServicesPage />
            <Footer />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
