import React from 'react';
import { FaBatteryFull, FaBroom, FaCar, FaSnowflake, FaSprayCan, FaStar, FaWater, FaWrench } from 'react-icons/fa'
import Taycan from '../assets/Taycan.png';
import Banner from '../assets/Gearshifter.png';
import M from '../assets/M.png'
import F from '../assets/F.png'
import { Link, useNavigate } from 'react-router-dom';
import MainServices from './MainServices';

const About = () => {

    const naviagte = useNavigate();

    return (
        <div className='container-fluid AboutPageBackgroundColor'>
            <div className='row'>
                {/* Left Side Content */}
                <div className='col-12 col-sm-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-center'>
                    <div className='text-center p-5'>
                        <h5 className='fw-bold fs-1' style={{ color: '#FF4C4C' }}>About GearShifter</h5>
                        <h4 className='text-white mt-2 fw-bold text-uppercase fs-5'>We're a leading online car's marketplace</h4>
                        <p className='text-white mt-3 fs-6 text-center px-5'>
                            Gearshifter is a leading online platform that offers a wide range of comprehensive car services for car owners.
                            With a commitment to providing convenience, reliability, and expertise, Gearshifter connects car owners with
                            trusted service providers, ensuring a seamless experience from start to finish.
                        </p>
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-3">
                                <div className="card w-100 mt-3 glass-card">
                                    <div className='d-flex justify-content-center pt-3'>
                                        <h3 className='text-white'>20+</h3>
                                    </div>
                                    <p className='text-white'>Car Services</p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card w-100 mt-3 glass-card">
                                    <div className='d-flex justify-content-center pt-3'>
                                        <h3 className='text-white'>200+</h3>
                                    </div>
                                    <p className='text-white'>Service Providers</p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card w-100 mt-3 glass-card">
                                    <div className='d-flex justify-content-center pt-3'>
                                        <h3 className='text-white'>15+</h3>
                                    </div>
                                    <p className='text-white'>Active Locations</p>
                                </div>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                        <Link href="" className='btn btn-danger mt-5' to='/mainservices'>Check Our Services</Link>
                    </div>
                </div>

                <div className='col-12 col-sm-12 col-md-6 col-lg-6 p-0'>
                    <img src={Taycan} alt="Gearshifter Banner" className='img-fluid mt-5' style={{ objectFit: 'cover' }} />
                </div>

                <div className='container my-5'>
                    <h2 className='text-center text-white fw-bold pb-4'>Customers Testimonials</h2>
                    <div className='testimonial-container'>
                        <div className="testimonial-scroll">
                            <div className='row justify-content-center'>
                                <div className='col-lg-2 col-md-6'>
                                    <div className='card p-4 glass-card text-white'>
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <img class="card-img-top img-fluid w-25" src={M} alt="Card image" />
                                            <div className="d-flex mt-3">
                                                <FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' />
                                            </div>
                                            <p className='mt-3 text-center'>"GearShifter made my car servicing so easy! Reliable, fast, and affordable!"</p>
                                            <h5 className='fw-bold'>- Rahul Sharma</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-md-6'>
                                    <div className='card p-4 glass-card text-white'>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <img class="card-img-top img-fluid w-25" src={F} alt="Card image" />
                                            <div className='d-flex mt-3'>
                                                <FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' />
                                            </div>
                                            <p className='mt-3 text-center'>"I found the best car service provider through GearShifter! Highly recommend."</p>
                                            <h5 className='fw-bold'>- Priya Mehta</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-md-6'>
                                    <div className='card p-4 glass-card text-white'>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <img class="card-img-top img-fluid w-25" src={M} alt="Card image" />
                                            <div className='d-flex mt-3'>
                                                <FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' />
                                            </div>
                                            <p className='mt-3 text-center'>"A seamless experience from start to finish! Amazing platform for car owners."</p>
                                            <h5 className='fw-bold'>- Amit Patel</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-md-6'>
                                    <div className='card p-4 glass-card text-white'>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <img class="card-img-top img-fluid w-25" src={M} alt="Card image" />
                                            <div className='d-flex mt-3'>
                                                <FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' />
                                            </div>
                                            <p className='mt-3 text-center'>"A seamless experience from start to finish! Amazing platform for car owners."</p>
                                            <h5 className='fw-bold'>- Pranav Shukla</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-md-6'>
                                    <div className='card p-4 glass-card text-white'>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <img class="card-img-top img-fluid w-25" src={F} alt="Card image" />
                                            <div className='d-flex mt-3'>
                                                <FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' />
                                            </div>
                                            <p className='mt-3 text-center'>"A seamless experience from start to finish! Amazing platform for car owners."</p>
                                            <h5 className='fw-bold'>- Sakshi Singh</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-md-6'>
                                    <div className='card p-4 glass-card text-white'>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <img class="card-img-top img-fluid w-25" src={M} alt="Card image" />
                                            <div className='d-flex mt-3'>
                                                <FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' /><FaStar className='text-warning' />
                                            </div>
                                            <p className='mt-3 text-center'>"A seamless experience from start to finish! Amazing platform for car owners."</p>
                                            <h5 className='fw-bold'>- Vinay Sharma</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About;
