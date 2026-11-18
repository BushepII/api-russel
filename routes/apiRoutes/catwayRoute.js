const express = require('express');
const router = express.Router();
const catwayController = require('../../controllers/apiControllers/catwayController');

router.post("/", catwayController.addCatway);
router.get("/", catwayController.getAllCatways);
router.get("/:id", catwayController.getCatway);
router.patch("/:id", catwayController.updateCatway);
router.put("/:id", catwayController.replaceCatway);
router.delete("/:id", catwayController.deleteCatway);

module.exports = router;