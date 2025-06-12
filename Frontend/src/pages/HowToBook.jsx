import React from 'react'
import { FaCar, FaClock, FaTimes, FaTruck } from 'react-icons/fa'

const HowToBook = () => {
    return (
        <div className='container-fluid HowToBookBackgroundColor pb-5'>
            <div className='container'>
                <div className='row'>
                    <h3 className='text-center mt-5'>How To Book</h3>
                    <div className='col-12 col-sm-12 col-md-4 col-lg-4'>
                        <div className="card w-100 mt-5 bg-primary border-primary border-4 shadow-lg">
                            <div className='d-flex justify-content-center pt-5'>
                                <FaCar size={60} color='lightgrey' />
                            </div>
                            <div className="card-body pt-4">
                                <div className='d-flex justify-content-center'>
                                </div>
                                <h3 className="card-title text-center">Select Your Car</h3>
                                <p className='card-text text-white p-2 text-center'>Choose the perfect care package for your car. Whether it’s regular maintenance, detailing, or repairs—pick what suits your vehicle best!"</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-4 col-lg-4'>
                        <div className="card w-100 mt-5 bg-white border-white border-4">
                            <div className='d-flex justify-content-center pt-5'>
                                <FaClock size={60} color='black' />
                            </div>
                            <div className="card-body pt-4">
                                <h3 className="card-title text-center text-dark">Pick a Convenient Time</h3>
                                <p className='card-text text-dark p-3 pb-4 text-center'>Select a date and time that fits your schedule. We offer flexible slots to ensure hassle-free service at your convenience.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-4 col-lg-4'>
                        <div className="card w-100 mt-5 bg-success border-4 border-success">
                            <div className='d-flex justify-content-center pt-5'>
                                <FaTruck size={60} color='lightgrey' />
                            </div>
                            <div className="card-body pt-4">
                                <h3 className="card-title text-center">Confirm & Get Ready</h3>
                                <p className='card-text text-white p-3 pb-0 text-center'>Complete your booking and relax! Our experts will take care of everything, ensuring top-notch service for your vehicle.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowToBook
