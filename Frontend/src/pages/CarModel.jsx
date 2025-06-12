import React from 'react'
import '../App.css'

const CarModal = ({ models, setFormData, showModal, setShowModal }) => {
    return (
        <div className={`modal ${showModal ? "d-block" : "d-none"}`} tabIndex="-1">
            <div className='modal-dialog modal-lg modal-dialog-centered'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-white">Choose Your Model</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body justify-content-start">
                        <div className="list-group">
                            {models.map((model) => (
                                <button key={model._id} className='list-group-item list-group-item-action d-flex justify-content-center shadow'
                                    onClick={() => {
                                        console.log("Model Selected in Modal:", model);
                                        console.log("Image Model:", `http://localhost:5000${model.imageUrl}`); 
                                        setFormData(pre => ({ ...pre, model }));
                                        setShowModal(false);
                                    }}>
                                    <div className='d-flex flex-column justify-content-center align-items-center p-2'>
                                        <img src={`${import.meta.env.VITE_BACKEND_URL}${model.imageUrl}`} className="img-fluid modelSize" />
                                        <p className='fs-6 mt-2'>{model.modelName}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarModal
