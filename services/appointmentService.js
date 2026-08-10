const db = require("../config/db");


async function getAllAppointments() {

    const query = `
        SELECT
            appointment_id,
            patient_id,
            doctor_id,
            hospital_id,
            availability_id,
            status,
            reason,
            created_at
        FROM appointments
    `;

    const [rows] = await db.query(query);

    return rows;
}


async function createAppointment(appointmentData) {

    const {
        patient_id,
        doctor_id,
        hospital_id,
        availability_id,
        reason
    } = appointmentData;

    const query = `
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            hospital_id,
            availability_id,
            reason
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        patient_id,
        doctor_id,
        hospital_id,
        availability_id,
        reason
    ]);

    return {
        appointment_id: result.insertId,
        patient_id,
        doctor_id,
        hospital_id,
        availability_id,
        status: "PENDING",
        reason
    };
}


async function getAppointmentById(id) {

    const query = `
        SELECT
            appointment_id,
            patient_id,
            doctor_id,
            hospital_id,
            availability_id,
            status,
            reason,
            created_at
        FROM appointments
        WHERE appointment_id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}


async function updateAppointment(id, appointmentData) {

    const {
        patient_id,
        doctor_id,
        hospital_id,
        availability_id,
        status,
        reason
    } = appointmentData;

    const query = `
        UPDATE appointments
        SET
            patient_id = ?,
            doctor_id = ?,
            hospital_id = ?,
            availability_id = ?,
            status = ?,
            reason = ?
        WHERE appointment_id = ?
    `;

    const [result] = await db.query(query, [
        patient_id,
        doctor_id,
        hospital_id,
        availability_id,
        status,
        reason,
        id
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        appointment_id: id,
        patient_id,
        doctor_id,
        hospital_id,
        availability_id,
        status,
        reason
    };
}


async function deleteAppointment(id) {

    const query = `
        DELETE FROM appointments
        WHERE appointment_id = ?
    `;

    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        appointment_id: id
    };
}


module.exports = {
    getAllAppointments,
    createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};