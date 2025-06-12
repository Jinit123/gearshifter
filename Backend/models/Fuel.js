const mongoose = require('mongoose');

const FuelSchema = new mongoose.Schema({
    carModel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required: true,
    },
    fuelTypes: [
        {
            name: {
                type: String,
                enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
                required: true
            },
            icon: {
                type: String,
                required: true
            }
        }
    ]
});

const Fuel = mongoose.model("Fuel", FuelSchema);
module.exports = Fuel;
