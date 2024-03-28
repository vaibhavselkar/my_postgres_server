const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
// app.use(cors());

// Configure cors with specific options
app.use(
  cors({
    origin: "*", // Allow requests from any origin. You can specify specific origins here instead of "*"
    methods: ["GET", "POST"], // Allow only GET and POST requests
    allowedHeaders: ["Content-Type"], // Allow only specific headers
    preflightContinue: false, // Disable preflightContinue to ensure that preflight requests are handled
    optionsSuccessStatus: 204 // Set the status code for successful OPTIONS requests
  })
);

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
    const { name, score } = req.body;
    const result = await client.query('INSERT INTO login (name, score) VALUES ($1, $2)', [name, score]);
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
