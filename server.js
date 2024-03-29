const express = require('express'); // Importing the express framework
const { Pool } = require('pg'); // Importing pool from PostgreSQL
require('dotenv').config(); // Getting the environment variables
const cors = require('cors'); // Importing cors to allow different ports
const bodyParser = require('body-parser'); // Importing body parser for get/post methods

// Creating an express app instance
const app = express();

// Allowing all port origins for development
app.use(cors({
    origin: '*'
}));

// Allowing body parser to parse incoming HTTP request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting the server port to 3001
const port = 3001;

// Adding the PostgreSQL connection using the environment variable 'POSTGRE_URL'
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: true,
    },
});

// Getting student data with a try/catch block for errors
app.get('/data/student-data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Adding student data with a try/catch block for errors
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

// Getting student data for editing with a try/catch block for errors

app.get('/data/students/:student_id', async (req, res) => {
    const student_id = req.params.student_id;

    try {
        const result = await pool.query('SELECT * FROM students WHERE student_id = $1', [student_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error fetching course data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update student data with a try/catch block for errors
app.put('/data/update-student/:student_id', async (req, res) => {
    const student_id = req.params.student_id;
    const { fname, lname, dob } = req.body;

    try {
        await pool.query('UPDATE students SET fname = $1, lname = $2, dob = $3 WHERE student_id = $4', [fname, lname, dob, student_id]);

        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete course data with a try/catch block for errors

app.delete('/data/delete-student/:student_id', async (req, res) => {
    const student_id = req.params.student_id;

    try {
        await pool.query('DELETE FROM students WHERE student_id = $1', [student_id]);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Getting course data with a try/catch block for errors
app.get('/data/course-data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Adding course data with a try/catch block for errors
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

// Delete course data with a try/catch block for errors

app.delete('/data/delete-course/:course_id', async (req, res) => {
    const course_id = req.params.course_id;

    try {
        await pool.query('DELETE FROM courses WHERE course_id = $1', [course_id]);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Getting course data for editing with a try/catch block for errors

app.get('/data/courses/:course_id', async (req, res) => {
    const course_id = req.params.course_id;

    try {
        const result = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error fetching course data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update course data with a try/catch block for errors
app.put('/data/update-course/:course_id', async (req, res) => {
    const course_id = req.params.course_id;
    const { cname, code } = req.body;

    try {
        await pool.query('UPDATE courses SET cname = $1, code = $2 WHERE course_id = $3', [cname, code, course_id]);

        res.status(200).json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Getting scores data with a try/catch block for errors
app.get('/data/score-data', async (req, res) => {
    try {
        const score = await pool.query('SELECT * FROM scores');
        res.json(score.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Adding results data with a try/catch block for errors

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

// Getting results data with a try/catch block for errors
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

// Delete result data with a try/catch block for errors

app.delete('/data/delete-result/:result_id', async (req, res) => {
    const result_id = req.params.result_id;

    try {
        await pool.query('DELETE FROM results WHERE result_id = $1', [result_id]);
        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
        console.error('Error deleting result:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Getting results data for editing with a try/catch block for errors
app.get('/data/results/:result_id', async (req, res) => {
    const result_id = req.params.result_id;

    try {
        const result = await pool.query(
            'SELECT results.*, scores.score, courses.cname AS course_name, courses.code AS course_code, CONCAT(students.fname, \' \', students.lname) AS student_name ' +
            'FROM results ' +
            'JOIN scores ON results.score_id = scores.score_id ' +
            'JOIN courses ON results.course_id = courses.course_id ' +
            'JOIN students ON results.student_id = students.student_id ' +
            'WHERE results.result_id = $1',
            [result_id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

// Updating result data with a try/catch block for errors
app.put('/data/update-result/:result_id', async (req, res) => {
    const result_id = req.params.result_id;
    const { score_id } = req.body;

    try {
        await pool.query('UPDATE results SET score_id = $1 WHERE result_id = $2', [score_id, result_id]);

        res.status(200).json({ message: 'Result updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Output server port to console when server begins
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});