const doctorService = require("../services/doctorService");

async function getAllDoctors(req, res) {
    try {
        const doctors = await doctorService.getAllDoctors();

        res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            data: doctors
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function createDoctor(req, res) {
    try {
        const doctor = await doctorService.createDoctor(req.body);

        res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            data: doctor
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getDoctorById(req, res) {
    try {
        const { id } = req.params;

        const doctor = await doctorService.getDoctorById(id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            data: doctor
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updateDoctor(req, res) {
    try {
        const { id } = req.params;

        const updatedDoctor =
            await doctorService.updateDoctor(id, req.body);

        if (!updatedDoctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            data: updatedDoctor
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteDoctor(req, res) {
    try {
        const { id } = req.params;

        const doctor = await doctorService.deleteDoctor(id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
            data: doctor
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllDoctors,
    createDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};