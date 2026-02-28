// Developed by [Tarique Khan]
const mysql = require("mysql2");
require("dotenv").config(); // ✅ Load .env variables

// ✅ Create MySQL connection
const db = mysql.createPool({
    host: process.env.DB_HOST, // ✅ Use environment variables
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1); // Stop server if DB fails
    }
    console.log("✅ Connected to MySQL Database!");
    connection.release(); // Release the connection
});

module.exports = db;
