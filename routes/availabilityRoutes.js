const express = require("express");

const router = express.Router();

const availabilityController = require("../controllers/availabilityController");

router.get("/", availabilityController.getAllAvailability);

router.post("/", availabilityController.createAvailability);

router.get("/:id", availabilityController.getAvailabilityById);

router.put("/:id", availabilityController.updateAvailability);

router.delete("/:id", availabilityController.deleteAvailability);

module.exports = router;