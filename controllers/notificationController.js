const notificationService = require("../services/notificationService");


async function getAllNotifications(req, res) {
    try {
        const notifications =
            await notificationService.getAllNotifications();

        res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            data: notifications
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function createNotification(req, res) {
    try {
        const notification =
            await notificationService.createNotification(req.body);

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function getNotificationById(req, res) {
    try {
        const { id } = req.params;

        const notification =
            await notificationService.getNotificationById(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            data: notification
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function updateNotification(req, res) {
    try {
        const { id } = req.params;

        const updatedNotification =
            await notificationService.updateNotification(id, req.body);

        if (!updatedNotification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification updated successfully",
            data: updatedNotification
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


async function deleteNotification(req, res) {
    try {
        const { id } = req.params;

        const notification =
            await notificationService.deleteNotification(id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
            data: notification
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
    getAllNotifications,
    createNotification,
    getNotificationById,
    updateNotification,
    deleteNotification
};