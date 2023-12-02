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

app.post('/assistant', async (req, res) => {
  const { id, name, email } = req.body;

  console.log(`Received message from front-end: id=${id}, name=${name}, email=${email}`);

  try {
    const result = await pool.query('INSERT INTO assistants (id, name, email) VALUES ($1, $2, $3) RETURNING *;', [id, name, email]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(11451, () => {
  console.log('Server is running on http://localhost:11451');
});