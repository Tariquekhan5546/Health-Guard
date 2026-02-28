require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const twilio = require("twilio");
const cron = require("node-cron");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');
const adoptRoute = require("./routes/adopt");
app.use("/adopt", adoptRoute);


const healthDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
healthDb.connect(err => {
    if (err) console.error("❌ Healthguard DB connection failed:", err);
    else console.log("✅ Connected to healthguard_db");
});
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("./firebase-admin-key.json"))
});

// Registration setup
app.post('/api/register', async (req, res) => {
    const { name, email, contact, gender, dob, state, firebase_uid } = req.body;

    if (!firebase_uid) {
        return res.status(400).json({
            success: false,
            message: "Firebase UID missing"
        });
    }

    // OPTIONAL: check duplicate firebase_uid (recommended)
    healthDb.query(
        "SELECT id FROM users WHERE firebase_uid = ?",
        [firebase_uid],
        (err, rows) => {
            if (err) return res.status(500).json({ success: false });

            if (rows.length > 0) {
                return res.json({
                    success: true,
                    message: "User already registered"
                });
            }

            // 🔥 INSERT WITH firebase_uid
            const query = `
                INSERT INTO users
                (full_name, email, contact_number, gender, dob, state, firebase_uid)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            healthDb.query(
                query,
                [name, email, contact, gender, dob, state, firebase_uid],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ success: false });
                    }

                    res.json({
                        success: true,
                        message: "User registered successfully"
                    });
                }
            );
        }
    );
});


// Login setup
// -------------------- LOGIN WITH JWT --------------------
app.post('/api/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    // 1️⃣ Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);

    const firebaseUID = decoded.uid;
    const email = decoded.email;

    // 2️⃣ Fetch user from MySQL
    const query = "SELECT * FROM users WHERE firebase_uid = ?";
    healthDb.query(query, [firebaseUID], (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ success: false });
      }

      const user = results[0];
      const isAdmin = user.email === process.env.ADMIN_EMAIL;

      // 3️⃣ Issue your existing JWT (optional but recommended)
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        success: true,
        isAdmin,
        user,
        token
      });
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// Subscription setup
app.post('/subscribe', (req, res) => {
    const { subName, subEmail, subPhone, subState, subDistrict, subDisease } = req.body;

    const query = `INSERT INTO subscribers (full_name, email, phone_number, state, district, disease)
                   VALUES (?, ?, ?, ?, ?, ?)`;

    healthDb.query(query, [subName, subEmail, subPhone, subState, subDistrict || null, subDisease], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Subscription failed" });
        }
        res.json({ success: true, message: "Subscribed successfully" });
    });
});
// ---------- Nodemailer Transporter ----------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ---------- Send SMS ----------
async function sendSMS(phone, message) {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    console.log(`✅ SMS sent to ${phone}: ${response.sid}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ SMS failed for ${phone}:`, error.message);
    return { success: false };
  }
}

// ---------- Send Notification ----------
async function sendNotification(recipient, message, recipientType = 'subscriber') {
  try {
    const recipientId = recipient.id;

    // Prevent duplicate notifications
    const [existing] = await healthDb.promise().query(
      `SELECT id FROM notifications
       WHERE ${recipientType === 'subscriber' ? 'subscriber_id' : 'user_id'} = ?
AND recipient_type = ?
AND message = ?
AND YEAR(created_at) = ?
`,
      [recipientId, recipientType, message, new Date().getFullYear()]

    );

    if (existing.length > 0) {
      console.log(`⚠️ Duplicate skipped for ${recipient.full_name}`);
      return;
    }

    // Email
    await transporter.sendMail({
      from: `"Disease Alert" <${process.env.EMAIL_USER}>`,
      to: recipient.email,
      subject: "Disease Alert Notification",
      text: message
    });

    // SMS
    const phone =
      recipientType === "subscriber"
        ? recipient.phone_number
        : recipient.contact_number;

    if (phone) {
      await sendSMS(`+91${phone}`, message);
    }

    // Log notification
    await healthDb.promise().query(
      `INSERT INTO notifications (subscriber_id, user_id, recipient_type, message, sent_via)
       VALUES (?, ?, ?, ?, ?)`,
      [
        recipientType === 'subscriber' ? recipient.id : null,
        recipientType === 'user' ? recipient.id : null,
        recipientType,
        message,
        'email'
      ]
    );

    console.log(`✅ Notification sent to ${recipient.full_name}`);
  } catch (err) {
    console.error("Notification error:", err);
  }
}

// ---------- ALERT CHECK (FINAL FIXED LOGIC) ----------
app.post("/api/alerts/check", async (req, res) => {
  const { entry_id } = req.body;
  const THRESHOLD = 100;

  try {
    // 1️⃣ Fetch approved entry
    const [entries] = await healthDb.promise().query(
      `SELECT id, state, district, disease, is_approved
       FROM disease_counts
       WHERE id = ?`,
      [entry_id]
    );

    if (!entries.length) {
      return res.json({ success: false, message: "Entry not found" });
    }

    const entry = entries[0];

    if (entry.is_approved !== 1) {
      return res.json({
        success: true,
        message: "Entry not approved yet, alerts skipped"
      });
    }

    // 2️⃣ GLOBAL cumulative count (🔥 MAIN FIX)
    const year = new Date().getFullYear();

const [sumRows] = await healthDb.promise().query(
  `SELECT SUM(count) AS total
   FROM disease_counts
   WHERE state = ?
     AND district = ?
     AND disease = ?
     AND year = ?
     AND is_approved = 1`,
  [entry.state, entry.district, entry.disease, year]
);


    const totalCount = sumRows[0].total || 0;

    if (totalCount < THRESHOLD) {
      return res.json({
        success: true,
        message: `Total ${totalCount}, below threshold`
      });
    }

    // 🔮 Simple short-term prediction (rule-based)
const DAILY_GROWTH_RATE = 0.12; // 12% per day (adjustable)

// Predict next 3 days
let predictedCases = totalCount;
for (let i = 0; i < 3; i++) {
  predictedCases = Math.round(predictedCases * (1 + DAILY_GROWTH_RATE));
}

const expectedIncrease = predictedCases - totalCount;

const alertMessage = `⚠️ HIGH ALERT: ${entry.disease} cases in ${entry.district}, ${entry.state}
have crossed the critical threshold of ${THRESHOLD}.

📊 Current confirmed cases: ${totalCount}
📈 Expected rise in next 3 days: +${expectedIncrease}
🔮 Projected cases (3 days): ${predictedCases}

⚠️ Citizens are advised to take preventive measures and stay alert.`;


    // 4️⃣ Notify subscribers (exact match)
    const [subscribers] = await healthDb.promise().query(
      `SELECT * FROM subscribers
       WHERE approved = 1
         AND state = ?
         AND district = ?
         AND disease = ?`,
      [entry.state, entry.district, entry.disease]
    );

    for (const sub of subscribers) {
      await sendNotification(sub, alertMessage, 'subscriber');
    }

    // 5️⃣ Notify users (state-wide)
const [users] = await healthDb.promise().query(
  `SELECT * FROM users
   WHERE state = ?
     AND email != ?`,
  [entry.state, process.env.ADMIN_EMAIL]
);

    for (const user of users) {
      await sendNotification(user, alertMessage, 'user');
    }

    res.json({
      success: true,
      message: "✅ Global threshold crossed. Alerts sent."
    });

  } catch (err) {
    console.error("Alert error:", err);
    res.status(500).json({ success: false });
  }
});


// -------------------- Notifications API --------------------
app.get('/api/notifications', async (req, res) => {
  try {
    const [rows] = await healthDb.promise().query(
      `SELECT n.id, n.message, n.sent_via, n.recipient_type, n.created_at,
              s.full_name AS subscriber_name, s.email AS subscriber_email,
              u.full_name AS user_name, u.email AS user_email
       FROM notifications n
       LEFT JOIN subscribers s ON n.subscriber_id = s.id
       LEFT JOIN users u ON n.user_id = u.id
       ORDER BY n.created_at DESC
       LIMIT 10`
    );

    const notifications = rows.map(n => ({
      id: n.id,
      message: n.message,
      recipient_type: n.recipient_type,
      email: n.recipient_type === 'subscriber' ? n.subscriber_email : n.user_email,
      full_name: n.recipient_type === 'subscriber' ? n.subscriber_name : n.user_name,
      created_at: n.created_at
    }));

    res.json(notifications);
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});
// Get districts by state
app.get("/api/regions/districts/:state", async (req, res) => {
  const { state } = req.params;

  try {
    const [rows] = await healthDb.promise().query(
      `SELECT DISTINCT district 
       FROM areas 
       WHERE state = ?`,
      [state]
    );

    res.json({ success: true, districts: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
// Get areas by district
app.get("/api/regions/areas/:state/:district", async (req, res) => {
  const { state, district } = req.params;

  try {
    const [rows] = await healthDb.promise().query(
      `SELECT area_name 
       FROM areas 
       WHERE state = ? AND district = ?`,
      [state, district]
    );

    res.json({ success: true, areas: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
app.post("/api/reports/submit", async (req, res) => {

  const {
    fullName,
    phone,
    state,
    district,
    area,
    disease,
    diagnosisDate,
    doctorConfirmed
  } = req.body;

  const THRESHOLD = 20; // real-time alert threshold

  try {

    // 🔒 Basic validation
    if (!fullName || !phone || !state || !district || !area || !disease || !diagnosisDate || !doctorConfirmed) {
      return res.json({
        success: false,
        message: "All fields are required."
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.json({
        success: false,
        message: "Invalid phone number."
      });
    }

    // 1️⃣ Validate area exists
    const [areaCheck] = await healthDb.promise().query(
      `SELECT id FROM areas 
       WHERE state = ? AND district = ? AND area_name = ?`,
      [state, district, area]
    );

    if (!areaCheck.length) {
      return res.json({
        success: false,
        message: "Invalid area selected"
      });
    }

    // 2️⃣ Insert individual report
    await healthDb.promise().query(
      `INSERT INTO individual_reports 
       (phone_number, full_name, state, district, area, disease, diagnosis_date, doctor_confirmed, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        phone,
        fullName,
        state,
        district,
        area,
        disease,
        diagnosisDate,
        doctorConfirmed
      ]
    );

    // =====================================================
    // 🚨 PART 1 — REAL-TIME ALERT LOGIC (ALL REPORTS COUNT)
    // =====================================================

    const [countRows] = await healthDb.promise().query(
      `SELECT COUNT(*) AS total
       FROM individual_reports
       WHERE state = ?
         AND district = ?
         AND area = ?
         AND disease = ?
         AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)`,
      [state, district, area, disease]
    );

    const totalCount = countRows[0].total;

    if (totalCount >= THRESHOLD) {

      const message = `⚠️ HIGH ALERT: ${disease} cases in ${area}, ${district}

Reports received in last 24 hours: ${totalCount}

Immediate precautions advised.`;

      const [subs] = await healthDb.promise().query(
        `SELECT * FROM subscribers
         WHERE approved = 1
           AND state = ?
           AND district = ?
           AND area = ?
           AND disease = ?`,
        [state, district, area, disease]
      );

      for (const sub of subs) {
        await sendNotification(sub, message, "subscriber");
      }
    }

    // =====================================================
    // 📊 PART 2 — DASHBOARD UPDATE (ONLY DOCTOR CONFIRMED)
    // =====================================================

    if (doctorConfirmed === "Yes") {

      const currentYear = new Date().getFullYear();

      // 1️⃣ Update state_cases
      await healthDb.promise().query(
        `INSERT INTO state_cases (year, state_ut, cases)
         VALUES (?, ?, 1)
         ON DUPLICATE KEY UPDATE cases = cases + 1`,
        [currentYear, state]
      );

      // 2️⃣ Update district_year_cases
      await healthDb.promise().query(
        `INSERT INTO district_year_cases (state, district, year, cases)
         VALUES (?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE cases = cases + 1`,
        [state, district, currentYear]
      );

      // 3️⃣ Update district_viral_cases (dynamic disease column)

      const diseaseColumnMap = {
        "COVID-19": "covid19",
        "Dengue": "dengue",
        "Chikungunya": "chikungunya",
        "Zika": "zika",
        "HFMD": "hfmd",
        "Hepatitis A/E": "hepatitis_ae",
        "Other": "other_minor_viral",
        "Malaria": "other_minor_viral",
        "Swine Flu": "other_minor_viral"
      };

      const column = diseaseColumnMap[disease];

      if (column) {
        await healthDb.promise().query(
          `INSERT INTO district_viral_cases (district, year, ${column})
           VALUES (?, ?, 1)
           ON DUPLICATE KEY UPDATE ${column} = ${column} + 1`,
          [district, currentYear]
        );
      }
    }

    res.json({
      success: true,
      message: "Report submitted successfully"
    });

  } catch (err) {

    if (err.code === "ER_DUP_ENTRY") {
      return res.json({
        success: false,
        message: "You have already reported this disease today."
      });
    }

    console.error(err);
    res.status(500).json({ success: false });
  }
});



