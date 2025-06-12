const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    services: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String
        },
        description: {
            type: String
        },
        duration: {
            type: String
        },
        carBrand: {
            type: String
        },
        carModel: {
            type: String
        },
        fuelType: {
            type: String
        },
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed"],
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;