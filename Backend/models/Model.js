const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

const Model = mongoose.model("Model", ModelSchema);
module.exports = Model;