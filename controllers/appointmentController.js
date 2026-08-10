const appointmentService = require("../services/appointmentService");

async function getAllAppointments(req, res) {
    try {
        const appointments = await appointmentService.getAllAppointments();

        res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: appointments
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function createAppointment(req, res) {
    try {
        const appointment =
            await appointmentService.createAppointment(req.body);

        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: appointment
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function getAppointmentById(req, res) {
    try {
        const { id } = req.params;

        const appointment =
            await appointmentService.getAppointmentById(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            success: true,
            data: appointment
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function updateAppointment(req, res) {
    try {
        const { id } = req.params;

        const updatedAppointment =
            await appointmentService.updateAppointment(id, req.body);

        if (!updatedAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data: updatedAppointment
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function deleteAppointment(req, res) {
    try {
        const { id } = req.params;

        const appointment =
            await appointmentService.deleteAppointment(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
            data: appointment
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
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};