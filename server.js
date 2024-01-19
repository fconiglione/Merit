const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3001;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: true,
    },
});

const corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000', 'https://merit.onrender.com/'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.get('/students/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});