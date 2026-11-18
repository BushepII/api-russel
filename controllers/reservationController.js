const mongoose = require('mongoose');
const reservationService = require('../services/reservationService');


const parseFrenchDate = (value) => {
    if (typeof value !== 'string') {
        return null;
    }

    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

    if (!match) {
        return null;
    }

    const [, day, month, year] = match.map(Number);

    const date = new Date(Date.UTC(year, month-1, day));

    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
    ) {
        return null;
    }

    return date;
}

exports.postReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { clientName, boatName, checkIn, checkOut } = req.body ?? {};

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: 'Invalid catway ID'
            });
        }

        const start = new Date(parseFrenchDate(checkIn));
        const end = new Date(parseFrenchDate(checkOut));

        if (
            typeof clientName !== 'string' || !clientName.trim() ||
            typeof boatName !== 'string' || !boatName.trim() ||
            !checkIn || !checkOut ||
            !Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || start >= end
        ) {
            return res.status(400).json({
                message: 'Invalid reservation data'
            });
        }

        const reservation = await reservationService.createReservation({
            catway: id,
            clientName: clientName.trim(),
            boatName: boatName.trim(),
            checkIn: start,
            checkOut: end
        });

        if (reservation.error === 'CATWAY_NOT_FOUND') {
            return res.status(404).json({
                message: 'Catway not found'
            });
        }

        if (reservation.error === "CATWAY_UNAVAILABLE") {
            return res.status(409).json({
                message: 'Catway already reserved for this period'
            });
        }

        return res.status(201).json({
            message: 'Reservation created successfully',
        })
    } catch(error) {
        console.log(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.getAllReservations = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: 'Invalid catway or reservation ID'
            });
        }

        const reservations = await reservationService.getAllReservations(id);

        if (reservations.length === 0) {
            return res.status(200).json({
                message: 'This catway has no reservations'
            })
        }

        return res.status(200).json({
            message: 'Reservations retrieved successfully',
            reservations
        });
    } catch (error) {
        console.log(error);

        return res.status(500).send('Internal server error');
    }
}

exports.getReservation = async (req, res) => {
    try {
        const { id, idReservation } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)  || !mongoose.isObjectIdOrHexString(idReservation)){
            return res.status(400).json({
                message: 'Invalid reservation ID'
            });
        }

        const reservation = await reservationService.getReservation(id, idReservation);

        if (!reservation) {
            return res.status(404).json({
                message: 'Reservation not found'
            });
        }

        return res.status(200).json({
            message: 'Reservation retrieved successfully',
            reservation
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).send('Internal server error');
    }
}

exports.deleteReservation = async (req, res) => {
    try {
        const { id, idReservation } = req.params;

        if (!mongoose.isObjectIdOrHexString(id) || !mongoose.isObjectIdOrHexString(idReservation)) {
            return res.status(400).json({
                message: 'Invalid catway or reservation ID'
            });
        }

        const reservation = await reservationService.deleteReservation(id, idReservation);

        if (!reservation) {
            return res.status(404).json({
                message: 'Reservation not found'
            });
        }

        return res.status(200).json({
            message: 'Reservation deleted successfully'
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}