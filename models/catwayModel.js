const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        validate: Number.isInteger
    },
    type: {
        type: String,
        required: true,
        enum: ["short", "long"]
    },
    catwayState: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Catway', catwaySchema);