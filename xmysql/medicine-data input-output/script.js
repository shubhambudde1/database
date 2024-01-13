const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(express.static(__dirname));


// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Latur@1059$',
    database: 'student'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Set up middleware to parse POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the form submission HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, age, date, disease } = req.body;

    // Insert data into the database
    const sql = 'INSERT INTO user_data (name, age, date, disease) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, age, date, disease], (err, result) => {
        if (err) throw err;
        console.log('Record inserted:', result);

        // Redirect back to the home page after submission
        res.redirect('/');
    });
});

// Serve the search HTML page
app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/search.html');
});

// Handle search submissions
app.post('/search', (req, res) => {
    const searchName = req.body.searchName;

    // Search for the user in the database by name
    const sql = 'SELECT * FROM user_data WHERE name = ?';
    db.query(sql, [searchName], (err, results) => {
        if (err) throw err;

        // Display search results on the search.html page
        res.send(generateSearchResultsHTML(results));
    });
});

// Function to generate HTML for search results
function generateSearchResultsHTML(results) {
    let html = '<h2>Search Results</h2>';
    if (results.length === 0) {
        html += '<p>No matching records found.</p>';
    } else {
        html += '<ul>';
        results.forEach(result => {
            html += `<li>Name: ${result.name}, Age: ${result.age}, Date: ${result.date}, Disease: ${result.disease}</li>`;
        });
        html += '</ul>';
    }
    return html;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});