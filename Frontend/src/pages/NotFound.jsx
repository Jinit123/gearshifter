import React from 'react'
import { Link } from 'react-router-dom'
import Model from '../assets/Model-3.png'
import Broken from '../assets/BrokenCar.png'

const NotFound = () => {
    return (
        <div className='container-fluid bg-dark pb-5'>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-2"></div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-8">
                    <div className="d-flex justify-content-center flex-column align-items-center">
                        <p className='NotFoundText'>404!</p>
                        <img src={Broken} alt="" className='img-fluid NotFoundImage mt-5' />
                        <p className='mt-5 fs-4'>Oops! you're looking for page is not found.</p>
                        <Link to="/" className='btn btn-danger'>Go Back Home</Link>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-2"></div>
            </div>
        </div >
    )
}

export default NotFound
