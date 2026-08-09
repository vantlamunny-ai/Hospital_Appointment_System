const db = require("../config/db");

async function getAllPatients() {
    const query = `
        SELECT
            p.patient_id,
            p.user_id,
            u.name,
            u.email,
            u.phone,
            p.date_of_birth,
            p.gender,
            p.blood_group,
            p.address,
            p.city
        FROM patients p
        JOIN users u ON p.user_id = u.user_id
    `;

    const [rows] = await db.query(query);

    return rows;
}

async function createPatient(patientData) {

    const {
        name,
        email,
        password,
        phone,
        date_of_birth,
        gender,
        blood_group,
        address,
        city
    } = patientData;

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        // Create user
        const userQuery = `
            INSERT INTO users
            (name, email, password_hash, phone, role)
            VALUES (?, ?, ?, ?, 'PATIENT')
        `;

        const [userResult] = await connection.query(
            userQuery,
            [name, email, password, phone]
        );

        const userId = userResult.insertId;

        // Create patient
        const patientQuery = `
            INSERT INTO patients
            (user_id, date_of_birth, gender, blood_group, address, city)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [patientResult] = await connection.query(
            patientQuery,
            [
                userId,
                date_of_birth,
                gender,
                blood_group,
                address,
                city
            ]
        );

        await connection.commit();

        return {
            patient_id: patientResult.insertId,
            user_id: userId,
            name,
            email,
            phone,
            date_of_birth,
            gender,
            blood_group,
            address,
            city
        };

    }
    catch (error) {

        await connection.rollback();

        throw error;

    }
    finally {

        connection.release();

    }
}
async function getPatientById(id) {

    const query = `
        SELECT
            p.patient_id,
            p.user_id,
            u.name,
            u.email,
            u.phone,
            p.date_of_birth,
            p.gender,
            p.blood_group,
            p.address,
            p.city
        FROM patients p
        JOIN users u ON p.user_id = u.user_id
        WHERE p.patient_id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}
async function updatePatient(id, patientData) {

    const {
        name,
        email,
        phone,
        date_of_birth,
        gender,
        blood_group,
        address,
        city
    } = patientData;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Update user details
        const userQuery = `
            UPDATE users u
            JOIN patients p ON u.user_id = p.user_id
            SET
                u.name = ?,
                u.email = ?,
                u.phone = ?
            WHERE p.patient_id = ?
        `;

        await connection.query(userQuery, [
            name,
            email,
            phone,
            id
        ]);

        // Update patient details
        const patientQuery = `
            UPDATE patients
            SET
                date_of_birth = ?,
                gender = ?,
                blood_group = ?,
                address = ?,
                city = ?
            WHERE patient_id = ?
        `;

        const [result] = await connection.query(patientQuery, [
            date_of_birth,
            gender,
            blood_group,
            address,
            city,
            id
        ]);

        if (result.affectedRows === 0) {
            await connection.rollback();
            return null;
        }

        await connection.commit();

        return {
            patient_id: id,
            name,
            email,
            phone,
            date_of_birth,
            gender,
            blood_group,
            address,
            city
        };
    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
}
async function deletePatient(id) {

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Get the user_id before deleting patient
        const [rows] = await connection.query(
            "SELECT user_id FROM patients WHERE patient_id = ?",
            [id]
        );

        if (rows.length === 0) {
            await connection.rollback();
            return null;
        }

        const userId = rows[0].user_id;

        // Delete patient
        await connection.query(
            "DELETE FROM patients WHERE patient_id = ?",
            [id]
        );

        // Delete linked user
        await connection.query(
            "DELETE FROM users WHERE user_id = ?",
            [userId]
        );

        await connection.commit();

        return {
            patient_id: id,
            user_id: userId
        };
    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
}
module.exports = {
    getAllPatients,
    createPatient,
     getPatientById,
     updatePatient,
    deletePatient
};