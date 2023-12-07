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

app.post('/users', async (req, res) => {
  const { uid, name, username, phone, email, role} = req.body;

  console.log(`Received message from front-end: uid=${uid}, name=${name}, username=${username}, phone=${phone}, email=${email}, role=${role}`);

  try {
    const result = await pool.query('INSERT INTO users (uid, name, username, phone, email, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [uid, name, username, phone, email, role]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(11451, () => {
  console.log('Server is running on http://localhost:11451');
});