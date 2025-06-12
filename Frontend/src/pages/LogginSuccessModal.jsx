import React from 'react'

const LogginSuccessModal = ({show, onClose, user}) => {
    return (
        <div className={`modal fade ${show ? 'show d-block':''}`} tabIndex="-1">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Login Successful</h5>
                        <button type='button' className='btn-close' onClick={onClose}></button>
                    </div>
                    <div className='modal-body'>
                        <p>Welcome back, <b className='text-danger'>{user?.name}</b></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogginSuccessModal
