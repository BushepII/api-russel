const express = require('express');
const router = express.Router();
const catwayController = require('../../controllers/catwayController');

router.post("/", catwayController.addCatway);
router.get("/", catwayController.getAllCatways);
router.get("/:id", catwayController.getCatway);
router.patch("/:id", catwayController.updateCatway);

module.exports = router;