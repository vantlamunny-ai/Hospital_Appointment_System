const availabilityService = require("../services/availabilityService");


async function getAllAvailability(req, res) {
    try {
        const availability =
            await availabilityService.getAllAvailability();

        res.status(200).json({
            success: true,
            message: "Availability fetched successfully",
            data: availability
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function createAvailability(req, res) {
    try {
        const availability =
            await availabilityService.createAvailability(req.body);

        res.status(201).json({
            success: true,
            message: "Availability created successfully",
            data: availability
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function getAvailabilityById(req, res) {
    try {
        const { id } = req.params;

        const availability =
            await availabilityService.getAvailabilityById(id);

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found"
            });
        }

        res.status(200).json({
            success: true,
            data: availability
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function updateAvailability(req, res) {
    try {
        const { id } = req.params;

        const updatedAvailability =
            await availabilityService.updateAvailability(id, req.body);

        if (!updatedAvailability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            data: updatedAvailability
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function deleteAvailability(req, res) {
    try {
        const { id } = req.params;

        const availability =
            await availabilityService.deleteAvailability(id);

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Availability deleted successfully",
            data: availability
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
    getAllAvailability,
    createAvailability,
    getAvailabilityById,
    updateAvailability,
    deleteAvailability
};