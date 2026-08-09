const db = require("../config/db");

async function getAllUsers() {
    const [rows] = await db.query("SELECT * FROM users");

    return rows;
}
async function createUser(userData) {
    const { name, email, password, role } = userData;

    const query = `
        INSERT INTO users(name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        name,
        email,
        password,
        role
    ]);

    return {
        user_id: result.insertId,
        name,
        email,
        role
    };
}
async function getUserById(id) {
    const query = `
        SELECT user_id, name, email, phone, role, is_active, created_at
        FROM users
        WHERE user_id = ?
    `;

    const [rows] = await db.query(query, [id]);

    return rows[0];
}
async function updateUser(id, userData) {
    const { name, email, password, role } = userData;

    const query = `
        UPDATE users
        SET
            name = ?,
            email = ?,
            password_hash = ?,
            role = ?
        WHERE user_id = ?
    `;

    const [result] = await db.query(query, [
        name,
        email,
        password,
        role,
        id
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        user_id: id,
        name,
        email,
        role
    };
}
async function deleteUser(id) {
    const query = "DELETE FROM users WHERE user_id = ?";

    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        user_id: id
    };
}
module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};