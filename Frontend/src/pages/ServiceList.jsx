import React from 'react'

const ServiceList = () => {
    return (
        <div className='container-fluid PriceListBackgroundColor p-5'>
            <div className="container">
                <h3 className='text-center mb-5'>Car Service Price List</h3>
                <div className='table-responsive'>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th className='w-50'>Service Types</th>
                                <th className='w-25'>Price Starts From</th>
                                <th className='w-25'>Savings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Car Inspection/Diagnostics</td>
                                <td>499</td>
                                <td>15%</td>
                            </tr>
                            <tr>
                                <td>Inspection</td>
                                <td>499</td>
                                <td>25%</td>
                            </tr>
                            <tr>
                                <td>Door Glass Replacement</td>
                                <td>850</td>
                                <td>30%</td>
                            </tr>
                            <tr>
                                <td>Wind Shield Replacement</td>
                                <td>1000</td>
                                <td>25%</td>
                            </tr>
                            <tr>
                                <td>Accessories</td>
                                <td>1099</td>
                                <td>30%</td>
                            </tr>
                            <tr>
                                <td>Regular AC Service</td>
                                <td>1299</td>
                                <td>15%</td>
                            </tr>
                            <tr>
                                <td>Front Head Lights</td>
                                <td>1399</td>
                                <td>30%</td>
                            </tr>
                            <tr>
                                <td>Tyres & Wheel Care</td>
                                <td>1690</td>
                                <td>25%</td>
                            </tr>
                            <tr>
                                <td>Basic Service</td>
                                <td>2099</td>
                                <td>10%</td>
                            </tr>
                            <tr>
                                <td>Basic Service</td>
                                <td>2099</td>
                                <td>10%</td>
                            </tr>
                            <tr>
                                <td>Batteries</td>
                                <td>2999</td>
                                <td>15%</td>
                            </tr>
                            <tr>
                                <td>Ceramic Coating</td>
                                <td>14999</td>
                                <td>25%</td>
                            </tr>
                            <tr>
                                <td>Full Body Dent Paint</td>
                                <td>23000</td>
                                <td>15%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ServiceList
