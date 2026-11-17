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

exports.updateCatway = async (id, data) => {
    return await Catway.findByIdAndUpdate(
        id,
        { $set: data },
        {
            new: true,
            runValidators: true
        }
    );
}

exports.replaceCatway = async (id, data) => {
    return await Catway.findOneAndReplace(
        { _id: id },
        data,
        {
            new: true,
            runValidators: true
        }
    )
}

exports.deleteCatway = async (id) => {
    return await Catway.findByIdAndDelete(id);
}