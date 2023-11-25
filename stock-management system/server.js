const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
// create a new MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Latur@1059$',
  database: 'world'
});
// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
    
  }
});

// close the MySQL connection
connection.end();

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
