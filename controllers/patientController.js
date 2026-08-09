const patientService = require("../services/patientService");

async function getAllPatients(req, res) {
    try {
        const patients = await patientService.getAllPatients();

        res.status(200).json({
            success: true,
            message: "Patients fetched successfully",
            data: patients
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function createPatient(req, res) {
    try {
        const patient = await patientService.createPatient(req.body);

        res.status(201).json({
            success: true,
            message: "Patient created successfully",
            data: patient
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getPatientById(req, res) {
    try {
        const { id } = req.params;

        const patient = await patientService.getPatientById(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updatePatient(req, res) {
    try {
        const { id } = req.params;

        const updatedPatient =
            await patientService.updatePatient(id, req.body);

        if (!updatedPatient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient updated successfully",
            data: updatedPatient
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deletePatient(req, res) {
    try {
        const { id } = req.params;

        const patient = await patientService.deletePatient(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient deleted successfully",
            data: patient
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
    getAllPatients,
    createPatient,
    getPatientById,
    updatePatient,
    deletePatient
};