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

// Getting scores data
app.get('/data/score-data', async (req, res) => {
    try {
        const score = await pool.query('SELECT * FROM scores');
        res.json(score.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Adding results data

app.post('/data/result-data', async (req, res) => {
    const { studentName, cname, score } = req.body;

    try {
        // Split the studentName into fname and lname
        const [fname, lname] = studentName.split(' ');

        // Get the student_id, course_id, and score_id based on the provided values
        const studentResult = await pool.query(
            'SELECT student_id FROM students WHERE fname = $1 AND lname = $2',
            [fname, lname]
        );

        const courseResult = await pool.query(
            'SELECT course_id FROM courses WHERE cname = $1',
            [cname]
        );

        const scoreResult = await pool.query(
            'SELECT score_id FROM scores WHERE score = $1',
            [score]
        );

        const result = await pool.query(
            'INSERT INTO results (student_id, course_id, score_id) VALUES ($1, $2, $3) RETURNING *',
            [studentResult.rows[0].student_id, courseResult.rows[0].course_id, scoreResult.rows[0].score_id]
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
        const result = await pool.query(
            'SELECT results.*, scores.score, courses.cname AS course_name, courses.code AS course_code, CONCAT(students.fname, \' \', students.lname) AS student_name ' +
            'FROM results ' +
            'JOIN scores ON results.score_id = scores.score_id ' +
            'JOIN courses ON results.course_id = courses.course_id ' +
            'JOIN students ON results.student_id = students.student_id'
        );
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