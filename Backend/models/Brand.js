const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: true,
    },
    models: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Model"
    }]
});

const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;