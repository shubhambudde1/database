const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'stock_management'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/stocks', (req, res) => {
  // Fetch and return stock data from the database
  db.query('SELECT * FROM stocks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/add-stock', (req, res) => {
  // Add new stock to the database
  const { name, quantity, price } = req.body;
  const sql = 'INSERT INTO stocks (name, quantity, price) VALUES (?, ?, ?)';
  db.query(sql, [name, quantity, price], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Stock added successfully', id: result.insertId });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
