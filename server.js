const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Allowing all port origins for development
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3001;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: true,
    },
});

// Getting student data
app.get('/data/student-data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Adding student data
app.post('/data/student-data', async (req, res) => {
    const { fname, lname, dob } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO students (fname, lname, dob) VALUES ($1, $2, $3) RETURNING *',
            [fname, lname, dob]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Getting course data
app.get('/data/course-data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Adding course data
app.post('/data/course-data', async (req, res) => {
    const { cname, code } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO courses (cname, code) VALUES ($1, $2) RETURNING *',
            [cname, code]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Getting results data
app.get('/data/result-data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM results');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Output server port to console
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});