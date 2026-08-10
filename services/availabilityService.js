const db = require("../config/db");


async function getAllAvailability() {

    const query = `
        SELECT
            availability_id,
            doctor_id,
            available_date,
            start_time,
            end_time,
            status
        FROM doctor_availability
    `;

    const [rows] = await db.query(query);

    return rows;
}


async function createAvailability(availabilityData) {

    const {
        doctor_id,
        available_date,
        start_time,
        end_time,
        status
    } = availabilityData;

    const query = `
        INSERT INTO doctor_availability
        (
            doctor_id,
            available_date,
            start_time,
            end_time,
            status
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        doctor_id,
        available_date,
        start_time,
        end_time,
        status || "AVAILABLE"
    ]);

    return {
        availability_id: result.insertId,
        doctor_id,
        available_date,
        start_time,
        end_time,
        status: status || "AVAILABLE"
    };
}


async function getAvailabilityById(id) {

    const query = `
        SELECT
            availability_id,
            doctor_id,
            available_date,
            start_time,
            end_time,
            status
        FROM doctor_availability
        WHERE availability_id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}


async function updateAvailability(id, availabilityData) {

    const {
        doctor_id,
        available_date,
        start_time,
        end_time,
        status
    } = availabilityData;

    const query = `
        UPDATE doctor_availability
        SET
            doctor_id = ?,
            available_date = ?,
            start_time = ?,
            end_time = ?,
            status = ?
        WHERE availability_id = ?
    `;

    const [result] = await db.query(query, [
        doctor_id,
        available_date,
        start_time,
        end_time,
        status,
        id
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        availability_id: id,
        doctor_id,
        available_date,
        start_time,
        end_time,
        status
    };
}


async function deleteAvailability(id) {

    const query = `
        DELETE FROM doctor_availability
        WHERE availability_id = ?
    `;

    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        availability_id: id
    };
}


module.exports = {
    getAllAvailability,
    createAvailability,
    getAvailabilityById,
    updateAvailability,
    deleteAvailability
};