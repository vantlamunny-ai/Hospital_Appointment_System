const db = require("../config/db");

async function getAllDoctors() {

    const query = `
        SELECT
            d.doctor_id,
            d.user_id,
            u.name,
            u.email,
            u.phone,
            d.specialization,
            d.qualification,
            d.experience_years,
            d.consultation_fee,
            d.hospital_id
        FROM doctors d
        JOIN users u ON d.user_id = u.user_id
    `;

    const [rows] = await db.query(query);

    return rows;
}


async function createDoctor(doctorData) {

    const {
        name,
        email,
        password,
        phone,
        specialization,
        qualification,
        experience_years,
        consultation_fee,
        hospital_id
    } = doctorData;

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        // Create doctor user account
        const userQuery = `
            INSERT INTO users
            (name, email, password_hash, phone, role)
            VALUES (?, ?, ?, ?, 'DOCTOR')
        `;

        const [userResult] = await connection.query(
            userQuery,
            [name, email, password, phone]
        );

        const userId = userResult.insertId;

        // Create doctor profile
        const doctorQuery = `
            INSERT INTO doctors
            (
                user_id,
                specialization,
                qualification,
                experience_years,
                consultation_fee,
                hospital_id
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [doctorResult] = await connection.query(
            doctorQuery,
            [
                userId,
                specialization,
                qualification,
                experience_years,
                consultation_fee,
                hospital_id
            ]
        );

        await connection.commit();

        return {
            doctor_id: doctorResult.insertId,
            user_id: userId,
            name,
            email,
            phone,
            specialization,
            qualification,
            experience_years,
            consultation_fee,
            hospital_id
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


async function getDoctorById(id) {

    const query = `
        SELECT
            d.doctor_id,
            d.user_id,
            u.name,
            u.email,
            u.phone,
            d.specialization,
            d.qualification,
            d.experience_years,
            d.consultation_fee,
            d.hospital_id
        FROM doctors d
        JOIN users u ON d.user_id = u.user_id
        WHERE d.doctor_id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}


async function updateDoctor(id, doctorData) {

    const {
        name,
        email,
        phone,
        specialization,
        qualification,
        experience_years,
        consultation_fee,
        hospital_id
    } = doctorData;

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        // Update user information
        const userQuery = `
            UPDATE users u
            JOIN doctors d ON u.user_id = d.user_id
            SET
                u.name = ?,
                u.email = ?,
                u.phone = ?
            WHERE d.doctor_id = ?
        `;

        await connection.query(userQuery, [
            name,
            email,
            phone,
            id
        ]);

        // Update doctor information
        const doctorQuery = `
            UPDATE doctors
            SET
                specialization = ?,
                qualification = ?,
                experience_years = ?,
                consultation_fee = ?,
                hospital_id = ?
            WHERE doctor_id = ?
        `;

        const [result] = await connection.query(
            doctorQuery,
            [
                specialization,
                qualification,
                experience_years,
                consultation_fee,
                hospital_id,
                id
            ]
        );

        if (result.affectedRows === 0) {
            await connection.rollback();
            return null;
        }

        await connection.commit();

        return {
            doctor_id: id,
            name,
            email,
            phone,
            specialization,
            qualification,
            experience_years,
            consultation_fee,
            hospital_id
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


async function deleteDoctor(id) {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [rows] = await connection.query(
            "SELECT user_id FROM doctors WHERE doctor_id = ?",
            [id]
        );

        if (rows.length === 0) {
            await connection.rollback();
            return null;
        }

        const userId = rows[0].user_id;

        await connection.query(
            "DELETE FROM doctors WHERE doctor_id = ?",
            [id]
        );

        await connection.query(
            "DELETE FROM users WHERE user_id = ?",
            [userId]
        );

        await connection.commit();

        return {
            doctor_id: id,
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
async function getDoctorById(id) {
    const query = `
        SELECT
            d.doctor_id,
            d.user_id,
            u.name,
            u.email,
            u.phone,
            d.specialization,
            d.qualification,
            d.experience_years,
            d.consultation_fee,
            d.hospital_id
        FROM doctors d
        JOIN users u ON d.user_id = u.user_id
        WHERE d.doctor_id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}
async function updateDoctor(id, doctorData) {
    const {
        name,
        email,
        phone,
        specialization,
        qualification,
        experience_years,
        consultation_fee,
        hospital_id
    } = doctorData;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const userQuery = `
            UPDATE users u
            JOIN doctors d ON u.user_id = d.user_id
            SET
                u.name = ?,
                u.email = ?,
                u.phone = ?
            WHERE d.doctor_id = ?
        `;

        await connection.query(userQuery, [
            name,
            email,
            phone,
            id
        ]);

        const doctorQuery = `
            UPDATE doctors
            SET
                specialization = ?,
                qualification = ?,
                experience_years = ?,
                consultation_fee = ?,
                hospital_id = ?
            WHERE doctor_id = ?
        `;

        const [result] = await connection.query(
            doctorQuery,
            [
                specialization,
                qualification,
                experience_years,
                consultation_fee,
                hospital_id,
                id
            ]
        );

        if (result.affectedRows === 0) {
            await connection.rollback();
            return null;
        }

        await connection.commit();

        return {
            doctor_id: id,
            name,
            email,
            phone,
            specialization,
            qualification,
            experience_years,
            consultation_fee,
            hospital_id
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
async function deleteDoctor(id) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [rows] = await connection.query(
            "SELECT user_id FROM doctors WHERE doctor_id = ?",
            [id]
        );

        if (rows.length === 0) {
            await connection.rollback();
            return null;
        }

        const userId = rows[0].user_id;

        await connection.query(
            "DELETE FROM doctors WHERE doctor_id = ?",
            [id]
        );

        await connection.query(
            "DELETE FROM users WHERE user_id = ?",
            [userId]
        );

        await connection.commit();

        return {
            doctor_id: id,
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
    getAllDoctors,
    createDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};