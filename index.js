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

   app.get('/phrasal_verbs', async (req, res) => {
    try {
      const query = 'SELECT * FROM phrasal_verbs';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'phrasal_verbs' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'phrasal_verbs' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });

// Prepositions
  app.get('/prepo-simple', async (req, res) => {
    try {
      const query = 'select * from "simple_prepositions"';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'prepositions' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'prepositions' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });

// Reading Comprehension
  app.get('/rc1', async (req, res) => {
    try {
      const query = 'select * from "Rc_trial"';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'RC' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'RC' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });

//Diagnostic tests
   app.get('/diagnos-eng-1', async (req, res) => {
    try {
      const query = 'select * from "English_Diagnostic Test For Grade 5-7"';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'diagnostic-eng-1' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'diagnostic-eng-1' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });


   app.get('/diagnos-eng-2', async (req, res) => {
    try {
      const query = 'select * from "English_Diagnostic Test For Grade 8-10"';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'diagnos-eng-2' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'diagnos-eng-2' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });


   app.get('/diagnos-math-1', async (req, res) => {
    try {
      const query = 'select * from "Maths_Diagnostic Test For Grade 5-7"';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'diagnostic-math-1' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'diagnostic-math-1' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });


   app.get('/diagnos-math-2', async (req, res) => {
    try {
      const query = 'select * from "Maths_Diagnostic Test For Grade 8-10"';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'diagnos-math-2' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'diagnos-math-2' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });

  app.get('/prompts-diagnos-1', async (req, res) => {
    try {
      const query = 'SELECT * FROM "Writing_Diagnostic Test For Grade 5-7"';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'writing_prompts' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'writing_prompts 5-7' table:", error);
      res.status(500).json({ error: "An error occurred while retrieving data" });
    }
  });

  app.get('/prompts-diagnos-2', async (req, res) => {
    try {
      const query = 'SELECT * FROM "Writing_Diagnostic Test For Grade 8-10"';
      const result = await client.query(query);
      console.log("Successfully retrieved data from 'writing_prompts 8-10' table:", result.rows);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving data from 'writing_prompts 8-10' table:", error);
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

// scores
  app.get('/scores', async (req, res) => {
      try {
          let query = 'SELECT * FROM scores WHERE 1=1';
          const { subject, name } = req.query;
          const values = [];

          // Check if subject query parameter is provided
          if (subject) {
              query += ` AND subject = $${values.length + 1}`;
              values.push(subject);
          }

          // Check if name query parameter is provided
          if (name) {
              query += ` AND name = $${values.length + 1}`;
              values.push(name);
          }

          const result = await client.query(query, values);

          console.log("Successfully retrieved data from 'scores' table:", result.rows);
          res.json(result.rows);
      } catch (error) {
          console.error("Error retrieving data from 'scores' table:", error);
          res.status(500).json({ error: "An error occurred while retrieving data" });
      }
  });

  app.post('/data', async (req, res) => {
  try {
    const { name, score, subject, time_taken } = req.body; // Corrected field name to "Subject"
    const result = await client.query('INSERT INTO scores (name, score, subject, time_taken) VALUES ($1, $2, $3, $4)', [name, score, subject, time_taken]);
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
      const { username, prompt_id, std, writing_response, time } = req.body; // Corrected field name 
      const result = await client.query('INSERT INTO writing_response (username, prompt_id, std, writing_response, time) VALUES ($1, $2, $3, $4, $5)', [username, prompt_id, std, writing_response, time]);
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
