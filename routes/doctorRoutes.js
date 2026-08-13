const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all doctors
router.get(
    "/",
    authMiddleware,
    doctorController.getAllDoctors
);

// Create doctor
router.post(
    "/",
    authMiddleware,
    doctorController.createDoctor
);

// Get doctor by ID
router.get(
    "/:id",
    authMiddleware,
    doctorController.getDoctorById
);

// Update doctor
router.put(
    "/:id",
    authMiddleware,
    doctorController.updateDoctor
);

// Delete doctor
router.delete(
    "/:id",
    authMiddleware,
    doctorController.deleteDoctor
);

module.exports = router;