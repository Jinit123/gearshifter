import React from 'react';
import Car from '../assets/CarFinal.png';
import BMW from '../assets/BMWPNG.png'
import Model from '../assets/Model-3.png'
import CarAnimate from '../assets/Animated.mp4'
import I4 from '../assets/I4.png'
import BMWI4 from '../assets/BMWI4.png'
import Tycon from '../assets/Taycan.png'
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import CityModal from './CityModal';
import BrandModal from './BrandModal';
import CarModal from './CarModel';
import FuelModal from './FuelModal';
import Harrier from '../assets/Harrier.png'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [formData, setFormData] = useState({
    city: "",
    brand: "",
    model: "",
    fuelTypes: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showCarModel, setShowCarModel] = useState(false);
  const [showFuelModal, setShowFuelModel] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedCar, setSelectedCar] = useState({
    image: "uploads/Mustang.png",
    brand: "",
    model: "",
    fuelType: ""
  });
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingCarModels, setLoadingCarModels] = useState(false);
  const [loadingFuels, setLoadingFuels] = useState(false);




  useEffect(() => {
    console.log("Debug: formData =", formData);
  }, [formData]);

  useEffect(() => {
    console.log("Debug: formData.fuelTypes =", formData.fuelTypes);
  }, [formData.fuelTypes]);

  useEffect(() => {

    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

    setLoadingCities(true);
    const startTime = Date.now();
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/cities`)
      .then(res => {
        console.log("Cities API Response:", res.data);
        setCities(res.data);
      })
      .catch(err => console.log("Error fetching cities:", err))
      // .finally(()=> setLoadingCities(false));
      .finally(() => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        const minLoaderTime = 1000;
        const remainingTime = minLoaderTime - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => setLoadingCities(false), remainingTime)
        } else {
          setLoadingCities(false);
        }
      })
  }, []);

  useEffect(() => {
    if (formData.city) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/brands`)
        .then(res => {
          console.log("Brands API Response:", res.data);
          setBrands(res.data);
        })
        .catch(err => console.log("Error fetching brands", err));
    }
  }, [formData.city]);

  useEffect(() => {
    if (formData.brand && formData.brand._id) {
      console.log("Brand Selected:", formData.brand._id);
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/models?brand=${formData.brand._id}`)
        .then(res => setModels(res.data))
        .catch(err => console.log("Error fetching models:", err))
    }
  }, [formData.brand]);

  useEffect(() => {
    if (formData.model && formData.model._id) {
      console.log("Fetching Fuel Types for Model:", formData.model._id);
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/fuel?model=${formData.model._id}`)
        .then(res => {
          console.log("Fuel Types API Response:", res.data);
          setFuelTypes(res.data.fuelTypes || res.data);
        })
        .catch(err => console.error("Error fetching fuel types:", err));
    } else {
      console.log("Model ID is missing or undefined!");
    }
  }, [formData.model]);

  const handleCheckPrice = () => {
    if (formData.brand && formData.model && formData.fuelTypes) {
      console.log("Navigating with Image:", `/uploads/logos/${formData.model.imageUrl}.png`);

      localStorage.setItem("cart", JSON.stringify({ services: [] }));
      window.dispatchEvent(new Event("storage"));



      navigate('/services', {
        state: {
          brand: formData.brand,
          model: formData.model,
          fuelTypes: formData.fuelTypes,
          image: formData.model.imageUrl
        }
      });
    } else {
      console.log("Missing required selections");
    }
  };

  return (
    <div className='container-fluid backgroundColor'>
      <div className='row'>
        <div className='col-12 col-lg-8 g-0 image-container position-relative'>
          <img src={Harrier} alt="" className='img-fluid w-75 mb-5 pb-5 image' />
          <h2 className='position-absolute slogan'>Restore <br />Revive <br /> Ride</h2>
        </div>
        <div className='col-12 col-lg-4 g-0'>
          <form className=" rounded p-5 w-100 h-100" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-center mb-4 pb-4">Experience The Best Car Services in <span className='fw-bold'>{formData.city || "Your City"}</span></h2>
            <div className="mb-3">
              {/* <label className='form-label'>Select City:</label> */}
              <button type='button' className='btn btn-muted border border-white w-100' style={{ height: '50px' }} onClick={() => setShowModal(true)}>
                <p className='m-0 text-white'>{formData.city ? formData.city : "Select City"}</p>
              </button>
            </div>

            <div className="mb-3">
              {/* <label className='form-label'>Select Brand:</label> */}
              <button type='button' className='btn btn-muted border border-white w-100' style={{ height: '50px' }} onClick={() => setShowBrands(true)}>
                <p className=' m-0 text-white'> {formData.brand?.brand || "Select Brand"}</p>
              </button>
            </div>

            <div className="mb-3">
              {/* <label className='form-label'>Select Car Model:</label> */}
              <button type='button' className='btn btn-muted border border-white w-100' style={{ height: '50px' }} onClick={() => setShowCarModel(true)}>
                <p className='m-0 text-white'> {formData.model?.modelName || "Select Car Model"}</p>
              </button>
            </div>

            <div className="mb-3">
              {/* <label className='form-label'>Select Fuel Type:</label> */}
              <button type='button' className='btn btn-muted border border-white w-100' style={{ height: '50px' }} onClick={() => setShowFuelModel(true)}>
                <p className='m-0 text-white'> {formData.fuelTypes?.name ? formData.fuelTypes.name : "Select Fuel Type"}</p>
              </button>
            </div>

            <button type="submit" className="btn text-dark w-100 bg-white fw-bold" onClick={handleCheckPrice}>Check Price For Free</button>

            <div className='row p-1'>
              <div className='col-6 col-md-6 col-lg-6 border-end border-3'>
                <div className='d-flex align-items-center justify-content-center mt-4'>
                  <FaStar color='green' className='me-2' size={28} />
                  <h3 className='text-success fw-bold'>4.7/</h3>
                  <h5 className='m-0 text-success fw-bold'>5.0</h5>
                </div>
                <p className='text-center'>Based on 10K+ Reviews</p>
              </div>
              <div className='col-6 col-md-6 col-lg-6'>
                <div className='d-flex align-items-center justify-content-center mt-4'>
                  <h3 className='text-danger fw-bold'>2 Million+</h3>
                </div>
                <p className='text-center'>Happy Customers</p>
              </div>
              <CityModal
                cities={cities}
                loadingCities={loadingCities}
                setFormData={setFormData}
                showModal={showModal}
                setShowModal={setShowModal}
              />
              <BrandModal
                brands={brands}
                loadingBrands={loadingBrands}
                setFormData={setFormData}
                showModal={showBrands}
                setShowModal={setShowBrands}
              />
              <CarModal
                models={models}
                loadingCarModels={loadingCarModels}
                setFormData={setFormData}
                showModal={showCarModel}
                setShowModal={setShowCarModel}
              />
              <FuelModal
                fuelTypes={fuelTypes || []}
                loadingFuels={loadingFuels}
                setFormData={setFormData}
                showModal={showFuelModal}
                setShowModal={setShowFuelModel}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home;