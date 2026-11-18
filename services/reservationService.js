const Reservation = require('../models/reservationModel');
const Catway = require('../models/catwayModel');

exports.createReservation = async (data) => {
    const catway = await Catway.findById(data.catway);

    if (!catway) {
        return { error: 'CATWAY_NOT_FOUND'};
    }

    const existingReservation = await Reservation.findOne({
        catway: catway._id,
        checkIn: { $lt: data.checkOut },
        checkOut: { $gt: data.checkIn }
    });

    if (existingReservation) {
        return { error: "CATWAY_UNAVAILABLE"};
    }

    const reservation = new Reservation(data);

    return { reservation: await reservation.save()};
}

exports.getAllReservations = async (catwayId) => {
    return await Reservation.find({ catway: catwayId });
}

exports.getReservation = async (idCatway, idReservation) => {
    return await Reservation.findOne({
        _id: idReservation,
        catway: idCatway
    });
}