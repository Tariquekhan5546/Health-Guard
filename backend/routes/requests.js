const sendEmail = require("../utils/email"); // ✅ Ensure this function exists
const db = require("../db"); // ✅ Import MySQL connection
const express = require("express");
const router = express.Router();

// ✅ Fetch All Adoption Requests
router.get("/", (req, res) => {
    db.query("SELECT * FROM adoption_requests", (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

// ✅ Approve or Deny Adoption Request
router.post("/:id", (req, res) => {
    const requestId = req.params.id;
    const { status } = req.body;

    // ✅ Check if status is valid
    if (status !== "Approved" && status !== "Denied") {
        return res.status(400).json({ error: "Invalid status. Use 'Approved' or 'Denied'." });
    }

    // ✅ Check if request exists in MySQL
    db.query("SELECT * FROM adoption_requests WHERE id = ?", [requestId], (err, results) => {
        if (err) {
            console.error("❌ Database query error:", err);
            return res.status(500).json({ error: "Database error." });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Request not found." });
        }

        const request = results[0];

        // 📧 Send Email Notification
        sendEmail(
            request.email,
            `Adoption Request ${status}`,
            `Dear ${request.name},\n\nWe appreciate your interest in adopting "${request.pet_name}". We would like to inform you that your request has been ${status.toLowerCase()}. Our team will reach out to you soon with further details.\nIn the meantime, feel free to contact us if you have any questions.\n\nBest regards,\nTeam PawsNest.`
        );

        // ✅ Delete from database after approval/denial
        db.query("DELETE FROM adoption_requests WHERE id = ?", [requestId], (deleteErr) => {
            if (deleteErr) {
                console.error("❌ Error deleting request:", deleteErr);
                return res.status(500).json({ error: "Could not remove request." });
            }

            res.json({ message: `Request ${status.toLowerCase()} and removed.`, request });
        });
    });
});

module.exports = router;
