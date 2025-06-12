import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCar, FaShoppingCart, FaTools, FaUser, FaPaypal, FaArrowRight, FaAngleRight } from 'react-icons/fa';
import { GoCheck } from "react-icons/go";

const BookingSummary = () => {
    const [bookings, setBookings] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/get-booking/${userId}`)
            .then(res => setBookings(res.data.bookings))
            .catch(err => console.error("Error fetching bookings:", err));
    }, []);

    return (
        <div className="contanier-fluid BookingPageBackgroundColor" style={{paddingBottom:'50px', paddingTop:'50px'}}>
            <div className="container">
                <h3 className="fw-bold text-center">Booking Summary</h3>
                {bookings.length > 0 ? (
                    <div className="card p-4 shadow-lg cardBG mt-5">
                        <div className='d-flex justify-content-between'>
                            <h5 className="fw-bold text-white">Booking Details</h5>
                            <div className="d-flex gap-2">
                                <a className='text-white' href="/">
                                    <FaCar size={35} color="white" /><FaTools size={20} color="white" />
                                </a>
                                <h4 className='text-white m-0 ms-0 mx-3'>Gear Shifter</h4>
                            </div>
                        </div>
                        <hr />
                        <strong className="text-white">User ID:</strong> <p className="text-white m-0 p-0">{bookings[0].userId} </p>
                        <br />
                        <strong className="text-white">Status:</strong> <span className="text-white text-center bg-success w-100">{bookings[0].status}<GoCheck /></span>
                        <hr />

                        <h6 className="fw-bold text-white">Booked Services</h6>

                        {bookings.map((booking) => (
                            <div key={booking._id}>
                                {booking.services.map((service, index) => (
                                    <div key={index} className="card shadow-sm mb-4 p-3 w-100 bookingCardBg">
                                        <div className="d-flex flex-column align-items-start">
                                            <div className="w-100">
                                                <h5 className="fw-bold">{service.name}</h5>
                                                <p className="text-muted">{service.description}</p>
                                                <span className="fw-bold">Duration:</span> {service.duration}
                                                <br />
                                                <span className="fw-bold text-success">₹{service.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <hr />
                        <div className="col-sm-6 col-md-6 col-lg-12 border-top">
                            {bookings.map((booking) => (
                                <div key={booking._id}>
                                    {booking.services.map((service, index) => (
                                        <div key={index} className="">
                                            <p className="fw-bold text-white mt-3">Bill Details</p>
                                            <div className=" justify-content-between">
                                                <div className="d-flex justify-content-between text-white">
                                                    <p>Item Total</p>
                                                    <p>₹ {service.price}</p>
                                                </div>
                                                <div className="d-flex justify-content-between border-bottom text-white">
                                                    <p>Safety & Warrent Fees</p>
                                                    <p>₹ 99</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-between border-bottom mt-2">
                            <p className="fs-5 text-white fw-bold">Total Amount</p>
                            <p className="fs-5 text-white fw-bold">₹ {bookings[0].totalAmount + 99}</p>
                        </div>
                        <button className="btn btn-primary mt-3 w-100 mb-3" data-bs-toggle="modal" data-bs-target="#paymentModal">
                            Pay Via UPI <FaPaypal />
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-muted">No bookings found.</p>
                )}
            </div>
            <div className="modal fade" id="paymentModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-white">Scan & Pay via UPI</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <img src="http://localhost:5000/uploads/logos/GP.png" alt="UPI QR Code" className="img-fluid" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BookingSummary;