const Catway = require('../models/catwayModel');

exports.createCatway = async (catwayNumber, type, catwayState) => {
    const catway = new Catway({
        catwayNumber: catwayNumber,
        type: type,
        catwayState: catwayState
    });

    return await catway.save();
}