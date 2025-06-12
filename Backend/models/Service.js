const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    carBrand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    carModel: { type: mongoose.Schema.Types.ObjectId, ref: "Model" },
    fuelType: { type: String, enum: ["Petrol", "Diesel", "Electric", "CNG"] },
    services: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: String, required: true },
    }],
});

const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;