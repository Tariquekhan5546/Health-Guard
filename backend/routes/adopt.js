const express = require("express");
const db = require("../db"); // MySQL connection
const router = express.Router();

router.get("/", (req, res) => {
    const sql = "SELECT id, name, age, contact, email, pet_name, status FROM adoption_requests";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Database Fetch Error:", err);
            return res.status(500).json({ error: "Database error. Could not fetch requests." });
        }
        res.json(results);
    });
});

// Handle adoption request submission
router.post("/", (req, res) => {
    const { name, age, contact, email, petAdopt, status } = req.body;

    // Insert data into MySQL
    const sql = "INSERT INTO adoption_requests (name, age, contact, email ,pet_name, status) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, age, contact, email, petAdopt, status];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Database Insertion Error:", err);
            return res.status(500).json({ error: "Database error. Could not submit request." });
        }
        res.json({ message: "Adoption request submitted successfully!" });
    });
});

module.exports = router;
