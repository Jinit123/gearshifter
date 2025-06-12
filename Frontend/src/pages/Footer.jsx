import React from 'react'
import { FaCar, FaTools } from 'react-icons/fa'
import GooglePlay from '../assets/GooglePlay.png'
import AppStore from '../assets/AppStore.png'

const Footer = () => {
    return (
        <div className='container-fluid m-0 p-0 FooterBackgroundColor'>
            <footer className="text-center text-lg-start text-white pt-5">
                
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="#" className="me-4 text-reset"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="me-4 text-reset"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="me-4 text-reset"><i className="fab fa-google"></i></a>
                        <a href="#" className="me-4 text-reset"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="me-4 text-reset"><i className="fab fa-linkedin"></i></a>
                        <a href="#" className="me-4 text-reset"><i className="fab fa-github"></i></a>
                    </div>
                </section>

                <section className="mt-5">
                    <div className="container text-md-start">
                        <div className="row">

                            <div className="col-md-3 col-lg-3 col-xl-3 mb-4 text-center text-md-start">
                                <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
                                    <FaCar size={35} />
                                    <FaTools size={20} />
                                    <h4 className="text-white m-0">Gear Shifter</h4>
                                </div>
                                <p>Shift Gears, Drive Confidence.</p>
                            </div>

                            <div className="col-md-5 col-lg-5 col-xl-5 mb-4">
                                <div className="row">
                                    <div className="col-6">
                                        <h6 className="text-uppercase fw-bold mb-3">Services</h6>
                                        <p><a href="#" className="text-reset text-decoration-none">Body Parts</a></p>
                                        <p><a href="#" className="text-reset text-decoration-none">Lights</a></p>
                                        <p><a href="#" className="text-reset text-decoration-none">Tyres & Wheels</a></p>
                                        <p><a href="#" className="text-reset text-decoration-none">Suspension</a></p>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-uppercase fw-bold mb-3">Services</h6>
                                        <p><a href="#" className="text-reset text-decoration-none">Engine</a></p>
                                        <p><a href="#" className="text-reset text-decoration-none">Brakes</a></p>
                                        <p><a href="#" className="text-reset text-decoration-none">Interior Cleaning</a></p>
                                        <p><a href="#" className="text-reset text-decoration-none">Car Painting</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
                                <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> Ahmedabad, India</p>
                                <p><i className="fas fa-envelope me-3"></i> gearshifter@gmail.com</p>
                                <p><i className="fas fa-phone me-3"></i> +91 12345 67888</p>
                                <p><i className="fas fa-print me-3"></i> +91 12345 67889</p>
                            </div>

                            <div className="col-md-1 col-lg-1 col-xl-1 d-flex flex-column align-items-center justify-content-center">
                                <img src={GooglePlay} alt="Google Play" className="img-fluid" style={{ maxWidth: '180px' }} />
                                <img src={AppStore} alt="App Store" className="img-fluid" style={{ maxWidth: '170px' }} />
                            </div>

                        </div>
                    </div>
                </section>

                <div className="text-center p-4 bg-dark">
                    © 2025 Copyright <a className="text-reset fw-bold" href="#">GearShifter</a>
                    <span className="text-decoration-none"> || All Rights Reserved</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer
