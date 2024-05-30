const router = require("express").Router();
const { Client } = require("pg");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const validinfo = require("../middleware/validinfo");

const dbURI = process.env.POSTGRES_URL;
const client = new Client({
  connectionString: dbURI,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL", err);
  });

router.post("/register", validinfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await client.query('SELECT * FROM users WHERE user_email = $1', [email]);
    if (user.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await client.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);

    const token = jwt.sign({ id: newUser.rows[0].id, email: newUser.rows[0].user_email }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });

    res.status(201).json({ token });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", validinfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await client.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Password or email is incorrect" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password or email is incorrect" });
    }

    const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].user_email }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });

    res.status(200).json({ token });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Middleware to clear authentication token (logout)
const logout = (req, res) => {
  res.clearCookie('authToken'); // Clear authentication token cookie
  res.json({ message: 'Logout successful' });
};

// Example logout route
router.get('/logout', logout);

module.exports = router;
