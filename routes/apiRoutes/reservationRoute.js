const express = require('express');
const router = express.Router({ mergeParams: true});
const reservationController = require('../../controllers/reservationController');

router.post('/', reservationController.postReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:idReservation', reservationController.getReservation);

module.exports = router;