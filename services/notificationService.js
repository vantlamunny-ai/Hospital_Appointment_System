const db = require("../config/db");


async function getAllNotifications() {

    const query = `
        SELECT
            notification_id,
            recipient_user_id,
            title,
            message,
            type,
            reference_id,
            is_read,
            created_at
        FROM notifications
    `;

    const [rows] = await db.query(query);

    return rows;
}


async function createNotification(notificationData) {

    const {
        recipient_user_id,
        title,
        message,
        type,
        reference_id
    } = notificationData;

    const query = `
        INSERT INTO notifications
        (
            recipient_user_id,
            title,
            message,
            type,
            reference_id
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        recipient_user_id,
        title,
        message,
        type,
        reference_id
    ]);

    return {
        notification_id: result.insertId,
        recipient_user_id,
        title,
        message,
        type,
        reference_id,
        is_read: 0
    };
}


async function getNotificationById(id) {

    const query = `
        SELECT
            notification_id,
            recipient_user_id,
            title,
            message,
            type,
            reference_id,
            is_read,
            created_at
        FROM notifications
        WHERE notification_id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}


async function updateNotification(id, notificationData) {

    const {
        recipient_user_id,
        title,
        message,
        type,
        reference_id,
        is_read
    } = notificationData;

    const query = `
        UPDATE notifications
        SET
            recipient_user_id = ?,
            title = ?,
            message = ?,
            type = ?,
            reference_id = ?,
            is_read = ?
        WHERE notification_id = ?
    `;

    const [result] = await db.query(query, [
        recipient_user_id,
        title,
        message,
        type,
        reference_id,
        is_read,
        id
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        notification_id: id,
        recipient_user_id,
        title,
        message,
        type,
        reference_id,
        is_read
    };
}


async function deleteNotification(id) {

    const query = `
        DELETE FROM notifications
        WHERE notification_id = ?
    `;

    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        notification_id: id
    };
}


module.exports = {
    getAllNotifications,
    createNotification,
    getNotificationById,
    updateNotification,
    deleteNotification
};