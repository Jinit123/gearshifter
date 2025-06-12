import react from 'react'
import '../App.css'
import * as Icon from 'react-icons/fa'

const FuelModal = ({ fuelTypes = [], setFormData, showModal, setShowModal }) => {


    return (
        <div className={`modal ${showModal ? "d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-white">Choose Fuel Type</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        {fuelTypes.length > 0 ? (
                            <div className="list-group mt-4">
                                {fuelTypes.map((fuel, index) => {
                                    const IconComponent = Icon[fuel.icon] || Icon.FaQuestion;
                                    return (
                                        <button key={index} className="list-group-item list-group-item-action d-flex justify-content-center shadow"
                                            onClick={() => {
                                                console.log("Fuel Type Selected:", fuel);
                                                setFormData(prev => ({ ...prev, fuelTypes: { name: fuel.name, icon: fuel.icon } }));
                                                setShowModal(false);
                                            }}>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <IconComponent size={35} color="red" className="me-2 text-danger" />
                                                <p className="fs-6 text-dark m-0">{fuel.name}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-muted">Loading fuel types...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FuelModal;