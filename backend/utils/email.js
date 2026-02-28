require("dotenv").config(); // ✅ Load .env variables
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // ✅ Use .env variables
        pass: process.env.EMAIL_PASS
    }
});

// 📧 Function to send an email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Email sending failed:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

module.exports = sendEmail;