// ================= 1PM DAILY AREA ALERT (ROLLING WINDOW) =================

cron.schedule("0 13 * * *", async () => {
  console.log("🕐 Running 1PM rolling-window regional alert job...");

  try {

    // 1️⃣ Get all unique active region+disease combinations
    const [regions] = await healthDb.promise().query(
      `SELECT DISTINCT state, district, area, disease
       FROM individual_reports`
    );

    for (const region of regions) {

      // 2️⃣ Get last window record
      const [windowRow] = await healthDb.promise().query(
        `SELECT * FROM area_alert_windows
         WHERE state = ?
           AND district = ?
           AND area = ?
           AND disease = ?`,
        [
          region.state,
          region.district,
          region.area,
          region.disease
        ]
      );

      let windowStart = new Date(0);

      if (windowRow.length) {
        windowStart = windowRow[0].last_summary_sent_at || new Date(0);
      }

      // 3️⃣ Count reports since last summary
      const [countRows] = await healthDb.promise().query(
        `SELECT COUNT(*) AS total
         FROM individual_reports
         WHERE state = ?
           AND district = ?
           AND area = ?
           AND disease = ?
           AND created_at > ?`,
        [
          region.state,
          region.district,
          region.area,
          region.disease,
          windowStart
        ]
      );

      const totalCount = countRows[0].total;

      if (totalCount <= 0) continue;

      // 4️⃣ Build summary message
      const message = `📢 DAILY UPDATE: ${region.disease} cases in ${region.area}, ${region.district}

🕐 Reports received since last update: ${totalCount}

Stay cautious and follow safety guidelines.`;

      // 5️⃣ Get subscribers
      const [subs] = await healthDb.promise().query(
        `SELECT * FROM subscribers
         WHERE approved = 1
           AND state = ?
           AND district = ?
           AND area = ?
           AND disease = ?`,
        [
          region.state,
          region.district,
          region.area,
          region.disease
        ]
      );

      for (const sub of subs) {
        await sendNotification(sub, message, "subscriber");
      }

      // 6️⃣ Update or Insert window record
      if (windowRow.length) {
        await healthDb.promise().query(
          `UPDATE area_alert_windows
           SET last_summary_sent_at = NOW(),
               threshold_sent_at = NULL
           WHERE id = ?`,
          [windowRow[0].id]
        );
      } else {
        await healthDb.promise().query(
          `INSERT INTO area_alert_windows
           (state, district, area, disease, last_summary_sent_at)
           VALUES (?, ?, ?, ?, NOW())`,
          [
            region.state,
            region.district,
            region.area,
            region.disease
          ]
        );
      }

    }

    console.log("✅ 1PM rolling-window alert job completed");

  } catch (err) {
    console.error("❌ 1PM alert job error:", err);
  }
});


// Admin Dashboard Counts API
app.get('/api/admin/stats', (req, res) => {
  const stats = {};

  // 1. Count subscribers
  healthDb.query("SELECT COUNT(*) AS count FROM subscribers", (err, subResult) => {
    if (err) {
      console.error("DB error (subscribers):", err);
      return res.status(500).json({ success: false, message: "DB error (subscribers)" });
    }
    stats.subscribers = subResult[0].count;

    // 2. Count users (excluding admin)
    healthDb.query("SELECT COUNT(*) AS count FROM users WHERE id != 3", (err, userResult) => {
      if (err) {
        console.error("DB error (users):", err);
        return res.status(500).json({ success: false, message: "DB error (users)" });
      }
      stats.users = userResult[0].count; // admin excluded

      // 3. Count disease entries
      healthDb.query("SELECT COUNT(*) AS count FROM disease_counts", (err, entryResult) => {
        if (err) {
          console.error("DB error (disease_counts):", err);
          return res.status(500).json({ success: false, message: "DB error (disease_counts)" });
        }
        stats.entries = entryResult[0].count;

        // 4. Count notifications
        healthDb.query("SELECT COUNT(*) AS count FROM notifications", (err, notifResult) => {
          if (err) {
            console.error("DB error (notifications):", err);
            return res.status(500).json({ success: false, message: "DB error (notifications)" });
          }
          stats.notifications = notifResult[0].count;

          // ✅ Send all stats
          res.json({ success: true, stats });
        });
      });
    });
  });
});
// Get all disease entries (with approval status)
app.get('/api/admin/entries', (req, res) => {
  const query = `
    SELECT 
      dc.id,
      dc.user_id,
      u.full_name AS user_full_name,
      u.email AS user_email,
      dc.state,
      dc.district,
      dc.disease,
      dc.count,
      dc.added_at,
      dc.is_approved
    FROM disease_counts dc
    LEFT JOIN users u ON dc.user_id = u.id
    ORDER BY dc.is_approved ASC, dc.added_at DESC
  `;

  healthDb.query(query, (err, results) => {
    if (err) {
      console.error("DB error (disease_counts):", err);
      return res.status(500).json({ success: false, message: "DB error (disease_counts)" });
    }
    res.json({ success: true, entries: results });
  });
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey";
// JWT Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "Invalid token" });
        req.user = user; // add user info to request
        next();
    });
}
// Get user info
app.get('/api/user/info', authenticateToken, (req, res) => {
  const userId = req.user.id;

  if(userId === 0){ // admin
      return res.json({ success: true, user: { name: "Admin", email: req.user.email } });
  }

  const query = 'SELECT id, full_name, email, contact_number, gender, dob, state FROM users WHERE id = ?';
  healthDb.query(query, [userId], (err, results) => {
      if(err) return res.status(500).json({ success: false, message: "DB error" });
      if(results.length === 0) return res.status(404).json({ success: false, message: "User not found" });

      res.json({ success: true, user: results[0] });
  });
});
// Get all users excluding admin
app.get('/api/admin/users', (req, res) => {
  const query = `SELECT full_name, email, contact_number, gender, dob, state 
                 FROM users 
                 WHERE id != 3`; // exclude admin
  healthDb.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error (users)" });
    res.json({ success: true, users: results });
  });
});
// Get all subscribers
app.get('/api/admin/subscribers', (req, res) => {
  const query = `SELECT id, full_name, email, phone_number, state, district, disease, approved, created_at FROM subscribers`;
  healthDb.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error (subscribers)" });
    res.json({ success: true, subscribers: results });
  });
});
// Approve a subscriber
app.post('/api/admin/subscribers/approve', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ success: false, message: "Subscriber ID required" });

  const query = `UPDATE subscribers SET approved = 1 WHERE id = ?`;
  healthDb.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB error (update)" });
    res.json({ success: true, message: "Subscriber approved successfully" });
  });
});
// API Route to add a disease entry
app.post('/api/data-entry', (req, res) => {
  const { user_id, disease, state, district, count, date } = req.body;

  if (!user_id || !disease || !state || !count || !date) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Get user info
  healthDb.query(
    'SELECT id, full_name, email FROM users WHERE id = ?',
    [user_id],
    (err, userRows) => {
      if (err)
        return res.status(500).json({ success: false, message: 'DB error (users)' });

      if (!userRows.length)
        return res.status(400).json({ success: false, message: 'User not found' });

      const user = userRows[0];

      // ✅ Admin auto-approval
      const isApproved = user_id === 3 ? 1 : 0;

      const insertQuery = `
        INSERT INTO disease_counts
        (user_id, user_full_name, user_email, state, district, disease, count, added_at, year, is_approved)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), YEAR(NOW()), ?)
      `;

      const values = [
        user.id,
        user.full_name,
        user.email,
        state,
        district,
        disease,
        count,
        isApproved
      ];

      // 🔹 MAKE CALLBACK ASYNC
      healthDb.query(insertQuery, values, async (err, result) => {
        if (err) {
          console.error("DB error (disease_counts):", err);
          return res.status(500).json({
            success: false,
            message: 'DB error (disease_counts)'
          });
        }

        const entry_id = result.insertId;

        // ---------------- ADMIN FLOW ----------------
        if (isApproved === 1) {
          const data = {
            id: entry_id,
            user_id: user.id,
            user_full_name: user.full_name,
            user_email: user.email,
            state,
            district,
            disease,
            count,
            added_at: new Date()
          };

          try {
            // 1️⃣ Update all tables (same logic as before)
            const updateResult = await updateAllTablesAfterApproval(data);

            // 2️⃣ Trigger alerts (same behavior)
            try {
              await axios.post('http://healthguard.local/api/alerts/check', {
                entry_id
              });
              console.log('✅ Alerts evaluated after approval');
            } catch (err) {
              console.error('❌ Alert trigger failed:', err.message);
            }

            // ✅ SINGLE RESPONSE
            return res.json(updateResult);

          } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false });
          }
        }

        // ---------------- USER FLOW ----------------
        return res.json({
          success: true,
          message: 'Data submitted for admin approval',
          entry_id
        });
      });
    }
  );
});

// API Route to approve a disease entry
app.post('/api/approve/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // 1️⃣ Get record
    const [rows] = await healthDb.promise().query(
      'SELECT * FROM disease_counts WHERE id = ?',
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    const data = rows[0];

    if (data.is_approved === 1) {
      return res.status(400).json({ success: false, message: 'Record already approved' });
    }

    // 2️⃣ Approve entry
    await healthDb.promise().query(
      'UPDATE disease_counts SET is_approved = 1 WHERE id = ?',
      [id]
    );

    // 3️⃣ Update all related tables (same logic as before)
    const result = await updateAllTablesAfterApproval(data);

    // 4️⃣ Trigger alerts (same behavior as before)
    try {
      await axios.post('http://healthguard.local/api/alerts/check', {
        entry_id: id
      });
      console.log('✅ Alerts checked after user approval');
    } catch (err) {
      console.error('❌ Alert trigger failed:', err.message);
    }

    // ✅ SINGLE response
    return res.json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
});

function updateAllTablesAfterApproval(data) {
  return new Promise((resolve, reject) => {
    const { state, district, disease, count, added_at } = data;

    const date = new Date(added_at);
    const year = date.getFullYear();
    const reportDate = date.toISOString().split("T")[0];
    const scaledCount = parseFloat((count / 1000).toFixed(2));

    const diseaseColumnMap = {
      "COVID-19": "covid_19",
      "Dengue": "dengue",
      "Chikungunya": "chikungunya",
      "Zika": "zika",
      "HFMD": "hfmd",
      "Hepatitis A/E": "hepatitis_a_e",
      "Other": "other"
    };
    const diseaseColumn = diseaseColumnMap[disease] || "other";

    // ---- STATE CASES ----
    healthDb.query(
      'SELECT cases FROM state_cases WHERE state_ut = ? AND year = ?',
      [state, year],
      (err, stateRows) => {
        if (err) return reject(err);

        const proceedStateDisease = () => updateStateDiseaseData();

        if (stateRows.length) {
          const newStateCases = parseFloat((stateRows[0].cases + scaledCount).toFixed(2));
          healthDb.query(
            'UPDATE state_cases SET cases = ? WHERE state_ut = ? AND year = ?',
            [newStateCases, state, year],
            proceedStateDisease
          );
        } else {
          healthDb.query(
            'INSERT INTO state_cases (year, state_ut, cases) VALUES (?, ?, ?)',
            [year, state, scaledCount],
            proceedStateDisease
          );
        }
      }
    );

    // ---- STATE DISEASE DATA ----
    function updateStateDiseaseData() {
      healthDb.query(
        `SELECT id, \`${diseaseColumn}\` FROM state_disease_data WHERE state_name = ? AND report_date = ?`,
        [state, reportDate],
        (err, rows) => {
          if (err) return reject(err);

          const proceedDistrict =
            state === "Maharashtra" ? updateDistrictData : finish;

          if (rows.length) {
            const currentValue = rows[0][diseaseColumn] || 0;
            healthDb.query(
              `UPDATE state_disease_data SET \`${diseaseColumn}\` = ? WHERE state_name = ? AND report_date = ?`,
              [currentValue + count, state, reportDate],
              proceedDistrict
            );
          } else {
            const insertObj = {
              state_name: state,
              report_date: reportDate,
              [diseaseColumn]: count
            };

            const columns = Object.keys(insertObj).map(c => `\`${c}\``).join(", ");
            const placeholders = Object.keys(insertObj).map(() => "?").join(", ");
            const values = Object.values(insertObj);

            healthDb.query(
              `INSERT INTO state_disease_data (${columns}) VALUES (${placeholders})`,
              values,
              proceedDistrict
            );
          }
        }
      );
    }

    // ---- DISTRICT DATA ----
    function updateDistrictData() {
      healthDb.query(
        `SELECT * FROM district_viral_cases WHERE district = ? AND year = ?`,
        [district, year],
        (err, districtRows) => {
          if (err) return reject(err);

          const upsertYearCases = () => {
            healthDb.query(
              `
              INSERT INTO district_year_cases (state, district, year, cases)
              VALUES (?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE cases = cases + VALUES(cases)
              `,
              [state, district, year, count],
              err => {
                if (err) return reject(err);
                finish();
              }
            );
          };

          if (districtRows.length) {
            const currentValue = districtRows[0][disease.toLowerCase()] || 0;
            healthDb.query(
              `UPDATE district_viral_cases
               SET \`${disease.toLowerCase()}\` = ?
               WHERE district = ? AND year = ?`,
              [currentValue + count, district, year],
              upsertYearCases
            );
          } else {
            const insertObj = { district, year, [disease.toLowerCase()]: count };
            const columns = Object.keys(insertObj).join(", ");
            const placeholders = Object.keys(insertObj).map(() => "?").join(", ");
            const values = Object.values(insertObj);

            healthDb.query(
              `INSERT INTO district_viral_cases (${columns}) VALUES (${placeholders})`,
              values,
              upsertYearCases
            );
          }
        }
      );
    }

    function finish() {
      resolve({
        success: true,
        message: "Data approved and updated successfully"
      });
    }
  });
}
// GET USER SUBMISSIONS
app.get('/api/user/submissions', authenticateToken, (req, res) => {

  const userId = req.user.id; // comes from middleware

  const query = `
    SELECT 
      id,
      disease,
      state,
      district,
      count,
      added_at,
      is_approved
    FROM disease_counts
    WHERE user_id = ?
    ORDER BY added_at DESC
  `;

  healthDb.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false });
    }

    return res.json({
      success: true,
      entries: results
    });
  });
});
app.get('/api/user/alerts', authenticateToken, (req, res) => {

    const userId = req.user.id;

    // Step 1: Get user's state
    healthDb.query(
        'SELECT state FROM users WHERE id = ?',
        [userId],
        (err, userResult) => {

            if (err) {
                console.error("User fetch error:", err);
                return res.status(500).json({ success: false });
            }

            if (userResult.length === 0) {
                return res.status(404).json({ success: false });
            }

            const userState = userResult[0].state;

            // Step 2: Get THIS WEEK and LAST WEEK data
            const query = `
                SELECT 
                    district,
                    disease,
                    
                    SUM(
                        CASE 
                            WHEN YEARWEEK(added_at, 1) = YEARWEEK(CURDATE(), 1)
                            THEN count ELSE 0
                        END
                    ) AS this_week,

                    SUM(
                        CASE 
                            WHEN YEARWEEK(added_at, 1) = YEARWEEK(CURDATE(), 1) - 1
                            THEN count ELSE 0
                        END
                    ) AS last_week

                FROM disease_counts
                WHERE state = ?
                AND is_approved = 1
                GROUP BY district, disease
            `;

            healthDb.query(query, [userState], (err, results) => {

                if (err) {
                    console.error("Alert query error:", err);
                    return res.status(500).json({ success: false });
                }

                // Step 3: Add comparison + severity
                const processed = results.map(row => {

                    const thisWeek = row.this_week || 0;
                    const lastWeek = row.last_week || 0;

                    let percentage_change = 0;

                    if (lastWeek === 0 && thisWeek > 0) {
                        percentage_change = 100;
                    } else if (lastWeek > 0) {
                        percentage_change = ((thisWeek - lastWeek) / lastWeek) * 100;
                    }

                    // Severity logic
                    let severity = "Low";
                    if (thisWeek > 2000) severity = "Critical";
                    else if (thisWeek > 500) severity = "High";
                    else if (thisWeek > 100) severity = "Medium";

                    return {
                        district: row.district,
                        disease: row.disease,
                        this_week: thisWeek,
                        last_week: lastWeek,
                        percentage_change: Number(percentage_change.toFixed(1)),
                        severity
                    };
                });

                // Step 4: Sort by severity importance + cases
                processed.sort((a, b) => b.this_week - a.this_week);

                res.json({
                    success: true,
                    state: userState,
                    week: "current",
                    alerts: processed
                });

            });

        }
    );
});
// GET LEADERBOARD
app.get('/api/user/leaderboard', authenticateToken, (req, res) => {

  const query = `
    SELECT 
      u.id AS user_id,
      u.full_name,
      SUM(dc.count) AS total_cases
    FROM disease_counts dc
    JOIN users u ON dc.user_id = u.id
    WHERE dc.is_approved = 1
    GROUP BY u.id, u.full_name
    ORDER BY total_cases DESC
    LIMIT 3
  `;

  healthDb.query(query, (err, results) => {
    if (err) {
      console.error("Leaderboard error:", err);
      return res.status(500).json({ success: false });
    }

    const formatted = results.map((row, index) => ({
      rank: index + 1,
      user_id: row.user_id,
      full_name: row.full_name,
      total_cases: row.total_cases,
      badge:
        index === 0 ? "🥇" :
        index === 1 ? "🥈" :
        index === 2 ? "🥉" : ""
    }));

    res.json({
      success: true,
      leaderboard: formatted
    });
  });
});
// GET USER REPORTS (Month + Year filter + pagination)
app.get('/api/user/reports', authenticateToken, (req, res) => {

  const { page = 1, month, year } = req.query;

  const limit = 10;
  const offset = (page - 1) * limit;

  let whereClause = "WHERE 1=1";
  let params = [];

  // Month filter
  if (month) {
    whereClause += " AND MONTH(added_at) = ?";
    params.push(parseInt(month));
  }

  // Year filter
  if (year) {
    whereClause += " AND YEAR(added_at) = ?";
    params.push(parseInt(year));
  }

  const dataQuery = `
    SELECT id, user_id, user_full_name, disease, count, district, state, added_at
    FROM disease_counts
    ${whereClause}
    ORDER BY added_at DESC
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) as total
    FROM disease_counts
    ${whereClause}
  `;

  // First get total count
  healthDb.query(countQuery, params, (err, countResult) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Then get paginated data
    healthDb.query(
      dataQuery,
      [...params, limit, offset],
      (err2, results) => {

        if (err2) {
          console.error(err2);
          return res.status(500).json({ success: false });
        }

        res.json({
          success: true,
          data: results,
          total,
          page: parseInt(page),
          totalPages
        });

      }
    );

  });

});


// API Route to delete a disease entry
app.post('/api/data-entry/delete', (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ success: false, message: 'Entry ID required' });

  // Step 1: Fetch the entry from disease_counts
  healthDb.query('SELECT * FROM disease_counts WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: 'DB error fetching entry' });
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Entry not found' });

    const entry = rows[0];
    const entryDate = new Date(entry.added_at);
    const year = entryDate.getFullYear();
    const reportDate = entryDate.toISOString().split('T')[0]; // format: yyyy-mm-dd

    const diseaseMap = {
      "COVID-19": "covid_19",
      "Dengue": "dengue",
      "Chikungunya": "chikungunya",
      "Zika": "zika",
      "HFMD": "hfmd",
      "Hepatitis A/E": "hepatitis_a_e",
      "Other": "other"
    };
    const diseaseColumn = diseaseMap[entry.disease] || "other";

    const count = entry.count;

    // Step 2: Update state_cases (scaled)
    healthDb.query(
      'UPDATE state_cases SET cases = cases - ? WHERE state_ut = ? AND year = ?',
      [count / 1000, entry.state, year],
      (err) => {
        if (err) return res.status(500).json({ success: false, message: 'DB error (state_cases)' });

        // Step 3: Update state_disease_data
        healthDb.query(
          `UPDATE state_disease_data SET \`${diseaseColumn}\` = \`${diseaseColumn}\` - ? WHERE state_name = ? AND report_date = ?`,
          [count, entry.state, reportDate],
          (err) => {
            if (err) return res.status(500).json({ success: false, message: 'DB error (state_disease_data)' });

            // Step 4: If Maharashtra, update district tables
            if (entry.state === 'Maharashtra') {
              const district = entry.district;
              const districtDiseaseColumnMap = {
                "COVID-19": "covid19",
                "Dengue": "dengue",
                "Chikungunya": "chikungunya",
                "Zika": "zika",
                "HFMD": "hfmd",
                "Hepatitis A/E": "hepatitis_ae",
                "Other": "other_minor_viral"
              };
              const districtDiseaseColumn = districtDiseaseColumnMap[entry.disease] || "other_minor_viral";

              // Update district_viral_cases
              healthDb.query(
                `UPDATE district_viral_cases SET \`${districtDiseaseColumn}\` = \`${districtDiseaseColumn}\` - ? WHERE district = ? AND year = ?`,
                [count, district, year],
                (err) => {
                  if (err) return res.status(500).json({ success: false, message: 'DB error (district_viral_cases)' });

                  // Update district_year_cases
                  healthDb.query(
                    'UPDATE district_year_cases SET cases = cases - ? WHERE district = ? AND year = ?',
                    [count, district, year],
                    (err) => {
                      if (err) return res.status(500).json({ success: false, message: 'DB error (district_year_cases)' });

                      // Step 5: Delete from disease_counts
                      healthDb.query('DELETE FROM disease_counts WHERE id = ?', [id], (err) => {
                        if (err) return res.status(500).json({ success: false, message: 'DB error (disease_counts)' });
                        return res.json({ success: true, message: 'Entry deleted successfully!' });
                      });
                    }
                  );
                }
              );
            } else {
              // Non-Maharashtra: just delete row
              healthDb.query('DELETE FROM disease_counts WHERE id = ?', [id], (err) => {
                if (err) return res.status(500).json({ success: false, message: 'DB error (disease_counts)' });
                return res.json({ success: true, message: 'Entry deleted successfully!' });
              });
            }
          }
        );
      }
    );
  });
});
// API Route to fetch user's own disease entries
app.get('/api/data-entry/user', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT disease, state, district, count, DATE_FORMAT(added_at, '%Y-%m-%d') as date
    FROM disease_counts
    WHERE user_id = ?
    ORDER BY added_at DESC
  `;

  healthDb.query(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: 'DB error (fetch user entries)' });
    res.json({ success: true, entries: rows });
  });
});
// API Route to fetch viral data for a year
app.get("/api/viral-data", (req, res) => {
    const year = parseInt(req.query.year) || 2025;
    const sql = "SELECT * FROM district_viral_cases WHERE year = ?";

    healthDb.query(sql, [year], (err, results) => {
        if (err) {
            console.error("❌ Error fetching viral data:", err);
            return res.status(500).json({ error: "DB error" });
        }

        const dataArray = results.map(row => [
            row.covid19,
            row.dengue,
            row.chikungunya,
            row.zika,
            row.hfmd,
            row.hepatitis_ae,
            row.other_minor_viral
        ]);

        res.json(dataArray);
    });
});


app.get("/api/districts", (req, res) => {
  const sql = "SELECT DISTINCT district FROM district_viral_cases ORDER BY district";
  healthDb.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results.map(r => r.district));
  });
});
// Fetch district-wise cases for a given year and state (default 2025, Maharashtra)
app.get("/api/district-year-cases", (req, res) => {
  const year = parseInt(req.query.year) || 2025;
  const state = req.query.state || "Maharashtra";

  const sql = `
    SELECT district, cases
    FROM district_year_cases
    WHERE year = ? AND state = ?
  `;

  healthDb.query(sql, [year, state], (err, results) => {
    if (err) {
      console.error("❌ Error fetching district-year cases:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});




// Fetch state cases for a given year (default 2025)
// API Route for 2025 state cases
app.get("/api/state-cases", (req, res) => {
    const year = parseInt(req.query.year) || 2025;
    const sql = "SELECT state_ut, cases FROM state_cases WHERE year = ?";

    healthDb.query(sql, [year], (err, results) => {
        if (err) {
            console.error("❌ Error fetching state cases:", err);
            return res.status(500).json({ error: "DB error" });
        }

        // results will be like [{ state: 'Maharashtra', cases: 255000 }, ...]
        res.json(results);
    });
});
// 🔹 Perplexity API
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
// Chat history
const systemMessage = {
    role: "system",
    content: "You are a friendly virtual assistant. ALWAYS answer in 1–2 short sentences only."
};
const systemMessage1 = {
    role: "system",
    content: "You are a friendly medical assistant. Recommend medicine if needed, but tell user to consult doctor. Keep answers short."
};
let generalChatHistory = [systemMessage1];
let MedicalCareHistory = [systemMessage];
let MedicalQuizHistory = [systemMessage];
// Helper: call Perplexity
async function callPerplexityAPI(messages) {
    try {
        const response = await axios.post(PERPLEXITY_API_URL, {
            model: "sonar",
            messages,
            max_tokens: 500,
            temperature: 0.7
        }, {
            headers: {
                Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.choices?.[0]?.message?.content?.trim() || "I couldn't find an answer.";
    } catch (err) {
        console.error("❌ Perplexity API error:", err.response?.data || err.message);
        return "Something went wrong. Try again later.";
    }
}
// Routes
// Fetch state-wise cases
app.get("/api/state-cases/:year", (req, res) => {
    const year = req.params.year;
    const sql = "SELECT state_ut, cases FROM state_cases WHERE year = ?";
    healthDb.query(sql, [year], (err, results) => {
        if (err) {
            console.error("❌ Error fetching state cases:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

// Pet Care Bot
app.post('/api/medicalcarebot', async (req, res) => {
    const userMessage = req.body.message;
    MedicalCareHistory.push({ role: "user", content: userMessage });
    const reply = await callPerplexityAPI(MedicalCareHistory);
    MedicalCareHistory.push({ role: "assistant", content: reply });
    res.json({ reply });
});

// Medical Quiz Bot
app.post('/api/medicalquiz', async (req, res) => {
    try {
        const messages = req.body.messages || [];
        const reply = await callPerplexityAPI(messages);
        res.json({ reply });
    } catch (err) {
        console.error("❌ /api/medicalquiz error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});
// General Chat
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: "Message required" });

    generalChatHistory.push({ role: "user", content: userMessage + " Respond in 1-2 short sentences only." });
    const reply = await callPerplexityAPI(generalChatHistory);
    generalChatHistory.push({ role: "assistant", content: reply });
    res.json({ reply });
});
// Reset chats
app.post('/api/reset-chat', (req, res) => {
    MedicalCareHistory = [systemMessage1];
    MedicalQuizHistory = [systemMessage];
    generalChatHistory = [systemMessage];
    res.json({ message: "All chat histories reset." });
});
// Reviews
app.post('/api/reviews', (req, res) => {
    const { name, email, rating, feedback } = req.body;
    if (!name || !email || !rating || !feedback) return res.status(400).json({ error: 'All fields required' });

    const sql = "INSERT INTO reviews (name, email, rating, feedback) VALUES (?, ?, ?, ?)";
    healthDb.query(sql, [name, email, rating, feedback], err => {
        if (err) return res.status(500).json({ error: "Could not submit review" });
        res.json({ message: "Review submitted!" });
    });
});
app.get('/api/reviews', (req, res) => {
    healthDb.query("SELECT * FROM reviews ORDER BY created_at DESC", (err, result) => {
        if (err) return res.status(500).json({ error: "Could not fetch reviews" });
        res.json({ reviews: result });
    });
});
// Use other routes
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);
// Serve frontend
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
// Disable caching
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
});
// Start server
const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
