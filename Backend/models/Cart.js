const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    services: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String },
        description: { type: String },
        duration: { type: String }
    }]
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;