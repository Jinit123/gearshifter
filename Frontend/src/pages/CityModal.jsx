import React from 'react'
import '../App.css'

const CityModal = ({ cities, loadingCities, setFormData, showModal, setShowModal }) => {
    return (
        <div className={`modal ${showModal ? "d-block" : "d-none"}`} tabIndex="-1">
            <div className='modal-dialog modal-lg modal-dialog-centered'>
                <div className="modal-content modal-glass">
                    <div className="modal-header">
                        <h5 className="modal-title text-white">Choose Your City</h5>
                        <button type="button" className="btn-close text-white" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        {loadingCities ? (
                            <div className="d-flex justify-content-center">
                                <div className='loader'></div>
                            </div>
                        ) : (
                            <div className="list-group">
                                {cities.map((city) => {
                                    return (
                                        <button key={city._id} className='list-group-item list-group-item-action d-flex justify-content-center shadow'
                                            onClick={() => { setFormData(pre => ({ ...pre, city: city.name })); setShowModal(false); }}>
                                            <div className='d-flex flex-column justify-content-center align-items-center p-2'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}${city.icon}`} className="img-fluid city-icon" />
                                                <p className='fs-6 mt-3 pb-0 mb-0'>{city.name}</p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityModal
