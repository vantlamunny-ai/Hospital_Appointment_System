const db = require("../config/db");


// GET ALL APPOINTMENTS
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


// CREATE APPOINTMENT
async function createAppointment(appointmentData) {

    const {
        patient_id,
        doctor_id,
        hospital_id,
        availability_id,
        reason
    } = appointmentData;


    // 1. Check availability
    const checkQuery = `
        SELECT availability_id, doctor_id, status
        FROM doctor_availability
        WHERE availability_id = ?
    `;

    const [slots] = await db.query(
        checkQuery,
        [availability_id]
    );

    if (slots.length === 0) {
        throw new Error("Availability slot not found");
    }

    if (slots[0].status !== "AVAILABLE") {
        throw new Error("This availability slot is not available");
    }


    // 2. Create appointment
    const appointmentQuery = `
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

    const [result] = await db.query(
        appointmentQuery,
        [
            patient_id,
            doctor_id,
            hospital_id,
            availability_id,
            reason
        ]
    );


    // 3. Mark availability as BOOKED
    const updateAvailabilityQuery = `
        UPDATE doctor_availability
        SET status = 'BOOKED'
        WHERE availability_id = ?
    `;

    await db.query(
        updateAvailabilityQuery,
        [availability_id]
    );


    // 4. Find doctor's user ID
    const doctorQuery = `
        SELECT user_id
        FROM doctors
        WHERE doctor_id = ?
    `;

    const [doctors] = await db.query(
        doctorQuery,
        [doctor_id]
    );

    if (doctors.length === 0) {
        throw new Error("Doctor not found");
    }

    const doctorUserId = doctors[0].user_id;


    // 5. Create notification for doctor
    const notificationQuery = `
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

    await db.query(
        notificationQuery,
        [
            doctorUserId,
            "New Appointment Request",
            "You have received a new appointment request.",
            "APPOINTMENT",
            result.insertId
        ]
    );


    // 6. Return appointment
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


// GET APPOINTMENT BY ID
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

    const [rows] = await db.query(
        query,
        [id]
    );

    return rows[0];
}


// UPDATE APPOINTMENT
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

    const [result] = await db.query(
        query,
        [
            patient_id,
            doctor_id,
            hospital_id,
            availability_id,
            status,
            reason,
            id
        ]
    );

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


// DELETE APPOINTMENT
async function deleteAppointment(id) {

    const query = `
        DELETE FROM appointments
        WHERE appointment_id = ?
    `;

    const [result] = await db.query(
        query,
        [id]
    );

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