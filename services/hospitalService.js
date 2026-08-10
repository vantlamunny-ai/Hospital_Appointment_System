const db = require("../config/db");

async function getAllHospitals() {

    const query = `
        SELECT
            hospital_id,
            hospital_name,
            address,
            city,
            phone,
            email,
            latitude,
            longitude,
            is_active,
            created_at
        FROM hospitals
    `;

    const [rows] = await db.query(query);

    return rows;
}


async function createHospital(hospitalData) {

    const {
        hospital_name,
        address,
        city,
        phone,
        email,
        latitude,
        longitude,
        is_active
    } = hospitalData;

    const query = `
        INSERT INTO hospitals
        (
            hospital_name,
            address,
            city,
            phone,
            email,
            latitude,
            longitude,
            is_active
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        hospital_name,
        address,
        city,
        phone,
        email,
        latitude,
        longitude,
        is_active
    ]);

    return {
        hospital_id: result.insertId,
        hospital_name,
        address,
        city,
        phone,
        email,
        latitude,
        longitude,
        is_active
    };
}


async function getHospitalById(id) {

    const query = `
        SELECT
            hospital_id,
            hospital_name,
            address,
            city,
            phone,
            email,
            latitude,
            longitude,
            is_active,
            created_at
        FROM hospitals
        WHERE hospital_id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}


async function updateHospital(id, hospitalData) {

    const {
        hospital_name,
        address,
        city,
        phone,
        email,
        latitude,
        longitude,
        is_active
    } = hospitalData;

    const query = `
        UPDATE hospitals
        SET
            hospital_name = ?,
            address = ?,
            city = ?,
            phone = ?,
            email = ?,
            latitude = ?,
            longitude = ?,
            is_active = ?
        WHERE hospital_id = ?
    `;

    const [result] = await db.query(query, [
        hospital_name,
        address,
        city,
        phone,
        email,
        latitude,
        longitude,
        is_active,
        id
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        hospital_id: id,
        hospital_name,
        address,
        city,
        phone,
        email,
        latitude,
        longitude,
        is_active
    };
}


async function deleteHospital(id) {

    const query = `
        DELETE FROM hospitals
        WHERE hospital_id = ?
    `;

    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        hospital_id: id
    };
}


module.exports = {
    getAllHospitals,
    createHospital,
    getHospitalById,
    updateHospital,
    deleteHospital
};