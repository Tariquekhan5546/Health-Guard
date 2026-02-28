const express = require("express");
const router = express.Router();

// ✅ Admin Login Route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password123") {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

module.exports = router;
