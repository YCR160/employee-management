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

app.get('/api/users', async (req, res) => {
    const { name, username, phone, email, role } = req.query;

    console.log(`Searching for users with name=${name}, username=${username}, phone=${phone}, email=${email}, role=${role}`);

    let query = 'SELECT * FROM users WHERE true';
    const params = [];

    if (name) {
        query += ' AND name = $' + (params.length + 1);
        params.push(name);
    }

    if (username) {
        query += ' AND username = $' + (params.length + 1);
        params.push(username);
    }

    if (phone) {
        query += ' AND phone = $' + (params.length + 1);
        params.push(phone);
    }

    if (email) {
        query += ' AND email = $' + (params.length + 1);
        params.push(email);
    }

    if (role) {
        query += ' AND role = $' + (params.length + 1);
        params.push(role);
    }

    try {
        const data = await pool.query(query, params);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/users', async (req, res) => {
    const { name, username, phone, email, role } = req.body;

    console.log(`Adding user with name=${name}, username=${username}, phone=${phone}, email=${email}, role=${role}`);

    try {
        const result = await pool.query('INSERT INTO users (name, username, phone, email, role) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [name, username, phone, email, role]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/users/:uid', async (req, res) => {
    const { uid } = req.params;
    const { name, username, phone, email, role } = req.body;

    console.log(`Updating user with uid=${uid}, name=${name}, username=${username}, phone=${phone}, email=${email}, role=${role}`);

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


app.get('/api/schedule', async (req, res) => {

    console.log(`Searching for schedule`);

    try {
        const result = await pool.query('SELECT * FROM schedule WHERE valid_status = true;');
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/schedule', async (req, res) => {
    const { name, start_time, end_time, location } = req.body;

    console.log(`Adding schedule with name=${name}, start_time=${start_time}, end_time=${end_time}, location=${location}`);

    try {
        const userResult = await pool.query('SELECT uid FROM users WHERE name = $1', [name]);
        if (userResult.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const uid = userResult.rows[0].uid;

        const scheduleResult = await pool.query('INSERT INTO schedule (uid, start_time, end_time, location, valid_status) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [uid, start_time, end_time, location, true]);
        res.json(scheduleResult.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/schedule/:id', async (req, res) => {
    const { id } = req.params;
    const { name, start_time, end_time, location, valid_status } = req.body;

    try {
        const userResult = await pool.query('SELECT uid FROM users WHERE name = $1', [name]);
        if (userResult.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const uid = userResult.rows[0].uid;

        const scheduleResult = await pool.query('UPDATE schedule SET uid = $1, start_time = $2, end_time = $3, location = $4, valid_status = $5 WHERE id = $6 RETURNING *;', [uid, start_time, end_time, location, valid_status, id]);
        if (scheduleResult.rows.length > 0) {
            res.json(scheduleResult.rows[0]);
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/sign', async (req, res) => {
    const { name, username, start_time, end_time, location } = req.query;

    console.log(`Searching for sign with name=${name}, username=${username}, start_time=${start_time}, end_time=${end_time}, location=${location}`);

    let query = 'SELECT * FROM sign WHERE true';
    const params = [];

    if (name) {
        query += ' AND name = $' + (params.length + 1);
        params.push(name);
    }

    if (username) {
        query += ' AND username = $' + (params.length + 1);
        params.push(username);
    }

    if (start_time) {
        query += ' AND start_time = $' + (params.length + 1);
        params.push(start_time);
    }

    if (end_time) {
        query += ' AND end_time = $' + (params.length + 1);
        params.push(end_time);
    }

    if (location) {
        query += ' AND location = $' + (params.length + 1);
        params.push(location);
    }

    try {
        const data = await pool.query(query, params);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/sign', async (req, res) => {
    const { name, username, location } = req.body;

    console.log(`Adding sign with name=${name}, username=${username}, location=${location}`);

    try {
        const userResult = await pool.query('SELECT uid FROM users WHERE name = $1', [name]);
        if (userResult.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const uid = userResult.rows[0].uid;

        const signResult = await pool.query('INSERT INTO sign (uid, location, time) VALUES ($1, $2, $3) RETURNING *;', [uid, location, new Date()]);
        res.json(signResult.rows[0]);
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