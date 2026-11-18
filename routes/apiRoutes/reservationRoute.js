const express = require('express');
const router = express.Router({ mergeParams: true});
const reservationController = require('../../controllers/reservationController');

router.post('/', reservationController.postReservation);

module.exports = router;