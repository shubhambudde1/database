const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;
app.use(express.static(__dirname));


// MySQL database connection configuration

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Latur@1059$',
  database: 'health',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Set up your routes

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for example, your HTML and CSS files)
app.use(express.static('public'));
// get request
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post('/submitForm', (req, res) => {
  const { name, age, dateSigned, disease, medicine } = req.body;

  // Insert data into the database
  const insertQuery = 'INSERT INTO health_data (name, age, dateSigned, disease, medicine) VALUES (?, ?, ?, ?, ?)';
  db.query(insertQuery, [name, age, dateSigned, disease, medicine], (err, results) => {
    if (err) {
      console.error('Database insertion error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data inserted into the database');
      res.status(200).send('Form submitted successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});







