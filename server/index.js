const express = require('express');
const app = express();
app.use(express.json());

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '6',
    port: 5432,
});

app.get('/api/users/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users;');
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/users', async (req, res) => {
    const { uid, name, username, phone, email, role } = req.body;

    console.log(`Received message from front-end: uid=${uid}, name=${name}, username=${username}, phone=${phone}, email=${email}, role=${role}`);

    try {
        const result = await pool.query('INSERT INTO users (uid, name, username, phone, email, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [uid, name, username, phone, email, role]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const { name, username, phone, email, role } = req.body;

    try {
        const result = await pool.query('UPDATE users SET name = $1, username = $2, phone = $3, email = $4, role = $5 WHERE uid = $6 RETURNING *;', [name, username, phone, email, role, uid]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/schedule/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM schedule;');
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/schedule/', async (req, res) => {
    const { uid, date, time, location, description } = req.body;

    console.log(`Received message from front-end: uid=${uid}, date=${date}, time=${time}, location=${location}, description=${description}`);

    try {
        const result = await pool.query('INSERT INTO schedule (uid, date, time, location, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [uid, date, time, location, description]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/schedule/:uid', async (req, res) => {
    const { uid } = req.params;
    const { date, time, location, description } = req.body;

    try {
        const result = await pool.query('UPDATE schedule SET date = $1, time = $2, location = $3, description = $4 WHERE uid = $5 RETURNING *;', [date, time, location, description, uid]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/sign/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sign;');
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Sign not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/sign/', async (req, res) => {
    const { uid, date, time, location, description } = req.body;

    console.log(`Received message from front-end: uid=${uid}, date=${date}, time=${time}, location=${location}, description=${description}`);

    try {
        const result = await pool.query('INSERT INTO sign (uid, date, time, location, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [uid, date, time, location, description]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/alter/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alter;');
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Alter not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/alter/', async (req, res) => {
    const { uid, date, time, location, description } = req.body;

    console.log(`Received message from front-end: uid=${uid}, date=${date}, time=${time}, location=${location}, description=${description}`);

    try {
        const result = await pool.query('INSERT INTO alter (uid, date, time, location, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [uid, date, time, location, description]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/alter/:uid', async (req, res) => {
    const { uid } = req.params;
    const { date, time, location, description } = req.body;

    try {
        const result = await pool.query('UPDATE alter SET date = $1, time = $2, location = $3, description = $4 WHERE uid = $5 RETURNING *;', [date, time, location, description, uid]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Alter not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(11451, () => {
    console.log('Server is running on http://localhost:11451');
});