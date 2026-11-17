const express = require('express');
const router = express.Router();
const catwayController = require('../../controllers/catwayController');

router.post("/", catwayController.addCatway);
router.get("/", catwayController.getAllCatways)

module.exports = router;