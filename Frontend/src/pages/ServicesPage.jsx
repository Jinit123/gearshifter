import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaClock, FaPaypal } from 'react-icons/fa';
import Cart from '../assets/Cart.png'

const ServicesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { brand, model, fuelTypes, image } = location.state || {};
    const [services, setServices] = useState([]);
    const [cart, setCart] = useState({ services: [] });
    const [totalPrice, setTotalPrice] = useState(0);
    const colors = ["#FAFBFF", "#FAFBFF", "#FAFBFF"]

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (brand && model && fuelTypes) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/services?brand=${brand._id}&model=${model._id}&fuel=${fuelTypes.name}`)
                .then(res => setServices(res.data.services))
                .catch(err => console.error("Error fetching services:", err));
        }
    }, [brand, model, fuelTypes]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            console.error("User ID is missing!");
            return;
        }

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/cart/${userId}`)
            .then(res => {
                console.log("Cart API Response:", JSON.stringify(res.data.cart, null, 2));
                setCart(res.data.cart || { services: [] });
            })
            .catch(err => console.error("Error fetching cart:", err));
    }, []);

    useEffect(() => {
        if (cart?.services?.length > 0) {
            const total = cart.services.reduce((sum, service) => sum + service.price, 0);
            setTotalPrice(total);
        } else {
            setTotalPrice(0);
        }
    }, [cart]);

    const handleAddToCart = async (service) => {
        if (!userId || !service._id) {
            console.error("Invalid User ID or Service ID!");
            return;
        }

        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/cart/add`, {
            userId,
            serviceId: service._id,
            name: service.name,
            price: service.price,
        })
            .then(res => {
                console.log("Updated Cart Response:", res.data.cart);
                setCart(res.data.cart);

            })
            .catch(err => console.error("Error adding to cart:", err));
    };

    const handleRemoveFromCart = (serviceId) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/cart/remove`, { userId, serviceId })
            .then(res => {
                console.log("Updated Cart After Removal:", res.data.cart);
                setCart(res.data.cart || { services: [] });

            })
            .catch(err => console.error("Error removing from cart:", err));
    };

    const handleBookService = () => {
        if (!cart?.services?.length) {
            console.error("No services in cart to book!");
            return;
        }

        console.log("Booking Request Data:", JSON.stringify({
            userId,
            services: cart.services.map(service => ({
                _id: service._id,
                name: service.name,
                price: service.price,
                description: service.description,
                duration: service.duration
            })),
            totalAmount: totalPrice
        }, null, 2));

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/book-service`, {
            userId,
            services: cart.services.map(service => ({
                _id: service._id,
                name: service.name,
                price: service.price,
                description: service.description,
                duration: service.duration
            })),
            totalAmount: totalPrice
        })
            .then(res => {
                console.log("Booking Confirmed:", JSON.stringify(res.data.booking, null, 2));
                alert("Booking Confirmed!");
                navigate('/booking-summary')
            })
            .catch(err => console.error("Error booking service:", err));
    };

    return (
        <div className="container-fluid ServicePageBackgroundColor">
            <div className="row">
                <div className="col-lg-9 p-4">
                    <h3>Available Services for <b>{brand?.brand}</b> <b>{model?.modelName}</b> <b>({fuelTypes?.name})</b></h3>
                    <div className="row" style={{ marginTop: '30px' }}>
                        {services.length > 0 && services[0]?.services ? (
                            services[0].services.map((service, index) => (
                                <div key={service._id || index} className="col-md-12 col-lg-4">
                                    <div className={`card shadow-sm p-3 mt-5 ${colors[index % colors.length]} position-relative ${index === 1 ? "most-popular-border" : ""}`}>
                                        {index === 1 && (
                                            <div className="most-popular-badge">MOST POPULAR</div>
                                        )}
                                        <div className='d-flex justify-content-center'>
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}${service.imageUrl}`} alt={service.name} className="img-thumbnail" style={{ width: '200px' }} />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title fs-3 fw-bold text-center text-dark">{service.name}</h5>
                                            <p className="card-text text-center">{service.description}</p>
                                            <div className="d-flex justify-content-center">
                                                <span className="fw-bold text-success fs-4">₹{service.price}</span>
                                                <span className="badge bg-danger fs-6 durationBadge"><FaClock /> {service.duration}</span>
                                            </div>
                                            <button onClick={() => handleAddToCart(service)} className='btn btn-dark text-white mt-2 w-100'>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-danger">No Services Found!</p>
                        )}
                    </div>
                </div>

                <div className="col-lg-3 p-4">
                    <div className="card shadow">
                        <div className="d-flex justify-content-center">
                            <img src={`${import.meta.env.VITE_BACKEND_URL}${image}`} alt={model?.modelName} className="img-fluid" style={{ width: '200px' }} />
                        </div>
                        <div className="card-body text-center d-flex gap-3 flex-wrap justify-content-center">
                            <h5 className="fw-bold">{brand?.brand}</h5>
                            <h5 className="fw-bold">{model?.modelName}</h5>
                            <span className="fs-6 fw-bold text-muted">{fuelTypes?.name}</span>
                            <span className='fs-6 text-danger'>Premium Car</span>
                        </div>

                        <hr />
                        <div className="p-3">
                            <h6 className="fw-bold mx-2">Cart Services:</h6>
                            {cart?.services?.length > 0 ? (
                                <div className="table-responsive"> {/* Yeh table ko scrollable banayega */}
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Service Name</th>
                                                <th>Price (₹)</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.services.map((service, index) => (
                                                <tr key={`${service._id}-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{service.name}</td>
                                                    <td className="fw-bold text-success">₹{service.price}</td>
                                                    <td>
                                                        <button onClick={() => handleRemoveFromCart(service._id)} className='btn btn-sm btn-danger'>
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <img src={Cart} className='img-fluid' alt="" />
                                // <p className="text-center text-muted">No services added.</p>
                            )}
                            <hr />
                            <div className='d-flex justify-content-between mt-3'>
                                <h6 className='fw-bold mx-2'>Total Price: </h6>
                                <h6 className='fw-bold mx-2 text-success'>₹{totalPrice}</h6>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className="btn btn-success w-75 mb-3" onClick={handleBookService}>
                                Book Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
