const mysql = require('mysql2');

// create a new MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Latur@1059$',
  database: 'health'
});



// connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');

    // retrieve all data from the "city" table
    connection.query('SELECT * FROM health_data', (queryError, results) => {
      if (queryError) {
        console.error('Error executing query:', queryError);
      } else {
        // log the retrieved data
        console.log('Retrieved data:', results);
      }

      // close the MySQL connection after retrieving data
      connection.end();
    });
  }
});
