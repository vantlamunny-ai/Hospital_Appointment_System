const hospitalService = require("../services/hospitalService");

async function getAllHospitals(req, res) {
    try {
        const hospitals = await hospitalService.getAllHospitals();

        res.status(200).json({
            success: true,
            message: "Hospitals fetched successfully",
            data: hospitals
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function createHospital(req, res) {
    try {
        const hospital = await hospitalService.createHospital(req.body);

        res.status(201).json({
            success: true,
            message: "Hospital created successfully",
            data: hospital
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getHospitalById(req, res) {
    try {
        const { id } = req.params;

        const hospital = await hospitalService.getHospitalById(id);

        if (!hospital) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            success: true,
            data: hospital
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updateHospital(req, res) {
    try {
        const { id } = req.params;

        const updatedHospital =
            await hospitalService.updateHospital(id, req.body);

        if (!updatedHospital) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Hospital updated successfully",
            data: updatedHospital
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteHospital(req, res) {
    try {
        const { id } = req.params;

        const hospital =
            await hospitalService.deleteHospital(id);

        if (!hospital) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Hospital deleted successfully",
            data: hospital
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
    getAllHospitals,
    createHospital,
    getHospitalById,
    updateHospital,
    deleteHospital
};