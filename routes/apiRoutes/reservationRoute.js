const express = require('express');
const router = express.Router({ mergeParams: true});
const reservationController = require('../../controllers/apiControllers/reservationController');

router.post('/', reservationController.postReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:idReservation', reservationController.getReservation);
router.delete('/:idReservation', reservationController.deleteReservation);

module.exports = router;