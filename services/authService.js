const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(userData) {
    const { name, email, password, phone, role } = userData;

    const [existingUsers] = await db.query(
        "SELECT user_id FROM users WHERE email = ?",
        [email]
    );

    if (existingUsers.length > 0) {
        throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
        `INSERT INTO users
        (name, email, password_hash, phone, role)
        VALUES (?, ?, ?, ?, ?)`,
        [name, email, passwordHash, phone, role]
    );

    const token = jwt.sign(
        {
            user_id: result.insertId,
            role: role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        user: {
            user_id: result.insertId,
            name,
            email,
            phone,
            role
        },
        token
    };
}

async function loginUser(email, password) {
    const [users] = await db.query(
        `SELECT user_id, name, email, password_hash,
                phone, role, is_active
         FROM users
         WHERE email = ?`,
        [email]
    );

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = users[0];

    if (user.is_active !== 1) {
        throw new Error("User account is inactive");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            user_id: user.user_id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        },
        token
    };
}

module.exports = {
    registerUser,
    loginUser
};