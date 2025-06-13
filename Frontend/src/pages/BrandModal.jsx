import React from 'react'
import { FaHouseUser } from 'react-icons/fa';
import '../App.css'

const BrandModal = ({ brands, loadingBrands, setFormData, showModal, setShowModal }) => {
    return (
        <div className={`modal ${showModal ? "d-block" : "d-none"}`} tabIndex="-1">
            <div className='modal-dialog modal-lg modal-dialog-centered'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-white">Choose Your Brand</h5>
                        <button type="button" className="btn-close text-white" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body justify-content-center">
                        {loadingBrands ? (
                            <div className="d-flex justify-content-center">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <div className="list-group">
                                {brands.map((brand) => (
                                    <button key={brand._id} className='list-group-item list-group-item-action d-flex justify-content-center shadow'
                                        onClick={() => {
                                            console.log("Brand Selected in Modal:", brand);
                                            console.log("Image Brand:", `http://localhost:5000${brand.logoUrl}`);
                                            setFormData(pre => ({ ...pre, brand }));
                                            setShowModal(false);
                                        }}>
                                        <div className='d-flex flex-column justify-content-center align-items-center p-2'>
                                            <img src={`${import.meta.env.VITE_BACKEND_URL}${brand.logoUrl}`} className="img-fluid brand-logo" />
                                            <p className='fs-6 brandName mt-2'>{brand.brand}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrandModal
