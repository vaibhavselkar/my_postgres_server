const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*"
}));

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

   app.get('/quiz1', async (req, res) => {
    try {
      const query = 'SELECT * FROM quiz1';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'quiz1' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'quiz1' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });

  app.post('/data', async (req, res) => {
  try {
    const { name, score, subject } = req.body; // Corrected field name to "Subject"
    const result = await client.query('INSERT INTO scores (name, score, subject) VALUES ($1, $2, $3)', [name, score, subject]);
    res.status(201).send('Data inserted successfully');
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error inserting data');
  }
});

const PORT = process.env.PORT || 8300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
