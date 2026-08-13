const express = require("express");

const router = express.Router();

const hospitalController = require("../controllers/hospitalController");
const authMiddleware = require("../middleware/authMiddleware");


// Get all hospitals
router.get(
    "/",
    authMiddleware,
    hospitalController.getAllHospitals
);


// Create hospital
router.post(
    "/",
    authMiddleware,
    hospitalController.createHospital
);


// Get hospital by ID
router.get(
    "/:id",
    authMiddleware,
    hospitalController.getHospitalById
);


// Update hospital
router.put(
    "/:id",
    authMiddleware,
    hospitalController.updateHospital
);


// Delete hospital
router.delete(
    "/:id",
    authMiddleware,
    hospitalController.deleteHospital
);


module.exports = router;