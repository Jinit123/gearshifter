import React from 'react'
import { FaBatteryFull, FaBroom, FaCar, FaSnowflake, FaSprayCan, FaStar, FaWater, FaWrench } from 'react-icons/fa'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { LoaderPinwheel } from 'lucide-react'

const Services = () => {
    return (
        <div className='container-fluid serviceBackgroundColor'>
            <div className='container'>
                <div className='row'>
                    <h3 className='text-center mt-3'>Services Available In <b>Ahmedabad</b></h3>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1' />Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <FaSnowflake color='grey' size={45} />
                            </div>
                            <div className="card-body pt-4">
                                <h6 className="card-title text-center">AC Service</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1'/>Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <FaBatteryFull color='grey' size={45} />
                            </div>
                            <div className="card-body pt-4">
                                <h6 className="card-title text-center">Batteries</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1'/>Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <LoaderPinwheel size={45} color='grey' />
                            </div>
                            <div className="card-body pt-4">
                                <h6 className="card-title text-center">Tyres & Wheel</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1'/>Suggested</span>
                            <div className='d-flex justify-content-center pt-5'>
                             <FaSprayCan size={45} color='grey' />
                            </div>
                            <div className="card-body pt-4">
                                <h6 className="card-title text-center">Detailing</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1' />Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <i className="fa-solid fa-wind fs-1 icon-gradient"></i>
                                <i className="fa-solid fa-shield-halved fs-1 icon-gradient"></i>
                            </div>
                            <div className="card-body pt-4">
                                <h6 className="card-title text-center">Windshields</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1'/>Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <i className="fa-solid fa-screwdriver-wrench fs-1 icon-gradient"></i>
                            </div>
                            <div className="card-body pt-4">
                                <h6 className="card-title text-center">Suspension</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1'/>Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <i className="fa-solid fa-spray-can fs-1 icon-gradient"></i>
                            </div>
                            <div className="card-body pt-4">
                                <h6 className="card-title text-center">Painting</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1' />Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <i className="fa-solid fa-lightbulb fs-1 icon-gradient"></i>
                            </div>
                            <div className="card-body">
                                <h6 className="card-title text-center">Lights</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1' />Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <i className="fa-brands fa-artstation fs-1 icon-gradient"></i>
                            </div>
                            <div className="card-body">
                                <h6 className="card-title text-center">Body Parts</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1' />Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <i className="fa-solid fa-shower fs-1 icon-gradient"></i>
                            </div>
                            <div className="card-body">
                                <h6 className="card-title text-center">Car Spa</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-2'>
                        <div className="card w-100 mt-5 glass-card">
                            <span className='badge bg-light text-danger position-absolute top-0 end-0 border border-danger border-1'><FaStar size={10} className='me-1' />Top Choice</span>
                            <div className='d-flex justify-content-center pt-5'>
                                <i className="fa-solid fa-shield fs-1 icon-gradient"></i>
                            </div>
                            <div className="card-body">
                                <h6 className="card-title text-center">Insurence</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
