const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5500"
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

   app.get('/math_q1', async (req, res) => {
    try {
      const query = 'SELECT * FROM math_q1';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'math_q1' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'math_q1' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });

  app.get('/english_q1', async (req, res) => {
    try {
      const query = 'SELECT * FROM english_q1';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'english_q1' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'english_q1' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });


  app.get('/scores', async (req, res) => {
    try {
      const query = 'SELECT * FROM scores';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'scores' table:", result.rows);
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

  app.get('/prompts', async (req, res) => {
    try {
      const query = 'SELECT * FROM prompts';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'writing_prompts' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'writing_prompts' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });

  app.post('/writing_response', async (req, res) => {
    try {
      const { username, prompt_id, writing_response } = req.body; // Corrected field name 
      const result = await client.query('INSERT INTO writing_response (username, prompt_id, writing_response) VALUES ($1, $2, $3)', [username, prompt_id, writing_response]);
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
