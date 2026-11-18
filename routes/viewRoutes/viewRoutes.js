const express = require('express');
const router = express.Router();

const viewController = require('../../controllers/viewControllers/homeController');

router.get('/', viewController.getHome);

module.exports = router;