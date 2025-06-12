import React from 'react';
import Bosch from '../assets/Bosch.png';
import Valeo from '../assets/Valeo.png';
import Mahle from '../assets/Mahle.png';
import Ntn from '../assets/Ntn.png';
import Sachs from '../assets/Sachs.png';
import Textar from '../assets/Textar.png';

const OurPartners = () => {
    return (
        <div className="container-fluid OurPartnersBackgroundColor">
            <div className="container">
                <h3 className="text-center pt-5">Our Partners</h3>
                <div className="partner-scroll-wrapper">
                    <div className="partner-scroll">
                        {[Bosch, Valeo, Mahle, Ntn, Sachs, Textar, Bosch, Valeo, Mahle, Ntn, Sachs, Textar].map((logo, index) => (
                            <div key={index} className="partner-logo">
                                <img src={logo} alt="Partner Logo" className="img-fluid logoImage" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurPartners;