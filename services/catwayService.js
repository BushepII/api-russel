const Catway = require('../models/catwayModel');

exports.createCatway = async (catwayNumber, type, catwayState) => {
    const catway = new Catway({
        catwayNumber: catwayNumber,
        type: type,
        catwayState: catwayState
    });

    return await catway.save();
}

exports.getAllCatways = async () => {
    return await Catway.find();
}

exports.getCatway = async (id) => {
    return await Catway.findById(id);
}